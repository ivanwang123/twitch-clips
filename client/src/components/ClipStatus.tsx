import { RefObject } from "react";

interface PropTypes {
  clipStatus: string;
  isFetching: boolean;
  prevClip: () => void;
  refreshClips: () => void;
  toggleLandscapePage: (page: HTMLElement | null) => void;
  navRef: RefObject<HTMLElement>;
}

function ClipStatus(props: PropTypes) {
  const {
    clipStatus,
    isFetching,
    prevClip,
    refreshClips,
    toggleLandscapePage,
    navRef,
  } = props;

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {/* TITLE */}
        <h1 className="text-6xl text-gray-300 font-bold text-center">
          {isFetching ? (
            "Loading Clips..."
          ) : (
            <>
              {clipStatus === "end" ? (
                <>
                  You've<br></br>Reached<br></br>
                  <span className="font-normal">the</span> End
                </>
              ) : (
                "No Clips :("
              )}
            </>
          )}
        </h1>

        {/* SUBTEXT */}
        {!isFetching && (
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
        )}
      </div>

      {/* LANDSCAPE SIDEBAR */}
      <div className="hidden w-24 h-full bg-gray-900 text-gray-200 pt-1 landscape:flex flex-col items-center">
        <button
          type="button"
          className="icon-btn mt-24 p-1"
          onClick={() => toggleLandscapePage(navRef.current)}
        >
          <img className="w-8 h-8" src="res/adjustments.svg" alt="settings" />
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
  );
}

export default ClipStatus;
