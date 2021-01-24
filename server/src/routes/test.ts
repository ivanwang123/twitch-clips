import express from "express";
const sql = require("sql-query-generator");
import { getGames } from "../api/twitchApi";
import pool from "../pool";

const router = express.Router();

router.get("/db-streams", (req, res) => {
  console.log("REQ", req.query);
  streams;
  const { game, language, cursor } = req.query;

  pool.connect((poolErr, client, release) => {
    if (poolErr) {
      release();
      res.status(500).json({ alert: { error: true, msg: poolErr.message } });
    }

    // Select clips
    const query = sql.select("clips", "*");
    let hasCursor = false;

    // Paginate by created_at date
    if (cursor?.length) {
      query.where({ clip_created_at: cursor }, "<");
      hasCursor = true;
    }

    // Add game and language filters
    const queryParams: any = {};
    if (language !== "any") queryParams["language"] = language;
    if (game !== "0") queryParams["game_id"] = game;
    if (Object.keys(queryParams).length > 0) {
      if (hasCursor) query.and(queryParams);
      else query.where(queryParams);
    }

    // Take 10 most recent
    query.orderby("clip_created_at DESC").limit(10, 0);

    console.log("QUERY", query.text, query.values);

    client.query(query.text, query.values, (err, data) => {
      release();
      if (err) {
        res.status(500).json({ alert: { error: true, msg: err.message } });
      }
      res.status(200).json({
        clips: data.rows,
        alert: { error: false, msg: "Successfully retrieved clips" },
      });
    });
  });
});

router.get("/games", async (_, res) => {
  const games = await getGames(100);
  games.data.forEach((game: any) => {
    console.log(`\"${game.name}\": \"${game.id}\",`);
  });
  res.send({ done: "done" });
});

export default router;

