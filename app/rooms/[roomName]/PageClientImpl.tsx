'use client';

import React from 'react';
import { decodePassphrase } from '@/lib/client-utils';
import { DebugMode } from '@/lib/Debug';
import { KeyboardShortcuts } from '@/lib/KeyboardShortcuts';
import { RecordingIndicator } from '@/lib/RecordingIndicator';
import { SettingsMenu } from '@/lib/SettingsMenu';
import { LobbyScreen } from '@/lib/LobbyScreen';
import { AdmitPanel } from '@/lib/AdmitPanel';
import { ConnectionDetails } from '@/lib/types';
import { ParticipantPanel } from '@/lib/ParticipantPanel';
import { useSession } from 'next-auth/react';
import {
  formatChatMessageLinks,
  LocalUserChoices,
  PreJoin,
  RoomContext,
  VideoConference,
} from '@livekit/components-react';
import {
  ExternalE2EEKeyProvider,
  RoomOptions,
  VideoCodec,
  VideoPresets,
  Room,
  DeviceUnsupportedError,
  RoomConnectOptions,
  RoomEvent,
  TrackPublishDefaults,
  VideoCaptureOptions,
  DataPacket_Kind,
  RemoteParticipant,
} from 'livekit-client';
import { useRouter } from 'next/navigation';
import { useSetupE2EE } from '@/lib/useSetupE2EE';
import { useLowCPUOptimizer } from '@/lib/usePerfomanceOptimiser';

const CONN_DETAILS_ENDPOINT =
  process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
const SHOW_SETTINGS_MENU = process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU == 'true';

type LobbyState =
  | { status: 'prejoin' }
  | { status: 'checking' }
  | { status: 'waiting'; displayName: string }
  | { status: 'ready'; connectionDetails: ConnectionDetails; isHost: boolean };

export function PageClientImpl(props: {
  roomName: string;
  region?: string;
  hq: boolean;
  codec: VideoCodec;
}) {
  const router = useRouter();
  const [lobbyState, setLobbyState] = React.useState<LobbyState>({ status: 'prejoin' });
  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>();

  const { data: session } = useSession();

  const preJoinDefaults = React.useMemo(() => ({
    username: session?.user?.name ?? '',
    videoEnabled: true,
    audioEnabled: true,
  }), [session?.user?.name]);

  const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
    setPreJoinChoices(values);
    setLobbyState({ status: 'checking' });

    // ✅ Check if user is host or needs to wait
    const lobbyRes = await fetch(
      `/api/rooms/lobby-token?roomName=${props.roomName}`
    );
    const lobbyData = await lobbyRes.json();

    if (lobbyData.isHost || !lobbyData.needsLobby) {
      // Host — get full connection details immediately
      const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
      url.searchParams.append('roomName', props.roomName);
      if (props.region) url.searchParams.append('region', props.region);
      const connRes = await fetch(url.toString());
      const connData = await connRes.json();
      setLobbyState({ status: 'ready', connectionDetails: connData, isHost: true });

      // Record participant joining
      await fetch('/api/rooms/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: props.roomName }),
      });
    } else {
      // Participant — show waiting room
      setLobbyState({
        status: 'waiting',
        displayName: values.username || lobbyData.displayName,
      });
    }
  }, [props.roomName, props.region]);

  // ✅ Called when host admits this participant — get full token and enter
  const handleAdmitted = React.useCallback(async () => {
    const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
    url.searchParams.append('roomName', props.roomName);
    if (props.region) url.searchParams.append('region', props.region);
    const connRes = await fetch(url.toString());
    const connData = await connRes.json();

    await fetch('/api/rooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName: props.roomName }),
    });

    setLobbyState({ status: 'ready', connectionDetails: connData, isHost: false });
  }, [props.roomName, props.region]);

  const handleLeave = React.useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const handlePreJoinError = React.useCallback((e: any) => console.error(e), []);

  // ── Render states ──────────────────────────────────────────────────────────

  if (lobbyState.status === 'prejoin') {
    return (
      <main data-lk-theme="default" style={{ height: '100%' }}>
        <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
          <PreJoin
            defaults={preJoinDefaults}
            onSubmit={handlePreJoinSubmit}
            onError={handlePreJoinError}
          />
        </div>
      </main>
    );
  }

  if (lobbyState.status === 'checking') {
    return (
      <div className="fixed inset-0 bg-[#0c0c0e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/40">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Checking access...</p>
        </div>
      </div>
    );
  }

  if (lobbyState.status === 'waiting') {
    return (
      <LobbyScreen
        displayName={lobbyState.displayName}
        roomName={props.roomName}
        onAdmitted={handleAdmitted}
        onLeave={handleLeave}
      />
    );
  }

  // status === 'ready'
  return (
    <VideoConferenceComponent
      connectionDetails={lobbyState.connectionDetails}
      userChoices={preJoinChoices!}
      options={{ codec: props.codec, hq: props.hq }}
      roomName={props.roomName}
      isHost={lobbyState.isHost}
    />
  );
}

