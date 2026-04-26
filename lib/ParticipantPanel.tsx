'use client';

import React from 'react';
import {
  useParticipants,
  useLocalParticipant,
  useRoomContext,
} from '@livekit/components-react';
import {
  RemoteParticipant,
  RoomEvent,
  Track,
} from 'livekit-client';
import { RoomServiceClient } from 'livekit-server-sdk';

interface ParticipantPanelProps {
  isHost: boolean;
  onClose: () => void;
}

function getInitial(name: string): string {
  return name?.trim()?.[0]?.toUpperCase() ?? '?';
}

function ParticipantRow({
  participant,
  isLocal,
  isHost,
  onMute,
  onKick,
}: {
  participant: any;
  isLocal: boolean;
  isHost: boolean;
  onMute: (identity: string) => void;
  onKick: (identity: string) => void;
}) {
  const isCamOn = participant.isCameraEnabled;
  const isMicOn = participant.isMicrophoneEnabled;
  const name = participant.name || participant.identity || 'Unknown';

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.03] rounded-lg transition-colors group">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-sm font-medium text-indigo-400 flex-shrink-0">
        {getInitial(name)}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">
          {name}
          {isLocal && <span className="text-white/30 text-xs ml-1.5">(you)</span>}
        </p>
      </div>

      {/* Media indicators */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span title={isMicOn ? 'Mic on' : 'Muted'}>
          {isMicOn ? (
            <svg className="w-3.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V20c0 .55.45 1 1 1s1-.45 1-1v-2.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
            </svg>
          )}
        </span>
        <span title={isCamOn ? 'Camera on' : 'Camera off'}>
          {isCamOn ? (
            <svg className="w-3.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-white/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 6.5l-4-4-14 14 4 4 14-14zm-17.5.5H13v1.5L4.5 17H3V7zm17 11l-4-4V7.5L20 7v11z"/>
            </svg>
          )}
        </span>
      </div>

      {/* Host controls — only shown to host, on hover */}
      {isHost && !isLocal && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onMute(participant.identity)}
            title="Mute participant"
            className="p-1 rounded text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V20c0 .55.45 1 1 1s1-.45 1-1v-2.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
            </svg>
          </button>
          <button
            onClick={() => onKick(participant.identity)}
            title="Remove participant"
            className="p-1 rounded text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function ParticipantPanel({ isHost, onClose }: ParticipantPanelProps) {
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();
  const [mutingId, setMutingId] = React.useState<string | null>(null);

  const handleMute = React.useCallback(async (identity: string) => {
    setMutingId(identity);
    try {
      await fetch('/api/rooms/mute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: room.name, participantIdentity: identity }),
      });
    } catch (e) {
      console.error('Failed to mute:', e);
    }
    setMutingId(null);
  }, [room.name]);

  const handleKick = React.useCallback(async (identity: string) => {
    if (!confirm('Remove this participant from the meeting?')) return;
    try {
      await fetch('/api/rooms/kick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: room.name, participantIdentity: identity }),
      });
    } catch (e) {
      console.error('Failed to kick:', e);
    }
  }, [room.name]);

  return (
    <div className="flex flex-col h-full bg-[#141416] border-l border-white/[0.07] w-72 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Participants</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 font-mono">
            {participants.length + 1}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Participant list */}
      <div className="flex-1 overflow-y-auto py-2 px-1">
        {/* Local participant first */}
        <ParticipantRow
          participant={localParticipant}
          isLocal={true}
          isHost={isHost}
          onMute={handleMute}
          onKick={handleKick}
        />

        {/* Remote participants */}
        {participants
          .filter(p => p.identity !== localParticipant.identity)
          .map(p => (
            <ParticipantRow
              key={p.identity}
              participant={p}
              isLocal={false}
              isHost={isHost}
              onMute={handleMute}
              onKick={handleKick}
            />
          ))}
      </div>

      {/* Host controls footer */}
      {isHost && (
        <div className="px-4 py-3 border-t border-white/[0.07]">
          <button
            onClick={async () => {
              if (!confirm('Mute all participants?')) return;
              await fetch('/api/rooms/mute-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomName: room.name }),
              });
            }}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium text-white/50 bg-white/5 hover:bg-white/10 hover:text-white/80 transition-colors"
          >
            Mute all
          </button>
        </div>
      )}
    </div>
  );
}