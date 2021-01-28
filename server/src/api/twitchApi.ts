import axios from "axios";

// Use local env file during development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let accessToken = "";
const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
  "Client-Id": process.env.CLIENT_ID,
};

export const getStreams = async (cursor: string, first: number = 10) => {
  return axios
    .get(`https://api.twitch.tv/helix/streams?first=${first}&after=${cursor}`, {
      headers: header,
    })
    .then((res) => res.data)
    .catch((e) => console.log("GET STREAMS ERROR", e.response.data));
};

export const getClips = async (
  broadcasterId: number,
  startedAt: string,
  first: number = 5
) => {
  return axios
    .get(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&started_at=${startedAt}&first=${first}`,
      {
        headers: header,
      }
    )
    .then((res) => {
      // console.log("RATE LIMIT", res.headers["ratelimit-remaining"]);
      process.stdout.write(res.headers["ratelimit-remaining"] + " ");
      return {
        clips: res.data,
        ratelimit: res.headers["ratelimit-remaining"],
      };
    })
    .catch((e) => {
      console.log("GET CLIPS ERROR", e.response.data);
      return null;
    });
};

export const getUser = async (id: number) => {
  return axios
    .get(`https://api.twitch.tv/helix/users?id=${id}`, {
      headers: header,
    })
    .then((res) => res.data)
    .catch((e) => console.log("GET USER ERROR", e.response.data));
};

export const getGames = async (first: number = 10) => {
  return axios
    .get(`https://api.twitch.tv/helix/games/top?first=${first}`, {
      headers: header,
    })
    .then((res) => res.data)
    .catch((e) => console.log("GET GAMES ERROR", e.response.data));
};

export const getValidated = async () => {
  return axios
    .get(`https://id.twitch.tv/oauth2/validate`, {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    })
    .catch(async () => {
      try {
        const res = await axios.post(
          `https://id.twitch.tv/oauth2/token`,
          null,
          {
            params: {
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              grant_type: "client_credentials",
            },
          }
        );
        console.log("TOKEN", res.data.access_token);
        accessToken = res.data.access_token;
        header["Authorization"] = `Bearer ${accessToken}`;
      } catch (e) {
        console.log("GET VALIDATED ERROR", e.response.data);
      }
    });
};
