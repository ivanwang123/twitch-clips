import express from "express";
import { getClips, getStreams, getUser } from "../api/twitchApi";

const router = express.Router();

router.get("/all", async (_, res) => {
  let latestDate = new Date(Date.now() - 1800000).toISOString(); // half an hour ago
  let cursor = "";
  let clipsData: any[] = [];

  do {
    try {
      let streams = await getStreams(cursor, 5);

      for (let i = 0; i < streams.data.length; i++) {
        const stream = streams.data[i];
        const clip = await getClips(stream.user_id, latestDate);
        const user = await getUser(stream.user_id);

        if (user.data[0] && clip?.clips.data[0]) {
          const clipData = {
            ...stream,
            user: user.clips.data[0],
            clip: clip?.clips.data[0],
          };
          clipsData.push(clipData);
        }
      }
    } catch (e) {
      console.log("Error", e);
      res
        .status(500)
        .json({ alert: { error: true, msg: "Unable to retrieve clips" } });
    }
  } while (cursor);

  res.status(200).json({
    alert: { error: false, msg: "Successfully retrieved clips" },
    clips: clipsData,
  });
});

router.get("/test", async (_, res) => {
  let cursor =
    "eyJiIjp7IkN1cnNvciI6ImV5SnpJam95Tmk0eE1EWTBNakV6T1RJME16VTNOeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3lOUzQyTVRRMk5ESTNNekk1T0RJM09Td2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0";

  do {
    try {
      let streams = await getStreams(cursor, 100);
      if (streams.pagination && streams.pagination.cursor) {
        cursor = streams.pagination.cursor;
      } else {
        cursor = "";
      }
    } catch (e) {
      console.log("Error", e);
      res
        .status(500)
        .json({ alert: { error: true, msg: "Unable to retrieve clips" } });
    }
  } while (cursor);

  res.status(200).json({
    alert: { error: false, msg: "Successfully retrieved clips" },
    // clips: clipsData,
  });
});

export default router;
