import { Dispatch, RefObject, SetStateAction } from "react";
import GameSelection from "../components/GameSelection";
import LanguageSelection from "../components/LanguageSelection";

interface PropTypes {
  game: string;
  language: string;
  setGame: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  toggleLandscapePage: (page: HTMLElement | null) => void;
  refreshClips: () => void;
  navRef: RefObject<HTMLElement>;
}

function NavBar(props: PropTypes) {
  const {
    game,
    language,
    setGame,
    setLanguage,
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
        <div className="flex items-center">
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
            <span className="hidden text-gray-500 text-sm font-semibold ml-1 landscape:block lg:ml-2 lg:block">
              {/* <strong>142 clips</strong> from past 30 min */}
              Refresh
            </span>
          </button>
        </div>

        {/* GAME SELECTION */}
        <GameSelection
          game={game}
          setGame={setGame}
          toggleLandscapePage={toggleLandscapePage}
        />
        <LanguageSelection
          language={language}
          setLanguage={setLanguage}
          toggleLandscapePage={toggleLandscapePage}
        />
      </section>
    </>
  );
}

export default NavBar;
