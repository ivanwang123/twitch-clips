import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
// import { useSwipeable } from "react-swipeable";
import { ClipType } from "./types/clipType";
import { formatNumber } from "./utils/numberFormatter";
import { formatTimestamp } from "./utils/timeFormatter";

async function fetchStreams() {
  const data = await fetch("http://localhost:5000/test/db-streams", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("STREAMS DATA", data);
  return await data.json();
}

function App() {
  const { data } = useQuery("streams", fetchStreams);
  // const [swipeDir, setSwipeDir] = useState<string>("");
  const [clipIndex, setClipIndex] = useState<number>(0);
  const [curClip, setCurClip] = useState<ClipType | null>(null);

  // const handles = useSwipeable({
  //   onSwiped: (e) => console.log("SWIPED", e),
  // });

  // const landscapeHandles = useSwipeable({
  //   onSwiped: (e) => {
  //     setSwipeDir(e.dir);
  //     console.log(streamInfoRef.current);
  //   },
  //   onTap: () => setSwipeDir("tapped"),
  // });

  const streamInfoRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  // const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleLandscapePage = (page: HTMLElement | null) => {
    if (page) {
      let top = page.style.top;
      console.log(page, top);
      if (streamInfoRef.current) streamInfoRef.current.style.top = "100%";
      if (navRef.current) navRef.current.style.top = "100%";

      if (top === "0px") {
        page.style.top = "100%";
      } else {
        page.style.top = "0px";
      }
    }
  };

  useEffect(() => {
    if (data && data.clips) {
      setCurClip(data.clips[0]);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.clips) {
      let newClipIndex: number = clipIndex;
      if (clipIndex < 0) newClipIndex = 0;
      if (clipIndex >= data.clips.length) newClipIndex = data.clips.length - 1;
      console.log("CLIP INDEX", newClipIndex);
      setCurClip(data.clips[newClipIndex]);
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

  // useEffect(() => {
  //   const focusTimeout = setTimeout(() => {
  //     console.log("FOCUS");
  //     iframeRef.current?.click();
  //   }, 4000);

  //   return () => clearTimeout(focusTimeout);
  // }, [curClip?.clip_embed_url]);

  return (
    <div className="fixed w-full h-full grid grid-rows-vert justify-items-center landscape:grid-rows-1">
      <nav
        className="row-span-1 w-full h-full flex text-gray-500 px-3 transition-top duration-300
                  landscape:absolute landscape:top-full landscape:left-0 landscape:right-0
                  landscape:w-auto landscape:h-full landscape:block landscape:p-6 landscape:mr-20
                  lg:px-24"
        ref={navRef}
      >
        <button
          type="button"
          className="icon-btn hidden px-1 mb-5 ml-auto landscape:block"
          onClick={() => toggleLandscapePage(navRef.current)}
        >
          <img className="w-6 h-6" src="res/close.svg" alt="close" />
        </button>
        <section className="w-full flex items-center">
          {/* <h1 className="hidden text-gray-300 text-xl font-bold lg:block">
            0k Andy
          </h1> */}
          <label
            className="flex items-center z-10 pointer-events-none lg:ml-auto"
            htmlFor="select-category"
          >
            <img className="w-6 h-6" src="res/gamepad.svg" alt="category" />
            <img
              className="w-4 h-4 ml-2"
              src="res/chevron-down.svg"
              alt="open menu"
            />
          </label>
          <select
            className="bg-transparent text-sm font-semibold pr-2 pl-14 -ml-13 cursor-pointer focus:outline-none
                      lg:border-r lg:border-gray-500"
            id="select-category"
          >
            <option defaultChecked>All</option>
            <option>Just Chatting</option>
            <option>LoL</option>
          </select>
          <select
            className="select-right-align bg-transparent text-sm font-semibold pl-2 pr-14 -mr-13 ml-auto cursor-pointer focus:outline-none
                      lg:ml-0 lg:pl-8"
            id="select-lang"
          >
            <option defaultChecked>Any</option>
            <option>English</option>
            <option>Spanish</option>
          </select>
          <label
            className="flex items-center z-10 pointer-events-none"
            htmlFor="select-lang"
          >
            <img
              className="w-4 h-4 mr-2"
              src="res/chevron-down.svg"
              alt="open menu"
            />
            <img className="w-6 h-6" src="res/globe.svg" alt="language" />
          </label>
        </section>
      </nav>
      <main className="row-span-1 w-full h-full lg:flex lg:h-5/6 lg:px-24 lg:max-w-screen-xl lg:mt-5">
        <section className="flex w-full h-2/4 landscape:h-full lg:h-full">
          <iframe
            src={`${curClip?.clip_embed_url}&parent=localhost&parent=twitch-clips.vercel.app&autoplay=true`}
            title={curClip?.clip_title}
            height="100%"
            width="100%"
            key={curClip?.clip_id}
            allow="autoplay"
            className="lg:rounded-l"
            // className="select-none"
            // ref={iframeRef}
          ></iframe>
          <div
            className="w-24 h-full bg-gray-900 text-gray-200 hidden landscape:flex flex-col items-center"
            // {...landscapeHandles}
          >
            <button
              type="button"
              className="w-12 h-12 border-2 border-gray-200 rounded-full mt-8 box-content focus:outline-none"
              onClick={() => toggleLandscapePage(streamInfoRef.current)}
            >
              <img
                className="rounded-full"
                src={curClip?.profile_image_url}
                alt="profile pic"
              />
            </button>
            <button
              type="button"
              className="icon-btn mt-4 p-1"
              onClick={() => toggleLandscapePage(navRef.current)}
            >
              <img className="w-8 h-8" src="res/settings.svg" alt="settings" />
            </button>
            {/* {swipeDir} */}
            <button
              type="button"
              className="icon-btn mt-auto mb-6 p-1"
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
              className="icon-btn mb-6 p-1"
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
          className="w-full h-2/4 bg-gray-900 overflow-y-auto transition-top duration-300
                    landscape:absolute landscape:top-full landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:p-3 landscape:mr-20
                    lg:w-100 lg:h-full lg:overflow-y-auto lg:rounded-r"
          ref={streamInfoRef}
        >
          <div className="flex flex-col w-full h-full bg-gray-900 p-3 lg:px-5">
            <div className="flex w-full text-lg text-white mb-3 landscape:hidden">
              <button
                type="button"
                className="icon-btn group flex"
                onClick={prevClip}
              >
                <img
                  className="w-6 h-6"
                  src="res/chevron-left.svg"
                  alt="prev clip"
                />
              </button>
              <button
                type="button"
                className="icon-btn flex items-center group ml-auto pl-2"
                onClick={nextClip}
              >
                <span className="opacity-40 text-sm font-semibold transition duration-300 group-hover:opacity-80">
                  Next Clip
                </span>
                <img
                  className="w-6 h-6"
                  src="res/chevron-right.svg"
                  alt="next clip"
                />
              </button>
            </div>
            <div className="flex lg:mt-1">
              <a
                className="flex items-center w-min"
                href={`https://www.twitch.tv/${curClip?.login}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-6 h-6 rounded-full lg:w-7 lg:h-7"
                  src={curClip?.profile_image_url}
                  alt="profile pic"
                />
                <h1 className="text-lg text-gray-300 font-semibold ml-2 hover:underline">
                  {curClip?.user_name}
                </h1>
              </a>
              <button
                type="button"
                className="icon-btn hidden ml-auto px-1 landscape:block"
                onClick={() => toggleLandscapePage(streamInfoRef.current)}
              >
                <img className="w-6 h-6" src="res/close.svg" alt="close" />
              </button>
            </div>
            <span className="text-2xl text-gray-300 mt-3">
              {curClip?.clip_title}
            </span>
            <span className="text-gray-500 text-sm font-semibold mt-1">
              Clipped {formatTimestamp(curClip?.clip_created_at)} ·{" "}
              {formatNumber(curClip?.clip_view_count)} view
              {curClip?.clip_view_count === 1 ? "" : "s"}
            </span>
            <div className="my-auto">
              <div className="flex flex-col shadow-3xl bg-gray-900 py-4 my-3 landscape:px-2 lg:px-2">
                {curClip?.stream_type === "live" && (
                  <div className="text-gray-500 text-sm font-semibold">
                    <span className="text-gray-100 bg-red-600 px-2 mr-2 rounded">
                      LIVE
                    </span>
                    {formatNumber(curClip?.stream_viewer_count)} viewer
                    {curClip?.stream_viewer_count === 1 ? "" : "s"}
                  </div>
                )}
                <span className="text-gray-300 font-semibold my-1">
                  <a
                    className="hover:underline"
                    href={`https://www.twitch.tv/${curClip?.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {curClip?.stream_title}
                  </a>
                </span>
                <span className="text-gray-500 text-sm font-semibold">
                  Playing{" "}
                  <span className="text-gray-400">{curClip?.game_name}</span>
                </span>
                {curClip?.stream_type === "live" && (
                  <button
                    type="button"
                    className="self-center text-gray-300 font-bold bg-blue-600 px-3 py-2 mt-4 min-h-2 rounded hover:bg-blue-700"
                  >
                    <a
                      href={`https://www.twitch.tv/${curClip?.login}`}
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
      </main>
    </div>
  );
}

export default App;
