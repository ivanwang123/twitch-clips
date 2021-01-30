import { RefObject } from "react";
import GameSelection from "../components/GameSelection";
import LanguageSelection from "../components/LanguageSelection";

interface PropTypes {
  setGameSelection: (e: any) => void;
  setLanguageSelection: (e: any) => void;
  toggleLandscapePage: (page: HTMLElement | null) => void;
  refreshClips: () => void;
  navRef: RefObject<HTMLElement>;
}

function NavBar(props: PropTypes) {
  const {
    setGameSelection,
    setLanguageSelection,
    toggleLandscapePage,
    refreshClips,
    navRef,
  } = props;

  return (
    <>
      <button
        type="button"
        className="icon-btn hidden px-1 mb-5 ml-auto landscape:block"
        onClick={() => toggleLandscapePage(navRef.current)}
      >
        <img className="w-6 h-6" src="res/close.svg" alt="close" />
      </button>
      <section className="w-full flex items-center">
        <span className="title text-gray-500 text-xl">Zero Andy</span>

        {/* GAME SELECTION */}
        <span className="flex border-r border-gray-500 ml-auto">
          <GameSelection setGameSelection={setGameSelection} />
        </span>
        <LanguageSelection setLanguageSelection={setLanguageSelection} />
        <div className="flex items-center ml-6">
          <button
            type="button"
            className="icon-btn group flex items-center p-1"
            onClick={() => {
              toggleLandscapePage(null);
              refreshClips();
            }}
          >
            <img
              className="w-6 h-6 transform transition duration-300 group-hover:rotate-90"
              src="res/refresh.svg"
              alt="refresh"
            />
            {/* <span
              className="hidden text-gray-500 text-sm font-semibold ml-1 transition duration-300 group-hover:text-gray-300
                        landscape:block lg:ml-2 lg:block"
            >
              Refresh
            </span> */}
          </button>
        </div>
      </section>
    </>
  );
}

export default NavBar;
