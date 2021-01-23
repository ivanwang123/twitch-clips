import gameIDs from "../utils/gameIDs";

function GameSelection() {
  return (
    <>
      <label
        className="flex items-center z-10 pointer-events-none ml-auto"
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
        className="max-w-8 truncate bg-gray-900 text-sm font-semibold border-r border-gray-500 pr-2 pl-14 -ml-13 cursor-pointer focus:outline-none 
                  transition duration-300 hover:text-gray-300
                  lg:bg-light lg:max-w-10 landscape:max-w-10"
        id="select-category"
        // onChange={(e) => setCategory(e.target.value)}
      >
        {Object.entries(gameIDs).map(([title, id]) => {
          return <option value={id}>{title}</option>;
        })}
      </select>
    </>
  );
}

export default GameSelection;
