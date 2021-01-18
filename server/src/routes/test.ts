import express from "express";
const router = express.Router();

router.get("/streams", (_, res) => {
  res.status(200).json({ streams: streams });
});

export default router;

// STREAMS
const streams = [
  {
    id: "40216467517",
    user_id: "36511475",
    user_name: "RiotGamesBrazil",
    game_id: "21779",
    game_name: "League of Legends",
    type: "live",
    title: "CBLOL 2021: 1ª Etapa - Fase de Pontos - Md1 | Semana 1 - Rodada 2",
    viewer_count: 131026,
    started_at: "2021-01-17T14:58:15Z",
    language: "pt",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgamesbrazil-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "SpineySteamyTubersPeanutButterJellyTime",
        url: "https://clips.twitch.tv/SpineySteamyTubersPeanutButterJellyTime",
        embed_url:
          "https://clips.twitch.tv/embed?clip=SpineySteamyTubersPeanutButterJellyTime",
        broadcaster_id: "36511475",
        broadcaster_name: "RiotGamesBrazil",
        creator_id: "485489046",
        creator_name: "andretaquette",
        video_id: "877267094",
        game_id: "21779",
        language: "pt-br",
        title: "ACE DA LOUD HJ",
        view_count: 37,
        created_at: "2021-01-17T16:58:38Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/40216467517-offset-7214-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "41349835006",
    user_id: "545050196",
    user_name: "加藤純一です",
    game_id: "493057",
    game_name: "PLAYERUNKNOWN'S BATTLEGROUNDS",
    type: "live",
    title: "PUBGファンの皆様、APEXに敗れた私とよりを戻してください；；",
    viewer_count: 73156,
    started_at: "2021-01-17T14:31:43Z",
    language: "ja",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_kato_junichi0817-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "ColorfulBetterDonkeySwiftRage",
        url: "https://clips.twitch.tv/ColorfulBetterDonkeySwiftRage",
        embed_url:
          "https://clips.twitch.tv/embed?clip=ColorfulBetterDonkeySwiftRage",
        broadcaster_id: "545050196",
        broadcaster_name: "加藤純一です",
        creator_id: "560702695",
        creator_name: "gnsawchan",
        video_id: "877244208",
        game_id: "493057",
        language: "ja",
        title: "PUBGファンの皆様、APEXに敗れた私とよりを戻してください；；",
        view_count: 4,
        created_at: "2021-01-17T17:12:09Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/41349835006-offset-9616-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "40775354348",
    user_id: "83232866",
    user_name: "ibai",
    game_id: "509658",
    game_name: "Just Chatting",
    type: "live",
    title:
      "Solo los más sexys pueden entrar en este stream. Así que puedes entrar.",
    viewer_count: 64562,
    started_at: "2021-01-17T16:23:55Z",
    language: "es",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_ibai-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "EndearingSmellyChimpanzeeCharlieBitMe",
        url: "https://clips.twitch.tv/EndearingSmellyChimpanzeeCharlieBitMe",
        embed_url:
          "https://clips.twitch.tv/embed?clip=EndearingSmellyChimpanzeeCharlieBitMe",
        broadcaster_id: "83232866",
        broadcaster_name: "ibai",
        creator_id: "536376305",
        creator_name: "drys0uls",
        video_id: "877350789",
        game_id: "509658",
        language: "es",
        title: "sicarios?",
        view_count: 313,
        created_at: "2021-01-17T16:50:20Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/AT-cm%7C1010308317-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "40216103837",
    user_id: "49207184",
    user_name: "fps_shaka",
    game_id: "493057",
    game_name: "PLAYERUNKNOWN'S BATTLEGROUNDS",
    type: "live",
    title: "[DTN]罪深きかわかに",
    viewer_count: 56387,
    started_at: "2021-01-17T14:14:09Z",
    language: "ja",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_fps_shaka-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "BlushingEagerKaleCopyThis",
        url: "https://clips.twitch.tv/BlushingEagerKaleCopyThis",
        embed_url:
          "https://clips.twitch.tv/embed?clip=BlushingEagerKaleCopyThis",
        broadcaster_id: "49207184",
        broadcaster_name: "fps_shaka",
        creator_id: "222868378",
        creator_name: "tottokotomato",
        video_id: "877229825",
        game_id: "493057",
        language: "ja",
        title: "初信、しょうがないべ　もこう",
        view_count: 922,
        created_at: "2021-01-17T16:59:12Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/40216103837-offset-9884-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "41350136014",
    user_id: "57781936",
    user_name: "RocketLeague",
    game_id: "30921",
    game_name: "Rocket League",
    type: "live",
    title:
      "Dignitas vs. WOO | Championship Sunday | RLCS X Winter Split | European Regional #3 ",
    viewer_count: 49365,
    started_at: "2021-01-17T15:25:01Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_rocketleague-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "SplendidVictoriousPorcupineWTRuck",
        url: "https://clips.twitch.tv/SplendidVictoriousPorcupineWTRuck",
        embed_url:
          "https://clips.twitch.tv/embed?clip=SplendidVictoriousPorcupineWTRuck",
        broadcaster_id: "57781936",
        broadcaster_name: "RocketLeague",
        creator_id: "609612281",
        creator_name: "ShaMelk",
        video_id: "877292609",
        game_id: "30921",
        language: "en",
        title: "APPARENTLY JACK",
        view_count: 18,
        created_at: "2021-01-17T16:55:38Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/41350136014-offset-5424-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "41349196750",
    user_id: "138117508",
    user_name: "악어",
    game_id: "27471",
    game_name: "Minecraft",
    type: "live",
    title: '마크에이지3 : 드디어 사신수"청룡" 제작 합니다 7회차',
    viewer_count: 34421,
    started_at: "2021-01-17T12:15:52Z",
    language: "ko",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_jdm2088-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "FunnySecretiveTrayLitty",
        url: "https://clips.twitch.tv/FunnySecretiveTrayLitty",
        embed_url: "https://clips.twitch.tv/embed?clip=FunnySecretiveTrayLitty",
        broadcaster_id: "138117508",
        broadcaster_name: "악어",
        creator_id: "420446931",
        creator_name: "하하핳핳핳하하핳",
        video_id: "877142711",
        game_id: "27471",
        language: "ko",
        title: '마크에이지3 : 드디어 사신수"청룡" 제작 합니다 7회차',
        view_count: 4,
        created_at: "2021-01-17T17:13:26Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/41349196750-offset-17842-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "40217538669",
    user_id: "64342766",
    user_name: "Trymacs",
    game_id: "263490",
    game_name: "Rust",
    type: "live",
    title:
      "RUST: 75 Streamer - 1 Server - 420 Hanfpflanzen! \n" +
      "Road to 2.000 Scrap die Stunde mit einer XXL Plantage! ",
    viewer_count: 33924,
    started_at: "2021-01-17T16:46:48Z",
    language: "de",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_trymacs-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "CuriousWimpyTrollShazBotstix",
        url: "https://clips.twitch.tv/CuriousWimpyTrollShazBotstix",
        embed_url:
          "https://clips.twitch.tv/embed?clip=CuriousWimpyTrollShazBotstix",
        broadcaster_id: "64342766",
        broadcaster_name: "Trymacs",
        creator_id: "424107899",
        creator_name: "guter_muffin",
        video_id: "875815666",
        game_id: "509658",
        language: "de",
        title: "chef base",
        view_count: 250,
        created_at: "2021-01-17T17:05:20Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/AT-cm%7C1010324852-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "40216540925",
    user_id: "140772558",
    user_name: "Baiano",
    game_id: "21779",
    game_name: "League of Legends",
    type: "live",
    title: "BAIANALISTA BENEFICENTE CBLOL � #SOSAM AJUDA P/ MANAUS � !betway",
    viewer_count: 32734,
    started_at: "2021-01-17T15:05:50Z",
    language: "pt",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_baiano-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "BloodyHumbleCrabsCeilingCat",
        url: "https://clips.twitch.tv/BloodyHumbleCrabsCeilingCat",
        embed_url:
          "https://clips.twitch.tv/embed?clip=BloodyHumbleCrabsCeilingCat",
        broadcaster_id: "140772558",
        broadcaster_name: "Baiano",
        creator_id: "420956226",
        creator_name: "sergincp2",
        video_id: "877275139",
        game_id: "21779",
        language: "pt-br",
        title: "grongos",
        view_count: 69,
        created_at: "2021-01-17T16:55:30Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/AT-cm%7C1010313939-preview-480x272.jpg",
      },
    ],
  },
  {
    id: "40772324204",
    user_id: "162621190",
    user_name: "anders_vejrgang",
    game_id: "518204",
    game_name: "FIFA 21",
    type: "live",
    title: "WEEKEND LEAGUE I 418-0 | ONLY ENGLISH AND DANISH IN CHAT",
    viewer_count: 32240,
    started_at: "2021-01-17T11:55:04Z",
    language: "en",
    thumbnail_url:
      "https://static-cdn.jtvnw.net/previews-ttv/live_user_anders_vejrgang-{width}x{height}.jpg",
    // tag_ids: [Array],
    clips: [
      {
        id: "SarcasticProtectiveClipsdadKlappa",
        url: "https://clips.twitch.tv/SarcasticProtectiveClipsdadKlappa",
        embed_url:
          "https://clips.twitch.tv/embed?clip=SarcasticProtectiveClipsdadKlappa",
        broadcaster_id: "162621190",
        broadcaster_name: "anders_vejrgang",
        creator_id: "24940799",
        creator_name: "Jenzu",
        video_id: "877129027",
        game_id: "518204",
        language: "da",
        title: "penalties win",
        view_count: 11,
        created_at: "2021-01-17T17:08:24Z",
        thumbnail_url:
          "https://clips-media-assets2.twitch.tv/AT-cm%7C1010328400-preview-480x272.jpg",
      },
    ],
  },
];
//   pagination: {
//     cursor: 'eyJiIjp7IkN1cnNvciI6ImV5SnpJam94TXpFd01qWXVOakl3TmpJeE5EWTFPVGtzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam96TWpJME1DNDNNREEyTnpNM01UWTRNelFzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9fQ'
//   }
