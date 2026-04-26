import { useIsRecording } from '@livekit/components-react';
import * as React from 'react';
import toast from 'react-hot-toast';

export function RecordingIndicator() {
  const isRecording = useIsRecording();
  const [wasRecording, setWasRecording] = React.useState(false);

  // ✅ Toast notification when recording starts/stops
  React.useEffect(() => {
    if (isRecording !== wasRecording) {
      setWasRecording(isRecording);
      if (isRecording) {
        toast('This meeting is being recorded', {
          duration: 4000,
          icon: '🔴',
          position: 'top-center',
          style: {
            background: '#1c1c1f',
            color: '#fff',
            border: '1px solid rgba(239,68,68,0.3)',
            fontSize: '13px',
          },
        });
      } else if (wasRecording) {
        toast('Recording stopped', {
          duration: 3000,
          icon: '⏹️',
          position: 'top-center',
          style: {
            background: '#1c1c1f',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '13px',
          },
        });
      }
    }
  }, [isRecording, wasRecording]);

  return (
    <>
      {/* ✅ Persistent badge — visible to everyone while recording */}
      {isRecording && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '99px',
            background: 'rgba(20,20,22,0.9)',
            border: '1px solid rgba(239,68,68,0.35)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none',
          }}
        >
          {/* Pulsing red dot */}
          <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.4,
                animation: 'rec-ping 1.4s ease-in-out infinite',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#ef4444',
              }}
            />
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: '#ef4444',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            REC
          </span>
        </div>
      )}

      {/* ✅ Red border around entire screen */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          boxShadow: isRecording ? 'rgba(239,68,68,0.4) 0px 0px 0px 3px inset' : 'none',
          pointerEvents: 'none',
          transition: 'box-shadow 0.3s ease',
          zIndex: 40,
        }}
      />

      {/* Keyframe for pulsing dot */}
      <style>{`
        @keyframes rec-ping {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </>
  );
}