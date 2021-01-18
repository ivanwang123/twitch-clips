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
      if (streamInfoRef.current.style.top === "0px") {
        streamInfoRef.current.style.top = "100%";
      } else {
        streamInfoRef.current.style.top = "0px";
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
    // window
    //   .matchMedia("(orientation: portrait)")
    //   .addEventListener("change", (m) => {
    //     console.log(m);
    //     if (streamInfoRef.current)
    //       if (m.matches) {
    //         streamInfoRef.current.style.top = "0px";
    //       } else {
    //         streamInfoRef.current.style.top = "none";
    //       }
    //   });
  }, []);

  // if (isLoading) return <h1>Loading...</h1>;
  // if (isError) return <h1>Error: {error}</h1>;

  return (
    <div className="fixed w-full h-full bg-gray-900 lg:flex lg:w-full lg:h-3/4 lg:px-5 lg:max-w-screen-xl">
      {/* {data.streams.map((stream: any) => { */}
      {/* // console.log(stream.clips[0].embed_url);  */}
      {/* return ( */}
      {/* <div className="w-full h-full flex flex-col bg-red-100"> */}
      <section className="flex w-full h-2/4 landscape:h-full lg:h-full">
        {/* <div className="w-12 h-full bg-blue-200 hidden landscape:block"></div> */}
        <iframe
          src="https://clips.twitch.tv/embed?clip=SpineySteamyTubersPeanutButterJellyTime&parent=localhost&parent=twitch-clips.vercel.app&autoplay=true"
          title="ACE DA LOUD HJ"
          height="100%"
          width="100%"
          key="SpineySteamyTubersPeanutButterJellyTime"
          className="select-none"
          // ref={iframeRef}
        ></iframe>
        <div
          className="w-24 h-full bg-gray-900 text-gray-200 hidden landscape:flex flex-col items-center"
          {...landscapeHandles}
        >
          <button type="button" className="mt-10" onClick={toggleStreamInfo}>
            <img
              className="w-14 h-14 rounded-full"
              src="https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgamesbrazil-64x64.jpg"
              alt="profile pic"
            />
          </button>
          {swipeDir}
          <button type="button" className="mt-auto mb-10">
            --&gt;
          </button>
        </div>
      </section>
      <section
        className="w-full h-2/4 flex flex-col bg-gray-900 p-3 transition-top duration-300 overflow-y-auto
                   landscape:absolute landscape:top-full landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:p-6 landscape:mr-24
                   lg:w-auto lg:h-full"
        {...handles}
        ref={streamInfoRef}
      >
        <div className="flex w-full font-bold text-lg text-white mb-4">
          <button type="button" className="group flex">
            <img
              className="w-8 h-8"
              src="res/chevron-left.svg"
              alt="prev clip"
            />
            <span className="opacity-40 transition duration-300 group-hover:opacity-100">
              prev
            </span>
          </button>
          <button type="button" className="group flex ml-auto">
            <span className="opacity-40 transition duration-300 group-hover:opacity-100">
              next
            </span>
            <img
              className="w-8 h-8"
              src="res/chevron-right.svg"
              alt="next clip"
            />
          </button>
        </div>
        <div className="flex items-center">
          <img
            className="w-6 h-6 rounded-full lg:w-8 lg:h-8"
            src="https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgamesbrazil-64x64.jpg"
            alt="profile pic"
          />
          <h1 className="text-xl text-gray-200 font-bold ml-2 lg:text-2xl">
            RiotGamesBrazil
          </h1>
        </div>
        <span className="text-2xl text-gray-200 mt-3">ACE DA LOUD HJ</span>
        <span className="text-gray-500 font-semibold">
          Clipped 1 hour ago · 2 views
        </span>
        <div className="flex flex-col shadow-3xl bg-gray-900 py-4 my-auto landscape:px-2 lg:px-2">
          <div className="text-gray-500 font-semibold">
            <span className="text-gray-200 font-bold bg-red-600 px-1 mr-2 rounded">
              Live
            </span>
            131,026 viewers
          </div>
          <span className="text-gray-200 font-bold my-1">
            CBLOL 2021: 1ª Etapa - Fase de Pontos - Md1 | Semana 1 - Rodada 2
          </span>
          <span className="text-gray-500 font-semibold">
            Playing <span className="text-gray-400">League of Legends</span>
          </span>
          <button
            type="button"
            className="self-center text-gray-200 font-bold bg-blue-600 px-3 py-2 mt-4 min-h-2 rounded"
          >
            Watch Live
          </button>
        </div>
      </section>
      {/* </div> */}
      {/* ); */}
      {/* })} */}
    </div>
  );
}

export default App;
