import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useSwipeable } from "react-swipeable";

async function fetchStreams() {
  const data = await fetch("http://localhost:5000/test/streams", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await data.json();
}

function App() {
  const { data } = useQuery("streams", fetchStreams);
  console.log("STREAMS DATA", data);
  const [swipeDir, setSwipeDir] = useState<string>("");

  const handles = useSwipeable({
    onSwiped: (e) => console.log("SWIPED", e),
  });

  const landscapeHandles = useSwipeable({
    onSwiped: (e) => {
      setSwipeDir(e.dir);
      console.log(streamInfoRef.current);
    },
    onTap: () => setSwipeDir("tapped"),
  });

  const streamInfoRef = useRef<HTMLElement>(null);

  const toggleStreamInfo = () => {
    if (streamInfoRef.current)
      if (streamInfoRef.current.style.display === "flex") {
        streamInfoRef.current.style.display = "none";
      } else {
        streamInfoRef.current.style.display = "flex";
      }
  };
  // const iframeRef = useRef<HTMLIFrameElement>();

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     iframeRef.current.onended = () => console.log("VIDEO ENDED");
  //     iframeRef.current.onchange = () => console.log("ON CHANGE");
  //     // iframeRef.current.on("ended", () => console.log("ON ENDED"));
  //     iframeRef.current.addEventListener("ended", () => console.log("ENDED"));
  //   }
  // }, [iframeRef.current]);

  useEffect(() => {
    window
      .matchMedia("(orientation: portrait)")
      .addEventListener("change", (m) => {
        console.log(m);
        if (m.matches) {
          // portrait
          if (streamInfoRef.current) {
            streamInfoRef.current.style.display = "flex";
          }
        } else {
          // landscape
          if (streamInfoRef.current) {
            streamInfoRef.current.style.display = "none";
          }
        }
      });
  }, []);

  // if (isLoading) return <h1>Loading...</h1>;
  // if (isError) return <h1>Error: {error}</h1>;

  return (
    <div className="fixed w-full h-full bg-red-100">
      {/* {data.streams.map((stream: any) => { */}
      {/* // console.log(stream.clips[0].embed_url);  */}
      {/* return ( */}
      {/* <div className="w-full h-full flex flex-col bg-red-100"> */}
      <section className="flex w-full h-2/4 landscape:h-full">
        {/* <div className="w-12 h-full bg-blue-200 hidden landscape:block"></div> */}
        <iframe
          src="https://clips.twitch.tv/embed?clip=SpineySteamyTubersPeanutButterJellyTime&parent=localhost&parent=twitch-clips.vercel.app"
          title="ACE DA LOUD HJ"
          height="100%"
          width="100%"
          key="SpineySteamyTubersPeanutButterJellyTime"
          // ref={iframeRef}
        ></iframe>
        <div
          className="w-24 h-full bg-blue-200 hidden landscape:flex landscape:flex-col"
          {...landscapeHandles}
        >
          {swipeDir}
          <button
            type="button"
            className="mt-auto mb-5"
            onClick={toggleStreamInfo}
          >
            Info
          </button>
        </div>
      </section>
      <section
        className="w-full h-2/4 flex flex-col bg-gray-900 p-3 landscape:absolute landscape:top-0 landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:mr-24"
        {...handles}
        ref={streamInfoRef}
      >
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src="https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgamesbrazil-64x64.jpg"
            alt="profile pic"
          />
          <h1 className="text-3xl text-gray-200 font-bold ml-2">
            RiotGamesBrazil
          </h1>
        </div>
        <div className="text-gray-500 font-semibold mt-4">
          <span className="text-gray-200 font-bold bg-red-600 px-1 mr-2 rounded">
            Live
          </span>
          131026 viewers
        </div>
        <span className="block text-gray-500 font-semibold">
          Playing <span className="text-gray-400">League of Legends</span>
        </span>
        <span className="block text-gray-200 font-semibold mb-3 mt-1">
          CBLOL 2021: 1ª Etapa - Fase de Pontos - Md1 | Semana 1 - Rodada 2
        </span>
        <button
          type="button"
          className="self-center text-gray-200 font-bold bg-blue-600 px-3 py-2 my-auto rounded"
        >
          Watch Now
        </button>
      </section>
      {/* </div> */}
      {/* ); */}
      {/* })} */}
      {/* <iframe
        src="https://clips.twitch.tv/embed?clip=UgliestFrigidMelonAliens&parent=localhost"
        scrolling="no"
        height="378"
        width="620"
      ></iframe>
      <iframe
        src="https://clips.twitch.tv/embed?clip=UgliestFrigidMelonAliens&parent=localhost"
        allowFullScreen
        scrolling="no"
        height="327"
        width="620"
      ></iframe> */}
    </div>
  );
}

export default App;
