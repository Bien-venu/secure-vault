import data from "@/data/data.json";
import FolderCard from "../../components/FolderCard";
import FileCard from "../../components/FileCard";
import Table from "../../components/Table";

// helpers
const getAllFolders = (items) => {
  let folders = [];

  const traverse = (arr) => {
    arr.forEach((item) => {
      if (item.type === "folder") {
        folders.push(item);
        if (item.children) traverse(item.children);
      }
    });
  };

  traverse(items);
  return folders;
};

const getAllFiles = (items) => {
  let files = [];

  const traverse = (arr) => {
    arr.forEach((item) => {
      if (item.type === "file") {
        files.push(item);
      }
      if (item.children) traverse(item.children);
    });
  };

  traverse(items);
  return files;
};

const getRandomItems = (arr, count) => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};

const QuickAccess = () => {
  const allFolders = getAllFolders(data);
  const allFiles = getAllFiles(data);

  const randomFolders = getRandomItems(allFolders, 5);
  const randomFiles = getRandomItems(allFiles, 6);
  const tableFiles = getRandomItems(allFiles, 6);

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-4 py-2">
      {/* Header */}
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl">Welcome back, Bienvenu!</h1>
        <p className="text-white/50">
          Your files stay safe, organized and always within reach.
        </p>
      </div>

      <div className="flex flex-col w-full gap-6 overflow-auto">
        {/* Folders */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white/50">Quick Folders</h2>
          <div className="grid grid-cols-5 gap-2">
            {randomFolders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={{
                  ...folder,
                  fileCount:
                    folder.children?.filter((c) => c.type === "file").length ||
                    0,
                  folderCount:
                    folder.children?.filter((c) => c.type === "folder")
                      .length || 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Files */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white/50">New Files</h2>
          <div className="grid grid-cols-6 gap-2">
            {randomFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </div>

        {/* Table */}
        <Table tableFiles={tableFiles} />
      </div>
    </div>
  );
};

export default QuickAccess;
