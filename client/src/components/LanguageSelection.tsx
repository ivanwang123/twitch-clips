import languageIDs from "../utils/languageIDs";

function LanguageSelection() {
  return (
    <>
      <select
        className="max-w-8 select-right-align bg-gray-900 text-sm font-semibold pl-2 pr-14 -mr-13 cursor-pointer focus:outline-none 
                  transition duration-300 hover:text-gray-300
                  lg:pl-8 lg:bg-light lg:max-w-10 landscape:max-w-10"
        id="select-lang"
        // onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(languageIDs).map(([lang, abbrev]) => {
          return <option value={abbrev}>{lang}</option>;
        })}
      </select>
      <label
        className="flex items-center z-10 pointer-events-none"
        htmlFor="select-lang"
      >
        <img
          className="w-4 h-4 mr-2"
          src="res/chevron-down.svg"
          alt="open menu"
        />
        <img className="w-6 h-6" src="res/globe.svg" alt="language" />
      </label>
    </>
  );
}

export default LanguageSelection;
