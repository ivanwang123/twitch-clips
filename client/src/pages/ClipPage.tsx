import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { ClipType } from "../types/clipType";
import ClipInfo from "../components/ClipInfo";
import ClipVideo from "../components/ClipVideo";
import NavBar from "../components/NavBar";

async function fetchClips(queryArgs: any) {
  const params = {
    ...queryArgs.queryKey[1],
    cursor: queryArgs.pageParam || "",
  };
  console.log("PARAMS", params);
  const data = await fetch(
    "http://localhost:5000/test/db-streams?" + new URLSearchParams(params),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("STREAMS DATA", data);
  return await data.json();
}

function ClipPage() {
  const [game, setGame] = useState<string>("0"); // default all games
  const [language, setLanguage] = useState<string>("en"); // default english

  const {
    data,
    hasNextPage,
    // isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    ["clips", { game: game, language: language }],
    fetchClips,
    {
      retry: 1,
      getNextPageParam: (lastPage, _) => {
        // console.log("LAST PAGE", lastPage, page);
        if (lastPage.clips.length) {
          return lastPage.clips[lastPage.clips.length - 1].clip_created_at;
        } else {
          return false;
        }
      },
    }
  );
  const [clipIndex, setClipIndex] = useState<number>(0);
  const [curClip, setCurClip] = useState<ClipType | null>(null);
  const [clipStatus, setClipStatus] = useState<"clip" | "none" | "end">("none");

  const streamInfoRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const toggleLandscapePage = (page: HTMLElement | null) => {
    if (page) {
      let top = page.style.top;
      if (streamInfoRef.current) streamInfoRef.current.style.top = "100%";
      if (navRef.current) navRef.current.style.top = "100%";

      if (top === "0px") {
        page.style.top = "100%";
      } else {
        page.style.top = "0px";
      }
    } else {
      if (streamInfoRef.current) streamInfoRef.current.style.top = "100%";
      if (navRef.current) navRef.current.style.top = "100%";
    }
  };

  const refreshClips = () => {
    console.log("REFRESH");
    setClipIndex(0);
    setClipStatus("clip");
    refetch();
  };

  useEffect(() => {
    console.log("DATA", data, hasNextPage);
    if (data && data.pages.length && data.pages[0].clips.length) {
      setCurClip(data.pages[0].clips[0]);
      setClipStatus("clip");
    } else {
      setClipStatus("none");
    }
  }, [data, hasNextPage]);

  // Moving through clips
  useEffect(() => {
    if (data) {
      let newClipIndex = clipIndex;

      if (clipIndex < 0) newClipIndex = 0;

      let countIndex = 0;
      let foundClip = false;

      console.log("PAGES", data.pages);
      // Loop through all pages
      for (let p = 0; p < data.pages.length; p++) {
        console.log("FIND CLIP", p, countIndex, newClipIndex);
        // Find the page where the clip is in
        if (countIndex + data.pages[p].clips.length - 1 >= newClipIndex) {
          foundClip = true;
          setCurClip(data.pages[p].clips[newClipIndex - countIndex]);
          break;
        } else {
          countIndex += data.pages[p].clips.length;
        }
      }

      // If clip not found, then fetch more or reached end of clips
      if (!foundClip) {
        newClipIndex = countIndex;
        if (hasNextPage) {
          console.log("FETCH NEXT PAGE");
          fetchNextPage();
        } else {
          setCurClip(null);
          if (clipIndex > 0) {
            setClipStatus("end");
          } else {
            setClipStatus("none");
          }
        }
      }
      setClipIndex(newClipIndex);
    }
  }, [data, clipIndex, hasNextPage]);

  const nextClip = () => setClipIndex((prevIndex) => prevIndex + 1);
  const prevClip = () => setClipIndex((prevIndex) => prevIndex - 1);

  return (
    <div className="fixed w-full h-full grid grid-rows-vert justify-items-center landscape:grid-rows-1">
      {/* NAVBAR */}
      <nav
        className="row-span-1 bg-gray-900 w-full h-full flex text-gray-500 px-3 z-10 transition-top duration-300
                  landscape:absolute landscape:top-full landscape:left-0 landscape:right-0
                  landscape:w-auto landscape:h-full landscape:block landscape:p-6 landscape:mr-20
                  lg:px-24 lg:max-w-screen-xl lg:bg-light"
        ref={navRef}
      >
        <NavBar
          game={game}
          language={language}
          setGame={setGame}
          setLanguage={setLanguage}
          toggleLandscapePage={toggleLandscapePage}
          refreshClips={refreshClips}
          navRef={navRef}
        />
      </nav>
      <main className="row-span-1 w-full h-full lg:flex lg:h-5/6 lg:px-24 lg:max-w-screen-xl lg:mt-5">
        {/* CLIP VIDEO SECTION */}
        <section className="flex w-full h-2/4 bg-black landscape:h-full lg:h-full">
          {clipStatus === "clip" ? (
            <ClipVideo
              curClip={curClip}
              nextClip={nextClip}
              prevClip={prevClip}
              toggleLandscapePage={toggleLandscapePage}
              streamInfoRef={streamInfoRef}
              navRef={navRef}
            />
          ) : (
            <>
              <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-6xl text-gray-300 font-bold text-center">
                  {clipStatus === "end" ? (
                    <>
                      You've<br></br>Reached<br></br>
                      <span className="font-normal">the</span> End
                    </>
                  ) : (
                    "No Clips :("
                  )}
                </h1>
                <span className="flex items-center text-gray-500 mt-5">
                  <button
                    type="button"
                    className="icon-btn p-1 mr-2"
                    onClick={refreshClips}
                  >
                    <img
                      className="w-6 h-6 transform transition duration-300 hover:rotate-90"
                      src="res/refresh.svg"
                      alt="refresh"
                    />
                  </button>
                  {clipStatus === "end"
                    ? "Refresh to get the newest clips"
                    : "Refresh, or choose a different game/language"}
                </span>
              </div>
              <div className="hidden w-24 h-full bg-gray-900 text-gray-200 pt-1 landscape:flex flex-col items-center">
                <button
                  type="button"
                  className="icon-btn mt-24 p-1"
                  onClick={() => toggleLandscapePage(navRef.current)}
                >
                  <img
                    className="w-8 h-8"
                    src="res/adjustments.svg"
                    alt="settings"
                  />
                </button>
                {clipStatus === "end" && (
                  <button
                    type="button"
                    className="icon-btn mt-auto mb-6 p-1"
                    onClick={prevClip}
                  >
                    <img
                      className="w-8 h-8"
                      src="res/chevron-left.svg"
                      alt="prev clip"
                    />
                  </button>
                )}
              </div>
            </>
          )}
        </section>

        {/* CLIP INFO SECTION */}
        <section
          className="w-full h-2/4 bg-gray-900 overflow-y-auto z-10 transition-top duration-300
                    landscape:absolute landscape:top-full landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:p-3 landscape:mr-20
                    lg:w-100 lg:h-full lg:overflow-y-auto lg:rounded-r"
          ref={streamInfoRef}
        >
          {clipStatus === "clip" ? (
            <ClipInfo
              curClip={curClip}
              nextClip={nextClip}
              prevClip={prevClip}
              clipIndex={clipIndex}
              toggleLandscapePage={toggleLandscapePage}
              streamInfoRef={streamInfoRef}
            />
          ) : (
            <>
              {clipStatus === "end" && (
                <div className="w-full h-full bg-gray-900 p-3 lg:px-5">
                  <div className="flex w-full text-lg landscape:hidden">
                    <button
                      type="button"
                      className="icon-btn flex items-center group pr-2"
                      onClick={prevClip}
                    >
                      <img
                        className="w-6 h-6"
                        src="res/chevron-left.svg"
                        alt="prev clip"
                      />
                      <span className="text-gray-500 text-sm font-semibold transition duration-300 group-hover:text-gray-300">
                        Back
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default ClipPage;

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
