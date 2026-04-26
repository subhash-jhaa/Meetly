function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
}

// ✅ All required env vars for Meetly — validated once at startup
export const env = {
  // Database
  DATABASE_URL: requireEnv('DATABASE_URL'),

  // Auth
  AUTH_SECRET: requireEnv('AUTH_SECRET'),
  GOOGLE_CLIENT_ID: requireEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: requireEnv('GOOGLE_CLIENT_SECRET'),

  // LiveKit
  LIVEKIT_API_KEY: requireEnv('LIVEKIT_API_KEY'),
  LIVEKIT_API_SECRET: requireEnv('LIVEKIT_API_SECRET'),
  LIVEKIT_URL: requireEnv('LIVEKIT_URL'),
} as const;