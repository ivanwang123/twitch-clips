import express from "express";
const router = express.Router();

router.get("/streams", (_, res) => {
  res.status(200).json({ streams: streams });
});

export default router;

// STREAMS
const streams = [
  {
    id: "40801297676",
    user_id: "474849254",
    user_name: "GeorgeNotFound",
    game_id: "27471",
    game_name: "Minecraft",
    type: "live",
    title: "Minecraft, But Blocks Attack You...",
    viewer_count: 72396,
    started_at: "2021-01-19T23:32:16Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_georgenotfound-{width}x{height}.jpg",
    tag_ids: ["6ea6bca4-4712-4ab9-a906-e3336a9d8039"],
    user: {
      id: "474849254",
      login: "georgenotfound",
      display_name: "GeorgeNotFound",
      type: "",
      broadcaster_type: "partner",
      description: "I play Minecraft sometimes :)",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/ff238566-dc40-4849-8f80-8fbbcfaabbc9-profile_image-300x300.png",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/146cbb8d-d09f-4642-8aa9-de2cc4dc292f-channel_offline_image-1920x1080.png",
      view_count: 8092398,
      created_at: "2019-11-27T01:07:36.665897Z",
    },
    clip: {
      id: "PoisedNurturingPancakeAMPEnergy",
      url: "https://clips.twitch.tv/PoisedNurturingPancakeAMPEnergy",
      embed_url:
        "https://clips.twitch.tv/embed?clip=PoisedNurturingPancakeAMPEnergy",
      broadcaster_id: "474849254",
      broadcaster_name: "GeorgeNotFound",
      creator_id: "536873011",
      creator_name: "the_pan_in_panic",
      video_id: "880319146",
      game_id: "27471",
      language: "en",
      title: "PLEASE LET THE DREAM TEAM LIVE TOGETHER COVID",
      view_count: 13,
      created_at: "2021-01-20T01:27:05Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/AT-cm%7C1013820474-preview-480x272.jpg",
    },
  },
  {
    id: "41378136222",
    user_id: "71092938",
    user_name: "xQcOW",
    game_id: "21779",
    game_name: "League of Legends",
    type: "live",
    title:
      "BING BANK POW BEST PLAYER OF ALL GAMES GIVES TIPS FOR NOOBS *GONE WRONG* ",
    viewer_count: 65948,
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
      view_count: 260889615,
      created_at: "2014-09-12T23:50:05.989719Z",
    },
    clip: {
      id: "ReliableSplendidSnakeRedCoat",
      url: "https://clips.twitch.tv/ReliableSplendidSnakeRedCoat",
      embed_url:
        "https://clips.twitch.tv/embed?clip=ReliableSplendidSnakeRedCoat",
      broadcaster_id: "71092938",
      broadcaster_name: "xQcOW",
      creator_id: "441695893",
      creator_name: "ShinseiVr",
      video_id: "880145539",
      game_id: "21779",
      language: "en",
      title: "Forsen OmegaLUL",
      view_count: 16,
      created_at: "2021-01-20T01:27:10Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/AT-cm%7C1013820588-preview-480x272.jpg",
    },
  },
  {
    id: "40246318893",
    user_id: "569325723",
    user_name: "loud_coringa",
    game_id: "32982",
    game_name: "Grand Theft Auto V",
    type: "live",
    title: "LOUD CORINGA AO VIVO - DIA DE DECISAO",
    viewer_count: 59025,
    started_at: "2021-01-19T22:34:48Z",
    language: "pt",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_loud_coringa-{width}x{height}.jpg",
    tag_ids: ["39ee8140-901a-4762-bfca-8260dea1310f"],
    user: {
      id: "569325723",
      login: "loud_coringa",
      display_name: "loud_coringa",
      type: "",
      broadcaster_type: "partner",
      description:
        "Eaeeee! Meu nome é Victor, mais conhecido como Coringa! Sou da Loud, uma organização giganteee com diversos criadores e faço lives todos os dias aqui na Twitch. Prepare-se pra dar muitas risadas, passar nervoso em diversos games e acima de tudo se divertir! Ja segue e liga as notificações.",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/ec42ece7-e343-4ae8-b23d-864754bfc5c1-profile_image-300x300.png",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/e4e31231-b6c6-417f-9701-6f8f7669d9cd-channel_offline_image-1920x1080.jpeg",
      view_count: 5271785,
      created_at: "2020-08-19T03:18:41.005557Z",
    },
    clip: {
      id: "CuteSquareBeefTBCheesePull",
      url: "https://clips.twitch.tv/CuteSquareBeefTBCheesePull",
      embed_url:
        "https://clips.twitch.tv/embed?clip=CuteSquareBeefTBCheesePull",
      broadcaster_id: "569325723",
      broadcaster_name: "loud_coringa",
      creator_id: "541366537",
      creator_name: "a20marcelo",
      video_id: "880253063",
      game_id: "32982",
      language: "pt-br",
      title: "LOUD CORINGA AO VIVO - DIA DE DECISAO",
      view_count: 4,
      created_at: "2021-01-20T01:30:17Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/40246318893-offset-10514-preview-480x272.jpg",
    },
  },
  {
    id: "41377236670",
    user_id: "121510236",
    user_name: "juansguarnizo",
    game_id: "263490",
    game_name: "Rust",
    type: "live",
    title: "DROPS DE MI SKIN, TORNEO DE FORTNITE y GRABANDO BDNA🚨",
    viewer_count: 37130,
    started_at: "2021-01-19T19:30:43Z",
    language: "es",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_juansguarnizo-{width}x{height}.jpg",
    tag_ids: [
      "d4bb9c58-2141-4881-bcdc-3fe0505457d1",
      "c2542d6d-cd10-4532-919b-3d19f30a768b",
    ],
    user: {
      id: "121510236",
      login: "juansguarnizo",
      display_name: "juansguarnizo",
      type: "",
      broadcaster_type: "partner",
      description:
        "Juan Sebastián Guarnizo es un director, guionista, productor y novelista colombiano, galardonado con el Premio Goya y varias veces con el Premio Ariel. En 2018 se hizo acreedor al Globo de Oro como mejor director por su película La forma del agua.",
      profile_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/74586414-e27b-4347-89c5-109e42ac3e1d-profile_image-300x300.png",
      offline_image_url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/83c767ef-6091-49f2-b4bf-64898b86bc58-channel_offline_image-1920x1080.png",
      view_count: 42574618,
      created_at: "2016-04-11T03:34:11.489903Z",
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
    viewer_count: 34776,
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
      view_count: 210330421,
      created_at: "2013-11-14T00:27:41.456706Z",
    },
    clip: {
      id: "AmazonianKitschyMooseWoofer",
      url: "https://clips.twitch.tv/AmazonianKitschyMooseWoofer",
      embed_url:
        "https://clips.twitch.tv/embed?clip=AmazonianKitschyMooseWoofer",
      broadcaster_id: "51496027",
      broadcaster_name: "loltyler1",
      creator_id: "57168088",
      creator_name: "flamingobums",
      video_id: "880151402",
      game_id: "21779",
      language: "en",
      title: "true",
      view_count: 19,
      created_at: "2021-01-20T01:29:48Z",
      thumbnail_url:
        "https://clips-media-assets2.twitch.tv/AT-cm%7C1013823810-preview-480x272.jpg",
    },
  },
];
