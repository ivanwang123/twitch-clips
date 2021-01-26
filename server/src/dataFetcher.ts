import { getStreams, getClips, getUser } from "./api/twitchApi";
import pool from "./pool";

// 1000th cursor
// eyJiIjp7IkN1cnNvciI6ImV5SnpJam80TGpjMk16WTJNemMzTVRjME1EQTRNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzNMamN6TnpNd09EVXdNREV3TXpZd09Dd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0

const cursors = [
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam80TGpjMk16WTJNemMzTVRjME1EQTRNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzNMamN6TnpNd09EVXdNREV3TXpZd09Dd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8zTGpNd01qYzFNRGs1TWpnNU1qQXhPU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzNMakkxT1RNMU5EYzRPVE01T1RBME1pd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yTGpnek9UTTJNamcxTlRjek1EUXpMQ0prSWpwbVlXeHpaU3dpZENJNmRISjFaWDA9In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzJMamM1TmpZeE56RXpNekE1TWpnMk1UVXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yTGpReU5EVTJPVGcyTnpFNE5EVXhPQ3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzJMak0zTmpVeE1UazJNVGd6T0RBd01Td2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGprNU9EVXdOakV6TURnNE16RXlNaXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzFMamszTVRVNE5qZ3lNRFE1TXpBd055d2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGpjME5UTXhNekUyTXpBNE9EazBMQ0prSWpwbVlXeHpaU3dpZENJNmRISjFaWDA9In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzFMamN4T1RNNU1qRTNOamswTnprNU55d2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGpVd01qSXpNalF4TWpRMU9Ea3hOeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzFMalEzTlRZeE9URTFOVGcxTkRRNE1EUXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGpJME5qZ3pOekF5TXpRM01ESTRMQ0prSWpwbVlXeHpaU3dpZENJNmRISjFaWDA9In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzFMakl5TlRjeE16VTRNalU1TWpFek5Td2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGpBd016azFNekUxTmpjMk1EZzRNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzBMamszTnpNMU1UZzROVGd4TWpNeU15d2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8wTGpjeU5ESTNOekkyTmpRMk9UZzBPU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzBMalk1T0RreE1qQTVOakl3TWpjd015d2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8wTGpRM016STBOekF5TlRVd05EazVPU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzBMalExTWpZMk1qRXlOamM1TlRFNU5Dd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8wTGpJek5EQXdNemczT1RnNE1qZzJNaXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzBMakl4TURVMk1EWTVOemswTVRNMU5pd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam96TGprNU9UY3hNRGN6TkRjd01EY3hOallzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam96TGprNE56VTRPREl5T1RReE5qUXlOQ3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8wTGpnMk9EVTVNRFl5TWpnM05qa3dPRFVzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam96TGpnMU56WTJNREV6T0RVME16Y3pNaXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGpjeU5qYzNNamN5TWpJMU9EZzNPQ3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3pMamN5TXpjMU1ESXlOemd5T0RFd01qVXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8xTGpZd09UQTNNelF4T1Rjek1UTTJMQ0prSWpwbVlXeHpaU3dpZENJNmRISjFaWDA9In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3pMalU1TXpVM09EazFPRGcxTWpJek5Td2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam96TGpRNE1EUTJPVFF6TXpRMk9UZ3dOeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3pMalEyTmprMU5ETTVORFkwT0RFNUxDSmtJanBtWVd4elpTd2lkQ0k2ZEhKMVpYMD0ifX0",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam96TGpNME9EYzBNVFl4TURFMU1EQXlOVFlzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam96TGpNek56VTNNVGMyTXpFd09UUXpNaXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam96TGpJeU1UTTROak13T1RjMk5EWTNNRGNzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam96TGpJd09EVXdNemsxT0RFNE1qRTNOelVzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9fQ",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam96TGpFd016a3hNRFkwTVRjMk9Ea3lOalFzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam96TGpBNE9UZzBPVEk0TkRrek16azJNU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In19",
  "eyJiIjp7IkN1cnNvciI6ImV5SnpJam95TGprNU1qQTRPVFV6TnpJd016TXpNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3lMams0TkRZMU1qUTJPVGt5TlRNNE5Td2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0",
];

// const START_CURSOR = 'eyJiIjp7IkN1cnNvciI6ImV5SnpJam80TGpjMk16WTJNemMzTVRjME1EQTRNeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzNMamN6TnpNd09EVXdNREV3TXpZd09Dd2laQ0k2Wm1Gc2MyVXNJblFpT25SeWRXVjkifX0'
// const MAX_OFFSET = 2000;
// let cursor = START_CURSOR;
// let offset = 0;

// const CLIP_TIMEFRAME = 1200000; // 20 minutes
// const BATCH_SIZE = 3;

const CLIP_TIMEFRAME = 420000; // 7 minutes
const TOTAL_CURSORS = cursors.length; // 21 cursors
const BATCH_SIZE = 3;
let cursorIndex = 0;

export const fetchData = async () => {
  setInterval(async () => {
    let latestDate = new Date(Date.now() - CLIP_TIMEFRAME).toISOString();

    for (let i = cursorIndex; i < cursorIndex + BATCH_SIZE; i++) {
      let cursor = cursors[i];

      // console.log("cursor", cursor);
      try {
        let streams = await getStreams(cursor, 100);
        // console.log("streams", streams);

        for (let i = 0; i < streams.data.length; i++) {
          const stream = streams.data[i];
          const clip = await getClips(stream.user_id, latestDate);
          const topClip = clip.data[0];
          // console.log("COUNT", i);

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
              // console.log("TOP CLIP", clipValues);

              const insertText = `INSERT INTO clips(user_id, user_name, game_name, game_id, stream_type, stream_title, stream_viewer_count, language,
                              login, profile_image_url, clip_id, clip_embed_url, clip_title, clip_view_count, clip_created_at) VALUES
                              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT DO NOTHING`;
              pool
                .query(insertText, [...clipValues])
                .catch((err) => console.log("POOL QUERY ERROR", err));

              // console.log(clipValues[1]);
            }
          }
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    cursorIndex = (cursorIndex + BATCH_SIZE) % TOTAL_CURSORS;
  }, 60000); // one minute
};
