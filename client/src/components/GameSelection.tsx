import { useRef } from "react";
import gameIDs from "../utils/gameIDs";

interface PropTypes {
  setGameSelection: (e: any) => void;
}

function GameSelection(props: PropTypes) {
  const { setGameSelection } = props;

  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <label
        className="flex items-center z-10 pointer-events-none"
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
        className="max-w-8 truncate bg-gray-900 text-sm font-semibold pr-2 pl-14 -ml-13 cursor-pointer focus:outline-none 
                  transition duration-300 hover:text-gray-300
                  lg:bg-light lg:max-w-10 landscape:max-w-10"
        id="select-category"
        ref={selectRef}
        onChange={(e) => {
          setGameSelection(e);
          selectRef.current?.blur();
        }}
      >
        {Object.entries(gameIDs).map(([title, id]) => {
          return (
            <option value={id} key={id}>
              {title}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default GameSelection;
