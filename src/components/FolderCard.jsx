import { FaFolder } from "react-icons/fa";

const FolderCard = ({ folder, onOpen }) => {
  return (
    <div
      onClick={() => onOpen(folder)}
      className="bg- flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-white/10 p-2 transition hover:shadow-lg"
    >
      <div className="bg-selected flex justify-center rounded-xl border border-white/10 p-10">
        <FaFolder className="text-7xl text-[#8FBFFA]" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate">{folder.name}</h3>

        <div className="flex items-center gap-1">
          <p className="text-white/50">{folder.children?.length || 0} items</p>
          <p className="text-white/50 text-xs">
            {folder.folderCount || 0} folders • {folder.fileCount || 0} files
          </p>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
