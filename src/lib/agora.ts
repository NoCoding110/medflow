import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

// Replace with your Agora App ID
export const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "your-app-id";

// Client configuration
export const config = {
  mode: "rtc",
  codec: "vp8",
} as const;

// Create Agora client
export const createClient = (): IAgoraRTCClient => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  return client;
};

// Create local tracks
export const createLocalTracks = async (): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> => {
  const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
  return [audioTrack, videoTrack];
};

// Join channel
export const joinChannel = async (
  client: IAgoraRTCClient,
  channelName: string,
  token?: string
): Promise<void> => {
  const appId = import.meta.env.VITE_AGORA_APP_ID;
  if (!appId) {
    throw new Error("Agora App ID is not configured");
  }
  
  await client.join(appId, channelName, token || null);
};

// Leave channel
export const leaveChannel = async (client: IAgoraRTCClient): Promise<void> => {
  await client.leave();
};

// Publish tracks
export const publishTracks = async (
  client: IAgoraRTCClient,
  tracks: (IMicrophoneAudioTrack | ICameraVideoTrack)[]
): Promise<void> => {
  await client.publish(tracks);
};

// Unpublish tracks
export const unpublishTracks = async (
  client: IAgoraRTCClient,
  tracks: (IMicrophoneAudioTrack | ICameraVideoTrack)[]
): Promise<void> => {
  await client.unpublish(tracks);
};

// Export types
export type {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
}; 