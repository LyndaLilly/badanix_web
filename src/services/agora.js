import AgoraRTC from "agora-rtc-sdk-ng";

export default function createAgoraClient() {
  return AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });
}