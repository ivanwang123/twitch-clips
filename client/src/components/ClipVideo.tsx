import { RefObject, useEffect, useRef } from "react";
import { ClipType } from "src/types/clipType";

interface PropTypes {
  curClip: ClipType | null;
  nextClip: () => void;
  prevClip: () => void;
  toggleLandscapePage: (page: HTMLElement | null) => void;
  streamInfoRef: RefObject<HTMLElement>;
  navRef: RefObject<HTMLElement>;
}

function ClipVideo(props: PropTypes) {
  const {
    curClip,
    nextClip,
    prevClip,
    toggleLandscapePage,
    streamInfoRef,
    navRef,
  } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef && iframeRef.current) {
      iframeRef.current.addEventListener("play", (e: any) => {
        console.log("PROGRESS", e);
      });
    }
  }, [iframeRef]);

  return (
    <>
      <iframe
        src={`${curClip?.clip_embed_url}&parent=localhost&parent=twitch-clips.vercel.app&autoplay=true`}
        title={curClip?.clip_title}
        height="100%"
        width="100%"
        className="lg:rounded-l"
        allow="autoplay"
        allowFullScreen={true}
        key={curClip?.clip_id}
        ref={iframeRef}
      ></iframe>
      <div className="hidden w-24 h-full bg-gray-900 text-gray-200 landscape:flex flex-col items-center">
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
          <img className="w-8 h-8" src="res/adjustments.svg" alt="settings" />
        </button>
        <button
          type="button"
          className="icon-btn mt-auto mb-6 p-1"
          onClick={() => {
            toggleLandscapePage(null);
            nextClip();
          }}
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
          onClick={() => {
            toggleLandscapePage(null);
            prevClip();
          }}
        >
          <img className="w-8 h-8" src="res/chevron-left.svg" alt="prev clip" />
        </button>
      </div>
    </>
  );
}

export default ClipVideo;
