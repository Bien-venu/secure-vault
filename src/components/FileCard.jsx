import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileExcel,
  FaFileAlt,
  FaFileCode,
  FaFile,
} from "react-icons/fa";

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

  switch (ext) {
    case "pdf":
      return <FaFilePdf className="text-4xl text-red-500" />;
    case "doc":
    case "docx":
      return <FaFileWord className="text-4xl text-blue-500" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
      return <FaFileImage className="text-4xl text-green-500" />;
    case "xls":
    case "xlsx":
      return <FaFileExcel className="text-4xl text-green-700" />;
    case "txt":
      return <FaFileAlt className="text-4xl text-gray-500" />;
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "yaml":
      return <FaFileCode className="text-4xl text-yellow-500" />;
    default:
      return <FaFile className="text-4xl text-gray-400" />;
  }
};

const FileCard = ({ file }) => {
  const getFileInfo = (filename) => {
    const parts = filename.split(".");

    // case: ".gitignore" OR ".env" OR ".pdf"
    if (filename.startsWith(".") && parts.length === 2) {
      return {
        name: "Unnamed file",
        ext: parts[1].toLowerCase(),
      };
    }

    // no extension
    if (parts.length === 1) {
      return {
        name: filename,
        ext: "file",
      };
    }

    const ext = parts.pop();
    let name = parts.join(" ").replace(/_/g, " ");

    // case: ".pdf" or empty name
    if (!name.trim()) {
      name = "Unnamed file";
    }

    return {
      name,
      ext: ext.toLowerCase(),
    };
  };

  const { name, ext } = getFileInfo(file.name);

  return (
    <div className="w- flex items-center justify-start gap-4 rounded-xl border border-white/10 p-2 px-3 transition">
      <div className="bg-selected flex justify-center rounded-xl p-2">
        {getFileIcon(file.name)}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="truncate text-sm">{name}</h3>
        <p className="text-xs text-gray-500">
          {file.size} • {ext}
        </p>
      </div>
    </div>
  );
};

export default FileCard;
