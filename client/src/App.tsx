import { useEffect, useRef } from "react";
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
  const { isLoading, isError, data, error } = useQuery("streams", fetchStreams);
  console.log("STREAMS DATA", data);

  const handles = useSwipeable({
    onSwiped: (e) => console.log("SWIPED", e),
  });

  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onended = () => console.log("VIDEO ENDED");
      iframeRef.current.onchange = () => console.log("ON CHANGE");
      // iframeRef.current.on("ended", () => console.log("ON ENDED"));
      iframeRef.current.addEventListener("ended", () => console.log("ENDED"));
    }
  }, [iframeRef.current]);

  // useEffect(() => {
  //   ref(document);
  // }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error}</h1>;

  return (
    <div className="App w-full h-full bg-red-100">
      {/* {data.streams.map((stream: any) => { */}
      {/* // console.log(stream.clips[0].embed_url);  */}
      {/* return ( */}
      <div className="w-full h-full flex flex-col bg-red-100">
        <iframe
          src={data.streams[0].clips[0].embed_url + "&parent=localhost"}
          title={data.streams[0].clips[0].title}
          height="90%"
          width="100%"
          key={data.streams[0].clips[0].id}
          // ref={iframeRef}
        ></iframe>
        <div
          className="w-full flex-grow z-10 bg-gray-500 pointer-events-auto"
          {...handles}
        >
          Swipe
        </div>
      </div>
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
