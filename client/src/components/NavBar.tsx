import { RefObject } from "react";
import GameSelection from "../components/GameSelection";
import LanguageSelection from "../components/LanguageSelection";

interface PropTypes {
  toggleLandscapePage: (page: HTMLElement | null) => void;
  navRef: RefObject<HTMLElement>;
}

function NavBar(props: PropTypes) {
  const { toggleLandscapePage, navRef } = props;

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
        <div className="flex items-center">
          <img
            className="w-6 h-6 cursor-pointer transform transition duration-300 hover:rotate-90"
            src="res/refresh.svg"
            alt="refresh"
          />
          <span className="hidden text-gray-500 text-sm font-semibold ml-3 lg:block">
            <strong>142 clips</strong> from past 30 min
          </span>
        </div>
        {/* GAME SELECTION */}
        <GameSelection />
        <LanguageSelection />
      </section>
    </>
  );
}

export default NavBar;
