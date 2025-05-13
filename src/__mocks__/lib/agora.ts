// Mock for Agora functions
export const createClient = jest.fn();
export const createLocalTracks = jest.fn();
export const joinChannel = jest.fn();
export const leaveChannel = jest.fn();
export const publish = jest.fn();
export const subscribe = jest.fn();
export const AgoraRTC = {};
export default {
  createClient,
  createLocalTracks,
  joinChannel,
  leaveChannel,
  publish,
  subscribe,
  AgoraRTC
}; 