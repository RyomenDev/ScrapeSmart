import HeaderData from "../Data/HeaderData.jsx";

const Header = () => {
  const { topHeader } = HeaderData;
  const { logo, appName } = topHeader;

  return (
    <>
      <header className="z-50 flex items-center justify-between px-6 py-4 shadow-2xl bg-gradient-to-b from-[#4E342E] via-[#3B2F2F] to-[#212121] text-white">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105">
          <img src={logo} alt={appName} className="h-12 md:h-14 w-auto" />
          <span className="text-xl font-bold md:text-2xl hover:text-indigo-400">
            {appName}
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
