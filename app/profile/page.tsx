'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Preferences = {
  audioDeviceId?: string;
  videoDeviceId?: string;
  defaultMuted?: boolean;
  defaultCameraOff?: boolean;
};

type UserProfile = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
  preferences: Preferences | null;
};

type MediaDevice = { deviceId: string; label: string };

function Corners() {
  return (
    <>
      <div className="absolute -left-px -top-px h-[7px] w-px bg-white/10" />
      <div className="absolute -left-px -top-px h-px w-[7px] bg-white/10" />
      <div className="absolute -right-px -top-px h-[7px] w-px bg-white/10" />
      <div className="absolute -right-px -top-px h-px w-[7px] bg-white/10" />
      <div className="absolute -left-px -bottom-px h-[7px] w-px bg-white/10" />
      <div className="absolute -left-px -bottom-px h-px w-[7px] bg-white/10" />
      <div className="absolute -right-px -bottom-px h-[7px] w-px bg-white/10" />
      <div className="absolute -right-px -bottom-px h-px w-[7px] bg-white/10" />
    </>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase tracking-widest mb-4">
      <span className="w-3 h-px bg-white/30" />
      {text}
    </div>
  );
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 font-mono text-[12px] px-4 py-3
      border ${type === 'success'
        ? 'border-white/20 text-white/70 bg-[#111]'
        : 'border-red-500/30 text-red-400 bg-[#111]'
      }`}>
      {message}
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [prefs, setPrefs] = useState<Preferences>({});
  const [audioDevices, setAudioDevices] = useState<MediaDevice[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDevice[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [devicesLoaded, setDevicesLoaded] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  // Load profile from API
  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setProfile(d.user);
          setName(d.user.name ?? '');
          setPrefs((d.user.preferences as Preferences) ?? {});
        }
      });
  }, []);

  // Load media devices (requires browser permission)
  async function loadDevices() {
    try {
      // Request permission first
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      setAudioDevices(
        devices
          .filter(d => d.kind === 'audioinput')
          .map(d => ({ deviceId: d.deviceId, label: d.label || `Microphone ${d.deviceId.slice(0, 6)}` }))
      );
      setVideoDevices(
        devices
          .filter(d => d.kind === 'videoinput')
          .map(d => ({ deviceId: d.deviceId, label: d.label || `Camera ${d.deviceId.slice(0, 6)}` }))
      );
      setDevicesLoaded(true);
    } catch {
      showToast('Could not access devices. Check browser permissions.', 'error');
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, preferences: prefs }),
      });

      if (!res.ok) throw new Error('Save failed');

      const data = await res.json();
      setProfile(data.user);

      // Update NextAuth session so navbar reflects new name immediately
      await updateSession({ name: data.user.name });

      showToast('Profile saved.', 'success');
    } catch {
      showToast('Failed to save. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  }

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
      month: 'long', year: 'numeric',
    })
    : '—';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">

      {/* NAV */}
      <nav className="sticky top-0 z-50 w-full flex justify-center bg-[#0a0a0a]/90 backdrop-blur-md pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-[#242424] bg-[#0a0908] px-6">
          <Corners />
          <div className="flex items-center gap-2">
            <Link href="/">
              <img
                src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
                alt="Meetly"
                className="h-7 w-7 rounded-[4px] object-contain cursor-pointer"
              />
            </Link>
          </div>

          <a href="/dashboard"
            className="font-mono text-[12px] text-white/40 hover:text-white transition-colors"
          >
            ← Dashboard
          </a>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pb-20">
        <div className="w-full max-w-[1200px]">

          {/* HEADER */}
          <div className="border-x border-[#242424] px-8 pt-16 pb-10">
            <Eyebrow text="Settings" />
            <h1 className="text-[clamp(28px,4vw,48px)] font-normal tracking-[-0.04em] leading-[1.1]">
              Profile & Preferences
            </h1>
            <p className="font-mono text-[12px] text-white/30 mt-2">
              Member since {memberSince}
            </p>
          </div>

          {/* IDENTITY */}
          <div className="border border-[#242424] border-t-0">
            <div className="border-b border-[#242424] px-8 py-5">
              <Eyebrow text="Identity" />
            </div>
            <div className="px-8 py-8 flex flex-col md:flex-row gap-8">

              {/* Avatar */}
              <div className="flex-shrink-0">
                {profile?.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name ?? 'Avatar'}
                    className="w-16 h-16 rounded-full border border-[#242424] object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 border border-[#242424] bg-[#111] flex items-center justify-center font-mono text-white/40 text-xl">
                    {name.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
                <p className="font-mono text-[10px] text-white/20 mt-2 text-center">
                  via Google
                </p>
              </div>

              {/* Fields */}
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest block mb-2">
                    Display name
                  </label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={64}
                    placeholder="Your name"
                    className="w-full bg-[#111] border border-[#242424] px-4 py-3 font-mono
                               text-[13px] text-white placeholder-white/20
                               focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <p className="font-mono text-[10px] text-white/20 mt-1">
                    Shown to other participants in meetings
                  </p>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest block mb-2">
                    Email
                  </label>
                  <div className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3 font-mono text-[13px] text-white/30">
                    {profile?.email ?? '—'}
                  </div>
                  <p className="font-mono text-[10px] text-white/20 mt-1">
                    Managed by Google — cannot be changed here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DEVICE PREFERENCES */}
          <div className="border border-[#242424] border-t-0">
            <div className="border-b border-[#242424] px-8 py-5 flex items-center justify-between">
              <Eyebrow text="Device preferences" />
              {!devicesLoaded && (
                <button
                  onClick={loadDevices}
                  className="font-mono text-[11px] text-white/40 border border-[#242424]
                             px-3 py-1.5 hover:text-white hover:border-white/30 transition-colors"
                >
                  Detect devices
                </button>
              )}
            </div>
            <div className="px-8 py-8 flex flex-col gap-6">

              {!devicesLoaded && (
                <p className="font-mono text-[12px] text-white/20">
                  Click "Detect devices" above to load your mic and camera options.
                  Browser will ask for permission.
                </p>
              )}

              {devicesLoaded && (
                <>
                  {/* Microphone */}
                  <div>
                    <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest block mb-2">
                      Default microphone
                    </label>
                    <select
                      value={prefs.audioDeviceId ?? ''}
                      onChange={e => setPrefs(p => ({ ...p, audioDeviceId: e.target.value }))}
                      className="w-full bg-[#111] border border-[#242424] px-4 py-3 font-mono
                                 text-[13px] text-white focus:outline-none focus:border-white/30
                                 transition-colors appearance-none"
                    >
                      <option value="">System default</option>
                      {audioDevices.map(d => (
                        <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Camera */}
                  <div>
                    <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest block mb-2">
                      Default camera
                    </label>
                    <select
                      value={prefs.videoDeviceId ?? ''}
                      onChange={e => setPrefs(p => ({ ...p, videoDeviceId: e.target.value }))}
                      className="w-full bg-[#111] border border-[#242424] px-4 py-3 font-mono
                                 text-[13px] text-white focus:outline-none focus:border-white/30
                                 transition-colors appearance-none"
                    >
                      <option value="">System default</option>
                      {videoDevices.map(d => (
                        <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Join defaults */}
              <div>
                <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest block mb-3">
                  Join meetings with
                </label>
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'defaultMuted', label: 'Microphone off by default' },
                    { key: 'defaultCameraOff', label: 'Camera off by default' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setPrefs(p => ({ ...p, [key]: !p[key as keyof Preferences] }))}
                        className={`w-9 h-5 border transition-colors flex-shrink-0 relative cursor-pointer
                          ${prefs[key as keyof Preferences]
                            ? 'bg-white border-white'
                            : 'bg-transparent border-[#242424] hover:border-white/30'
                          }`}
                      >
                        <div className={`absolute top-[3px] w-[11px] h-[11px] bg-black transition-all
                          ${prefs[key as keyof Preferences] ? 'left-[calc(100%-14px)]' : 'left-[3px]'}`}
                        />
                      </div>
                      <span className="font-mono text-[12px] text-white/50 group-hover:text-white/70 transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SAVE */}
          <div className="border border-[#242424] border-t-0 px-8 py-6 flex items-center justify-between">
            <p className="font-mono text-[11px] text-white/20">
              Changes apply to your next meeting
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="relative bg-white text-black font-mono text-[12px] uppercase
                         tracking-widest px-6 py-3 hover:opacity-90 transition-opacity
                         disabled:opacity-30"
            >
              <Corners />
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>

          {/* DANGER ZONE */}
          <div className="border border-[#242424] border-t-0">
            <div className="border-b border-[#242424] px-8 py-5">
              <Eyebrow text="Account" />
            </div>
            <div className="px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-[13px] text-white/60">Sign out of Meetly</p>
                <p className="font-mono text-[11px] text-white/20 mt-1">
                  You'll need to sign in again with Google
                </p>
              </div>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="font-mono text-[12px] text-white/40 border border-[#242424]
                           px-4 py-2.5 hover:text-white hover:border-white/30 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}