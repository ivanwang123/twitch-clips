import { getStreams, getClips, getUser, getValidated } from "./api/twitchApi";
import pool from "./pool";

const START_CURSOR =
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam80TGpjMk16WTJNemMzTVRjME1EQTRNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzNMamN6TnpNd09EVXdNREV3TXpZd09Dd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0";
const MAX_OFFSET = 2001;

let cursor = START_CURSOR;
let offset = 0;
let pause = false;

const CLIP_TIMEFRAME = 1200000; // 20 minutes
const BATCH_SIZE = 3;

export const fetchData = async () => {
  setInterval(async () => {
    if (pause) {
      // Skip this cycle to regain ratelimit points
      pause = false;
    } else {
      // Check access token is validated
      getValidated();

      let latestDate = new Date(Date.now() - CLIP_TIMEFRAME).toISOString();

      for (let i = 0; i < BATCH_SIZE; i++) {
        try {
          let streams = await getStreams(cursor, 100);

          for (let i = 0; i < streams.data.length; i++) {
            const stream = streams.data[i];
            const clips = await getClips(stream.user_id, latestDate);
            const topClip = clips?.clips.data[0];
            const ratelimit = parseInt(clips?.ratelimit);

            // Ensure ratelimit does not drop too low
            if (ratelimit < 700) pause = true;

            if (topClip) {
              const user = await getUser(stream.user_id);
              const clipUser = user.data[0];

              if (clipUser) {
                const clipValues = [
                  parseInt(stream.user_id),
                  stream.user_name,
                  stream.game_name || "Unknown",
                  stream.game_id || "0",
                  stream.type,
                  stream.title,
                  stream.viewer_count,
                  stream.language,
                  clipUser.login,
                  clipUser.profile_image_url,
                  topClip.id,
                  topClip.embed_url,
                  topClip.title,
                  topClip.view_count,
                  topClip.created_at,
                ];

                const insertClipText = `INSERT INTO clips(user_id, user_name, game_name, game_id, stream_type, stream_title, stream_viewer_count, language,
                                    login, profile_image_url, clip_id, clip_embed_url, clip_title, clip_view_count, clip_created_at) VALUES
                                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT DO NOTHING;`;
                pool
                  .query(insertClipText, [...clipValues])
                  .catch((err) =>
                    console.log("INSERT CLIP ERROR", err, clipValues)
                  );
              }
            }
          }

          if (streams.pagination && offset < MAX_OFFSET - 1) {
            cursor = streams.pagination.cursor;
            offset++;
            console.log("CURSOR", cursor, offset);
          } else {
            cursor = START_CURSOR;
            offset = 0;
          }
        } catch (e) {
          console.log("Error", e);
        }
      }

      // Remove old clips that go beyond maximum rows
      const cleanDbText = `DELETE FROM clips
                          WHERE id NOT IN (
                            SELECT id FROM clips
                            ORDER BY clip_created_at DESC
                            LIMIT 120
                          );`;
      pool
        .query(cleanDbText)
        .catch((err) => console.log("CLEAN DATABASE ERROR", err));
    }
  }, 60000); // one minute
};
