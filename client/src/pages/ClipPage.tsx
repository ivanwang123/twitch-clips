import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { ClipType } from "../types/clipType";
import ClipInfo from "../components/ClipInfo";
import ClipVideo from "../components/ClipVideo";
import NavBar from "../components/NavBar";

async function fetchStreams() {
  const data = await fetch("http://localhost:5000/test/db-streams", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("STREAMS DATA", data);
  return await data.json();
}

function ClipPage() {
  const { data } = useQuery("streams", fetchStreams);
  // const [swipeDir, setSwipeDir] = useState<string>("");
  const [clipIndex, setClipIndex] = useState<number>(0);
  const [curClip, setCurClip] = useState<ClipType | null>(null);

  // const [category, setCategory] = useState<string>("all");
  // const [language, setLanguage] = useState<string>("any");

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
        className="row-span-1 bg-gray-900 w-full h-full flex text-gray-500 px-3 transition-top duration-300
                  landscape:absolute landscape:top-full landscape:left-0 landscape:right-0
                  landscape:w-auto landscape:h-full landscape:block landscape:p-6 landscape:mr-20
                  lg:px-24 lg:max-w-screen-xl lg:bg-light"
        ref={navRef}
      >
        <NavBar toggleLandscapePage={toggleLandscapePage} navRef={navRef} />
      </nav>
      <main className="row-span-1 w-full h-full lg:flex lg:h-5/6 lg:px-24 lg:max-w-screen-xl lg:mt-5">
        <section className="flex w-full h-2/4 landscape:h-full lg:h-full">
          <ClipVideo
            curClip={curClip}
            nextClip={nextClip}
            prevClip={prevClip}
            toggleLandscapePage={toggleLandscapePage}
            streamInfoRef={streamInfoRef}
            navRef={navRef}
          />
        </section>
        <section
          className="w-full h-2/4 bg-gray-900 overflow-y-auto transition-top duration-300
                    landscape:absolute landscape:top-full landscape:left-0 landscape:right-0 landscape:w-auto landscape:h-full landscape:p-3 landscape:mr-20
                    lg:w-100 lg:h-full lg:overflow-y-auto lg:rounded-r"
          ref={streamInfoRef}
        >
          <ClipInfo
            curClip={curClip}
            nextClip={nextClip}
            prevClip={prevClip}
            toggleLandscapePage={toggleLandscapePage}
            streamInfoRef={streamInfoRef}
          />
        </section>
      </main>
    </div>
  );
}

export default ClipPage;