function VideoConferenceComponent(props: {
  userChoices: LocalUserChoices;
  connectionDetails: ConnectionDetails;
  options: { hq: boolean; codec: VideoCodec };
  roomName: string;
  isHost: boolean;
}) {
  const keyProvider = new ExternalE2EEKeyProvider();
  const { worker, e2eePassphrase } = useSetupE2EE();
  const e2eeEnabled = !!(e2eePassphrase && worker);
  const [e2eeSetupComplete, setE2eeSetupComplete] = React.useState(false);
  const [showParticipants, setShowParticipants] = React.useState(false);

  const roomOptions = React.useMemo((): RoomOptions => {
    let videoCodec: VideoCodec | undefined = props.options.codec ?? 'vp9';
    if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) videoCodec = undefined;

    return {
      videoCaptureDefaults: {
        deviceId: props.userChoices.videoDeviceId ?? undefined,
        resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers: props.options.hq
          ? [VideoPresets.h1080, VideoPresets.h720]
          : [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: props.userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: true,
      dynacast: true,
      e2ee: keyProvider && worker && e2eeEnabled ? { keyProvider, worker } : undefined,
      singlePeerConnection: true,
    };
  }, [props.userChoices, props.options]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  React.useEffect(() => {
    if (e2eeEnabled) {
      keyProvider
        .setKey(decodePassphrase(e2eePassphrase))
        .then(() => room.setE2EEEnabled(true).catch(e => {
          if (e instanceof DeviceUnsupportedError) {
            alert(`Your browser doesn't support E2EE. Please update it.`);
          } else throw e;
        }))
        .then(() => setE2eeSetupComplete(true));
    } else {
      setE2eeSetupComplete(true);
    }
  }, [e2eeEnabled, room, e2eePassphrase]);

  const connectOptions = React.useMemo((): RoomConnectOptions => ({
    autoSubscribe: true,
  }), []);

  const router = useRouter();

 const handleOnLeave = React.useCallback(async () => {
  try {
    const isHostRes = await fetch(`/api/rooms/is-host?roomName=${props.roomName}`);
    const { isHost } = await isHostRes.json();

    if (isHost) {
      // End the meeting and get the meetingId back
      const endRes = await fetch('/api/rooms/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: props.roomName }),
      });

      if (endRes.ok) {
        const { meetingId } = await endRes.json();
        // Host goes to summary page — recording + AI pipeline runs in background
        router.push(`/meetings/${meetingId}/summary`);
        return;
      }
    }
  } catch (e) {
    console.error('Failed to end meeting:', e);
  }

  // Participants (or fallback if end fails) go to dashboard
  router.push('/dashboard');
}, [router, props.roomName]);

  const handleError = React.useCallback((error: Error) => {
    console.error(error);
    alert(`Unexpected error: ${error.message}`);
  }, []);

  const handleEncryptionError = React.useCallback((error: Error) => {
    console.error(error);
    alert(`Encryption error: ${error.message}`);
  }, []);

  React.useEffect(() => {
    room.on(RoomEvent.Disconnected, handleOnLeave);
    room.on(RoomEvent.EncryptionError, handleEncryptionError);
    room.on(RoomEvent.MediaDevicesError, handleError);

    if (e2eeSetupComplete) {
      room.connect(
        props.connectionDetails.serverUrl,
        props.connectionDetails.participantToken,
        connectOptions,
      ).catch(handleError);

      if (props.userChoices.videoEnabled) {
        room.localParticipant.setCameraEnabled(true).catch(handleError);
      }
      if (props.userChoices.audioEnabled) {
        room.localParticipant.setMicrophoneEnabled(true).catch(handleError);
      }
    }

    return () => {
      room.off(RoomEvent.Disconnected, handleOnLeave);
      room.off(RoomEvent.EncryptionError, handleEncryptionError);
      room.off(RoomEvent.MediaDevicesError, handleError);
    };
  }, [e2eeSetupComplete, room, props.connectionDetails]);

  const lowPowerMode = useLowCPUOptimizer(room);

  return (
    <div className="lk-room-container" style={{ display: 'flex' }}>
      <RoomContext.Provider value={room}>
        {/* Main meeting area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <KeyboardShortcuts />
          <VideoConference
            chatMessageFormatter={formatChatMessageLinks}
            SettingsComponent={SHOW_SETTINGS_MENU ? SettingsMenu : undefined}
          />
          <DebugMode />
          <RecordingIndicator />
          {/* ✅ Admit panel — only visible to host, polls for waiting participants */}
          <AdmitPanel roomName={props.roomName} isHost={props.isHost} />
        </div>

        {/* ✅ Participant panel — slides in alongside the meeting */}
        {showParticipants && (
          <ParticipantPanel
            isHost={props.isHost}
            onClose={() => setShowParticipants(false)}
          />
        )}

        {/* ✅ Toggle button */}
        <button
          onClick={() => setShowParticipants(p => !p)}
          className="fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1c1c1f] border border-white/10 text-xs text-white/60 hover:text-white hover:bg-[#242428] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          Participants
        </button>
      </RoomContext.Provider>
    </div>
  );
}
