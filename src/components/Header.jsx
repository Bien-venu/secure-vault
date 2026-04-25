import Search from "./Search";

const Header = () => {
  return (
    <div className="flex h-fit py-1 items-center justify-between border-b border-white/10 px-4">
      <span></span>
      <Search /> 
    </div>
  );
};

export default Header;
