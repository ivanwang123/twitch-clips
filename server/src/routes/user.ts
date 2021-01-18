import express from "express";
// import axios from "axios";
const router = express.Router();
// import TwitchApi from "node-twitch";
import { getClips, getStreams } from "../api/twitchApi";
// import { APIStreamResponse } from "node-twitch/dist/types/responses";
// import { APIClipsResponse } from "node-twitch/dist/types/responses";
// const twitch = new TwitchApi({
//   client_id: "b67lppx3k1yiomjepykwqssxpx1c5w",
//   client_secret: "aj5lfftu1v44ctbl53a52xcu1hyzcw",
//   // access_token: "oyx0mw7yoag9agezf0dqyxhluk0wqa",
//   // scopes: ["user:read:broadcast"],
// });

router.get("/all", async (_, res) => {
  let latestDate = new Date(Date.now() - 1800000).toISOString(); // half an hour ago
  let cursor = "";
  let clips = [];

  do {
    console.log("cursor", cursor);
    try {
      let streams = await getStreams(cursor);
      console.log("streams", streams);

      // const clipPromises: Promise<APIClipsResponse>[] = [];
      streams.data.forEach(async (stream: any) => {
        // console.log(stream.viewer_count, stream.user_id);
        // if (stream.viewer_count < 500) {
        // clipPromises.push(
        const clip = await getClips(stream.user_id, latestDate);
        // console.log('clip', clip.data[0])
        if (clip.data[0]) console.log("CLIP", clip.data[0]);
        // clips.push(
        // await twitch.getClips({
        //   broadcaster_id: stream.user_id,
        //   first: 5,
        //   started_at: latestDate,
        // })
        // ...clip
        // ...(await getClips(stream.user_id, latestDate))
        // );
        // );
        // }
      });
      // Promise.all(clipPromises).then((streamClips) => clips.push(...streamClips));
      // if (streams.data[0].viewer_count < 400) {
      //   console.log("END");
      //   cursor = "";
      //   break;
      // } else {
      //   cursor = streams.pagination?.cursor || "";
      // }
      // console.log(streams);
    } catch (e) {
      console.log("Error", e);
    }
  } while (cursor);
  res.send({ done: "done", clips: clips.length });
});

export default router;

// await axios
//   .get(`https://api.twitch.tv/helix/streams?first=100&after=${cursor}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer oyx0mw7yoag9agezf0dqyxhluk0wqa",
//       "Client-Id": "b67lppx3k1yiomjepykwqssxpx1c5w",
//     },
//   })
//   .then(async (streamRes) => {
//     // console.log(result.data.data[0].viewer_count);
//     for (let i = 0; i < streamRes.data.data.length; i++) {
//       const data = streamRes.data.data[i];
//       if (data.viewer_count < 100) {
//         // console.log(data.user_id);
//         let promises = [];
//         promises.push(
//           axios
//             .get(
//               `https://api.twitch.tv/helix/clips?broadcaster_id=${data.user_id}`,
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: "Bearer oyx0mw7yoag9agezf0dqyxhluk0wqa",
//                   "Client-Id": "b67lppx3k1yiomjepykwqssxpx1c5w",
//                 },
//               }
//             )
//             .then((clipRes) => {
//               clips.push(...clipRes.data.data);
//             })
//         );
//         await Promise.all(promises);
//       }
//     }
//     if (streamRes.data.data[0].viewer_count < 100) {
//       cursor = "";
//     } else {
//       cursor = streamRes.data.pagination.cursor;
//     }
//   })
//   .catch((err) => {
//     console.log("ERROR", err);
//   });
