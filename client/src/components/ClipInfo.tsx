import { RefObject } from "react";
import { ClipType } from "src/types/clipType";
import { formatNumber } from "../utils/numberFormatter";
import { formatTimestamp } from "../utils/timeFormatter";

interface PropTypes {
  curClip: ClipType | null;
  nextClip: () => void;
  prevClip: () => void;
  clipIndex: number;
  toggleLandscapePage: (page: HTMLElement | null) => void;
  streamInfoRef: RefObject<HTMLElement>;
}

function ClipInfo(props: PropTypes) {
  const {
    curClip,
    nextClip,
    prevClip,
    clipIndex,
    toggleLandscapePage,
    streamInfoRef,
  } = props;

  return (
    <div className="flex flex-col w-full min-h-full bg-gray-900 p-3 lg:px-5">
      <div className="w-full flex text-lg mb-3 landscape:hidden">
        {clipIndex !== 0 && (
          <button
            type="button"
            className="icon-btn flex items-center group pr-2"
            onClick={prevClip}
          >
            {/* <img
              className="w-6 h-6"
              src="res/chevron-left.svg"
              alt="prev clip"
            /> */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#d1d5db"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-gray-500 text-sm font-semibold transition duration-300 group-hover:text-gray-300">
              Back <span className="hidden lg:inline-block">(J)</span>
            </span>
          </button>
        )}
        <button
          type="button"
          className="icon-btn flex items-center group ml-auto pl-2"
          onClick={nextClip}
        >
          <span className="text-gray-500 text-sm font-semibold transition duration-300 group-hover:text-gray-300">
            Next Clip <span className="hidden lg:inline-block">(L)</span>
          </span>
          {/* <img
            className="w-6 h-6"
            src="res/chevron-right.svg"
            alt="next clip"
          /> */}
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#d1d5db"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
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
            className="w-6 h-6 rounded-full text-gray-300 lg:w-7 lg:h-7"
            src={curClip?.profile_image_url}
            alt="profile"
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
      <span className="text-2xl text-gray-300 mt-3 break-words">
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
              {curClip?.stream_viewer_count === 1 ? "" : "s"} · Updated{" "}
              {formatTimestamp(curClip?.created_at)}
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
            Playing <span className="text-gray-400">{curClip?.game_name}</span>
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
  );
}

export default ClipInfo;
