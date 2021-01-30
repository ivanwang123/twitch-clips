import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useHotkeys } from "react-hotkeys-hook";
import { ClipType } from "../types/clipType";
import ClipInfo from "../components/ClipInfo";
import ClipVideo from "../components/ClipVideo";
import NavBar from "../components/NavBar";
import ClipStatus from "../components/ClipStatus";

async function fetchClips(queryArgs: any) {
  const params = {
    ...queryArgs.queryKey[1],
    cursor: queryArgs.pageParam || "",
  };

  try {
    const data = await fetch(
      "https://twitch-streamer-clips.herokuapp.com/clip/get-clips?" +
        new URLSearchParams(params),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await data.json();
  } catch (e) {
    throw new Error("Unable to retrieve clips");
  }
}

function ClipPage() {
  const [game, setGame] = useState<string>("0"); // default all games
  const [language, setLanguage] = useState<string>("en"); // default english

  const {
    data,
    hasNextPage,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    ["clips", { game: game, language: language }],
    fetchClips,
    {
      retry: 1,
      getNextPageParam: (lastPage, _) => {
        if (lastPage.clips.length) {
          return lastPage.clips[lastPage.clips.length - 1].created_at;
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

  useHotkeys("j", () => prevClip());
  useHotkeys("l", () => nextClip());

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
    setClipIndex(0);
    refetch();
  };

  const setGameSelection = (e: any) => {
    setGame(e.target.value);
    setClipIndex(0);
    toggleLandscapePage(null);
  };

  const setLanguageSelection = (e: any) => {
    setLanguage(e.target.value);
    setClipIndex(0);
    toggleLandscapePage(null);
  };

  // Moving through clips
  useEffect(() => {
    if (data) {
      let newClipIndex = clipIndex;

      if (clipIndex < 0) newClipIndex = 0;

      let countIndex = 0;
      let foundClip = false;

      // Loop through all pages
      for (let p = 0; p < data.pages.length; p++) {
        // Find the page where the clip is in
        if (countIndex + data.pages[p].clips.length - 1 >= newClipIndex) {
          foundClip = true;
          setCurClip(data.pages[p].clips[newClipIndex - countIndex]);
          setClipStatus("clip");
          break;
        } else {
          countIndex += data.pages[p].clips.length;
        }
      }

      // If clip not found, then fetch more or reached end of clips
      if (!foundClip) {
        newClipIndex = countIndex;
        if (hasNextPage) {
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
  }, [data, clipIndex, hasNextPage, fetchNextPage]);

  const nextClip = () => setClipIndex((prevIndex) => prevIndex + 1);
  const prevClip = () => setClipIndex((prevIndex) => prevIndex - 1);

  return (
    <div className="fixed w-full h-full grid grid-rows-vert justify-items-center landscape:grid-rows-1">
      {/* NAVBAR */}
      <nav
        className="row-span-1 bg-gray-900 w-full h-full flex text-gray-500 px-3 z-10 transition-top duration-300
                  landscape:fixed landscape:top-full landscape:left-0 landscape:right-0
                  landscape:w-auto landscape:h-full landscape:block landscape:p-6 landscape:mr-20
                  lg:px-24 lg:max-w-screen-xl lg:bg-light"
        ref={navRef}
      >
        <NavBar
          setGameSelection={setGameSelection}
          setLanguageSelection={setLanguageSelection}
          toggleLandscapePage={toggleLandscapePage}
          refreshClips={refreshClips}
          navRef={navRef}
        />
      </nav>
      <main className="row-span-1 w-full h-full overflow-y-auto lg:max-w-screen-xl lg:max-h-screen-xl lg:h-full lg:flex lg:px-24 lg:pt-1 lg:pb-7">
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
            <ClipStatus
              clipStatus={clipStatus}
              isFetching={isFetching}
              prevClip={prevClip}
              refreshClips={refreshClips}
              toggleLandscapePage={toggleLandscapePage}
              navRef={navRef}
            />
          )}
        </section>

        {/* CLIP INFO SECTION */}
        <section
          className="w-full h-2/4 bg-gray-900 overflow-y-auto z-10 transition-top duration-300
                    landscape:fixed landscape:top-full landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:p-3 landscape:mr-20
                    lg:w-100 lg:h-full lg:rounded-r"
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
                        Back <span className="hidden lg:inline-block">(J)</span>
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