// STREAMS
const streams = [
  {
    id: "41378136222",
    user_id: "71092938",
    user_name: "xQcOW",
    game_id: "516575",
    game_name: "VALORANT",
    type: "live",
    title:
      "BING BANK POW BEST PLAYER OF ALL GAMES GIVES TIPS FOR NOOBS *GONE WRONG* ",
    viewer_count: 66222,
    started_at: "2021-01-19T21:02:43Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqcow-{width}x{height}.jpg",
    tag_ids: [
      "6ea6bca4-4712-4ab9-a906-e3336a9d8039",
      "6606e54c-f92d-40f6-8257-74977889ccdd",
    ],
    user: {
      id: "71092938",
      login: "xqcow",
      display_name: "xQcOW",
      type: "",
      broadcaster_type: "partner",
      description:
        "Overwatch Professional tank player and full time streamer. EZ Clap",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-300x300.jpeg",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/a766d7ca-03cb-456e-9a6c-9d109eff47f1-channel_offline_image-1920x1080.png",
      view_count: 261009693,
      created_at: "2014-09-12T23:50:05.989719Z",
    },
    clip: {
      id: "WisePuzzledAnteaterPeoplesChamp",
      url: "https://clips.twitch.tv/WisePuzzledAnteaterPeoplesChamp",
      embed_url:
        "https://clips.twitch.tv/embed?clip=WisePuzzledAnteaterPeoplesChamp",
      broadcaster_id: "71092938",
      broadcaster_name: "xQcOW",
      creator_id: "635532770",
      creator_name: "jaqs__official",
      video_id: "880145539",
      game_id: "516575",
      language: "en",
      title: "XQC on Sad Donos",
      view_count: 169,
      created_at: "2021-01-20T03:38:20Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/AT-cm%7C1013990738-preview-480x272.jpg",
    },
  },
  {
    id: "41379111630",
    user_id: "26490481",
    user_name: "summit1g",
    game_id: "491931",
    game_name: "Escape From Tarkov",
    type: "live",
    title: "EFT. SO CLOSE! [ @summit1g ]",
    viewer_count: 32548,
    started_at: "2021-01-19T22:35:46Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_summit1g-{width}x{height}.jpg",
    tag_ids: [
      "2a14b52e-d459-4c92-be11-5d86b898f6b6",
      "6ea6bca4-4712-4ab9-a906-e3336a9d8039",
    ],
    user: {
      id: "26490481",
      login: "summit1g",
      display_name: "summit1g",
      type: "",
      broadcaster_type: "partner",
      description:
        "I'm a variety streamer(kind of). Been streaming 8 years(another number to change every year).I'm 100% better than you at shooting and puzzle games.@summit1g via Twitter.",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/99aa4739-21d6-40af-86ae-4b4d3457fce4-profile_image-300x300.png",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/4f915056-3bba-4072-b83e-49151c657417-channel_offline_image-1920x1080.png",
      view_count: 417820214,
      created_at: "2011-12-01T06:33:31.487567Z",
    },
    clip: {
      id: "CorrectRamshackleSalamanderVoteNay",
      url: "https://clips.twitch.tv/CorrectRamshackleSalamanderVoteNay",
      embed_url:
        "https://clips.twitch.tv/embed?clip=CorrectRamshackleSalamanderVoteNay",
      broadcaster_id: "26490481",
      broadcaster_name: "summit1g",
      creator_id: "21446774",
      creator_name: "tryptamino",
      video_id: "880254187",
      game_id: "491931",
      language: "en",
      title: "Hutch got sniped from dome",
      view_count: 1030,
      created_at: "2021-01-20T03:50:11Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/AT-cm%7C1014003657-preview-480x272.jpg",
    },
  },
  {
    id: "41378181182",
    user_id: "51496027",
    user_name: "loltyler1",
    game_id: "21779",
    game_name: "League of Legends",
    type: "live",
    title: "SPECTACULAR TURBO WINNER ! BIG BIG MAN GO DOMINATION ! WEEEEEE !",
    viewer_count: 31761,
    started_at: "2021-01-19T21:07:09Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_loltyler1-{width}x{height}.jpg",
    tag_ids: ["6ea6bca4-4712-4ab9-a906-e3336a9d8039"],
    user: {
      id: "51496027",
      login: "loltyler1",
      display_name: "loltyler1",
      type: "",
      broadcaster_type: "partner",
      description:
        "Season 6 Challenger | Most REFORMED Player NA | #1 Draven World ",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-300x300.png",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/2d5a63b7-1297-481d-b050-d1b58e10945d-channel_offline_image-1920x1080.png",
      view_count: 210396133,
      created_at: "2013-11-14T00:27:41.456706Z",
    },
    clip: {
      id: "KindVibrantThymeTheRinger",
      url: "https://clips.twitch.tv/KindVibrantThymeTheRinger",
      embed_url: "https://clips.twitch.tv/embed?clip=KindVibrantThymeTheRinger",
      broadcaster_id: "51496027",
      broadcaster_name: "loltyler1",
      creator_id: "170203589",
      creator_name: "Brady_Twitch",
      video_id: "880151402",
      game_id: "21779",
      language: "en",
      title: "pepelaff",
      view_count: 22,
      created_at: "2021-01-20T03:30:19Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/AT-cm%7C1013981323-preview-480x272.jpg",
    },
  },
  {
    id: "40247692557",
    user_id: "59299632",
    user_name: "AdinRoss",
    game_id: "32982",
    game_name: "Grand Theft Auto V",
    type: "live",
    title: "GRIZZ RP !sub !prime",
    viewer_count: 28144,
    started_at: "2021-01-20T00:25:12Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_adinross-{width}x{height}.jpg",
    tag_ids: ["6ea6bca4-4712-4ab9-a906-e3336a9d8039"],
    user: {
      id: "59299632",
      login: "adinross",
      display_name: "AdinRoss",
      type: "",
      broadcaster_type: "partner",
      description:
        "Youtube.com/AdinRoss                                                        Twitter.com/adinross",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/10c197cb-295f-4d40-8a6c-26a0a5da22ee-profile_image-300x300.png",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/e569badb-3df1-4fd3-bc5f-1c26942dcc0b-channel_offline_image-1920x1080.png",
      view_count: 5372043,
      created_at: "2014-03-20T22:28:22.813998Z",
    },
    clip: {
      id: "SlipperyTawdryClintmullinsPhilosoraptor",
      url: "https://clips.twitch.tv/SlipperyTawdryClintmullinsPhilosoraptor",
      embed_url:
        "https://clips.twitch.tv/embed?clip=SlipperyTawdryClintmullinsPhilosoraptor",
      broadcaster_id: "59299632",
      broadcaster_name: "AdinRoss",
      creator_id: "194799293",
      creator_name: "RelaxItsArod",
      video_id: "880382001",
      game_id: "32982",
      language: "en",
      title: "adin",
      view_count: 7,
      created_at: "2021-01-20T03:31:39Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/40247692557-offset-11174-preview-480x272.jpg",
    },
  },
];
