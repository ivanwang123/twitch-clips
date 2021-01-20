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
  const [clipIndex, setClipIndex] = useState<number>(0);
  const [curClip, setCurClip] = useState<any>(null);

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

  useEffect(() => {
    if (data && data.streams) {
      setCurClip(data.streams[0]);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.streams) {
      let newClipIndex: number = clipIndex;
      if (clipIndex < 0) newClipIndex = 0;
      if (clipIndex >= data.streams.length)
        newClipIndex = data.streams.length - 1;
      console.log("CLIP INDEX", newClipIndex);
      setCurClip(data.streams[newClipIndex]);
      setClipIndex(newClipIndex);
    }
  }, [data, clipIndex]);

  const nextClip = () => setClipIndex((prevIndex) => prevIndex + 1);
  const prevClip = () => setClipIndex((prevIndex) => prevIndex - 1);

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     iframeRef.current.onended = () => console.log("VIDEO ENDED");
  //     iframeRef.current.onchange = () => console.log("ON CHANGE");
  //     // iframeRef.current.on("ended", () => console.log("ON ENDED"));
  //     iframeRef.current.addEventListener("ended", () => console.log("ENDED"));
  //   }
  // }, [iframeRef.current]);

  // useEffect(() => {
  //   window.matchMedia("(orientation: portrait)").onchange = (m) => {
  //     console.log(m);
  //     if (streamInfoRef.current) {
  //       streamInfoRef.current.style.display = "none";
  //       const h = streamInfoRef.current.offsetHeight; //cause a reflow
  //       console.log(h);
  //       streamInfoRef.current.style.display = "flex";
  //     }
  //     // if (streamInfoRef.current)
  //     //   if (m.matches) {
  //     //     streamInfoRef.current.style.top = "0px";
  //     //   } else {
  //     //     streamInfoRef.current.style.top = "100%";
  //     //   }
  //   };
  // }, []);

  // if (isLoading) return <h1>Loading...</h1>;
  // if (isError) return <h1>Error: {error}</h1>;
  //

  return (
    <div className="fixed w-full h-full bg-gray-900 lg:flex lg:w-full lg:h-3/4 lg:px-5 lg:max-w-screen-xl">
      {/* {data.streams.map((stream: any) => { */}
      {/* // console.log(stream.clips[0].embed_url);  */}
      {/* return ( */}
      {/* <div className="w-full h-full flex flex-col bg-red-100"> */}
      <section className="flex w-full h-2/4 landscape:h-full lg:h-full">
        {/* <div className="w-12 h-full bg-blue-200 hidden landscape:block"></div> */}
        <iframe
          src={`${curClip?.clip.embed_url}&parent=localhost&parent=twitch-clips.vercel.app&autoplay=true&muted=false`}
          title={curClip?.clip.title}
          height="100%"
          width="100%"
          key={curClip?.clip?.id}
          // className="select-none"
          // ref={iframeRef}
        ></iframe>
        <div
          className="w-24 h-full bg-gray-900 text-gray-200 hidden landscape:flex flex-col items-center"
          {...landscapeHandles}
        >
          <button
            type="button"
            className="w-12 h-12 border-2 border-gray-200 rounded-full mt-10 box-content focus:outline-none"
            onClick={toggleStreamInfo}
          >
            <img
              className="rounded-full"
              src={curClip?.user.profile_image_url}
              alt="profile pic"
            />
          </button>
          {swipeDir}
          <button
            type="button"
            className="mt-auto mb-7 p-1 rounded focus:outline-none hover:bg-dark"
            onClick={nextClip}
          >
            <img
              className="w-8 h-8"
              src="res/chevron-right.svg"
              alt="next clip"
            />
          </button>
          <button
            type="button"
            className="mb-8 p-1 rounded focus:outline-none hover:bg-dark"
            onClick={prevClip}
          >
            <img
              className="w-8 h-8"
              src="res/chevron-left.svg"
              alt="prev clip"
            />
          </button>
        </div>
      </section>
      <section
        className="w-full h-2/4 bg-gray-900 overflow-y-auto transition-top duration-300 shadow-3xl
                  landscape:absolute landscape:top-full landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:p-3 landscape:mr-20
                  lg:w-100 lg:h-full lg:overflow-y-auto"
        ref={streamInfoRef}
      >
        <div
          className="flex flex-col w-full h-full bg-gray-900 p-3 lg:px-5"
          {...handles}
        >
          <div className="flex w-full text-lg text-white mb-3 landscape:hidden">
            <button
              type="button"
              className="group flex rounded focus:outline-none hover:bg-dark"
              onClick={prevClip}
            >
              <img
                className="w-8 h-8"
                src="res/chevron-left.svg"
                alt="prev clip"
              />
              {/* <span className="opacity-40 font-bold transition duration-300 group-hover:opacity-100"></span> */}
            </button>
            <button
              type="button"
              className="group flex ml-auto pl-2 rounded focus:outline-none hover:bg-dark"
              onClick={nextClip}
            >
              <span className="opacity-40 font-bold transition duration-300 group-hover:opacity-90">
                Next Clip
              </span>
              <img
                className="w-8 h-8"
                src="res/chevron-right.svg"
                alt="next clip"
              />
            </button>
          </div>
          <div>
            <a
              className="flex items-center w-min"
              href={`https://www.twitch.tv/${curClip?.user_name?.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-6 h-6 rounded-full lg:w-8 lg:h-8"
                src={curClip?.user.profile_image_url}
                alt="profile pic"
              />
              <h1 className="text-xl text-gray-300 font-bold ml-2 hover:underline lg:text-2xl">
                {curClip?.user_name}
              </h1>
            </a>
          </div>
          <span className="text-2xl text-gray-300 mt-3">
            {curClip?.clip.title}
          </span>
          <span className="text-gray-500 font-semibold">
            Clipped 1 hour ago · {curClip?.clip.view_count} views
          </span>
          <div className="my-auto">
            <div className="flex flex-col shadow-3xl bg-gray-900 py-4 my-3 landscape:px-2 lg:px-2">
              {curClip?.type === "live" && (
                <div className="text-gray-500 font-semibold">
                  <span className="text-gray-300 font-bold bg-red-600 px-1 mr-2 rounded">
                    Live
                  </span>
                  {curClip?.viewer_count} viewers
                </div>
              )}
              <span className="text-gray-300 font-bold my-1">
                {curClip?.title}
              </span>
              <span className="text-gray-500 font-semibold">
                Playing{" "}
                <span className="text-gray-400">{curClip?.game_name}</span>
              </span>
              {curClip?.type === "live" && (
                <button
                  type="button"
                  className="self-center text-gray-300 font-bold bg-blue-600 px-3 py-2 mt-4 min-h-2 rounded hover:bg-blue-700"
                >
                  <a
                    href={`https://www.twitch.tv/${curClip?.user_name?.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Live
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
      {/* ); */}
      {/* })} */}
    </div>
  );
}

export default App;
