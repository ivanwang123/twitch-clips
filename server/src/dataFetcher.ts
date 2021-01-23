import { getClips, getStreams, getUser } from "./api/twitchApi";
import pool from "./pool";

const LOOP_TIME = 300000;

export const fetchData = async () => {
  let latestDate = new Date(Date.now() - LOOP_TIME).toISOString(); // 5 minutes ago
  let cursor =
    "eyJiIjp7IkN1cnNvciI6ImV5SnpJam95TGprNU1qQTRPVFV6TnpJd016TXpNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3lMams0TkRZMU1qUTJPVGt5TlRNNE5Td2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0";

  // do {
  console.log("cursor", cursor);
  try {
    let streams = await getStreams(cursor, 100);
    // console.log("streams", streams);

    for (let i = 0; i < streams.data.length; i++) {
      const stream = streams.data[i];
      const clip = await getClips(stream.user_id, latestDate);
      const topClip = clip.data[0];
      console.log("COUNT", i);

      if (topClip) {
        const user = await getUser(stream.user_id);
        const clipUser = user.data[0];
        if (clipUser) {
          const clipValues = [
            parseInt(stream.user_id),
            stream.user_name,
            stream.game_name,
            stream.game_id,
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

          const insertText = `INSERT INTO clips(user_id, user_name, game_name, game_id, stream_type, stream_title, stream_viewer_count, language,
                              login, profile_image_url, clip_id, clip_embed_url, clip_title, clip_view_count, clip_created_at) VALUES
                              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT DO NOTHING`;
          pool
            .query(insertText, [...clipValues])
            .catch((err) => console.log("POOL QUERY ERROR", err));
          console.log(clipValues[1]);
        }
      }
    }
  } catch (e) {
    console.log("Error", e);
  }
  // } while (cursor);
};

// setInterval(fetchData, LOOP_TIME); // every 5 minutes
