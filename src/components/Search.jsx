import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const Search = () => {
  return (
    <div className="bg-background min-w-70 z-50 flex items-center gap-1 rounded-xl border border-white/10 px-3">
      <HugeiconsIcon icon={Search01FreeIcons} size={24} className="w-fit" />
      <input
        type="text"
        placeholder="Search files"
        className="w- h-full flex-1 py-3"
      />
    </div>
  );
};

export default Search;
