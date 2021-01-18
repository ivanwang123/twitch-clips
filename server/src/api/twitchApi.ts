import axios from "axios";

const header = {
  "Content-Type": "application/json",
  Authorization: "Bearer j30trc8a80fc5wqvtd5i3tsf9ggif3",
  "Client-Id": "b67lppx3k1yiomjepykwqssxpx1c5w",
};

export const getStreams = async (cursor: string) => {
  return await axios
    .get(`https://api.twitch.tv/helix/streams?first=10&after=${cursor}`, {
      headers: header,
    })
    .then((res) => res.data);
};

export const getClips = async (broadcasterId: number, startedAt: string) => {
  return await axios
    .get(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&started_at=${startedAt}`,
      {
        headers: header,
      }
    )
    .then((res) => res.data);
};
