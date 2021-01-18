// import { useEffect, useRef } from "react";
// import { useQuery } from "react-query";
import { useSwipeable } from "react-swipeable";

// async function fetchStreams() {
//   const data = await fetch("http://localhost:5000/test/streams", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return await data.json();
// }

function App() {
  // const { data } = useQuery("streams", fetchStreams);
  // console.log("STREAMS DATA", data);

  const handles = useSwipeable({
    onSwiped: (e) => console.log("SWIPED", e),
  });

  // const iframeRef = useRef<HTMLIFrameElement>();

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     iframeRef.current.onended = () => console.log("VIDEO ENDED");
  //     iframeRef.current.onchange = () => console.log("ON CHANGE");
  //     // iframeRef.current.on("ended", () => console.log("ON ENDED"));
  //     iframeRef.current.addEventListener("ended", () => console.log("ENDED"));
  //   }
  // }, [iframeRef.current]);

  // useEffect(() => {
  //   ref(document);
  // }, []);

  // if (isLoading) return <h1>Loading...</h1>;
  // if (isError) return <h1>Error: {error}</h1>;

  return (
    <div className="flex flex-col w-full h-full bg-red-100">
      {/* {data.streams.map((stream: any) => { */}
      {/* // console.log(stream.clips[0].embed_url);  */}
      {/* return ( */}
      {/* <div className="w-full h-full flex flex-col bg-red-100"> */}
      <iframe
        src="https://clips.twitch.tv/embed?clip=SpineySteamyTubersPeanutButterJellyTime&parent=localhost&parent=twitch-clips.vercel.app"
        title="ACE DA LOUD HJ"
        height="50%"
        width="100%"
        key="SpineySteamyTubersPeanutButterJellyTime"
        // ref={iframeRef}
      ></iframe>
      <section
        className="w-full flex flex-col flex-grow p-3 bg-gray-900"
        {...handles}
      >
        <h1 className="text-3xl text-gray-200 font-bold">RiotGamesBrazil</h1>
        <div className="text-gray-500 font-semibold mt-4">
          <span className="text-gray-200 font-bold bg-red-600 px-1 mr-2 rounded">
            Live
          </span>
          131026 viewers
        </div>
        <span className="block text-gray-500 font-semibold">
          Playing <span className="text-gray-400">League of Legends</span>
        </span>
        <span className="block text-gray-200 font-semibold mt-1">
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
