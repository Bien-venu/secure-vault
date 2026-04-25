import { useLocation } from "react-router-dom";

export default function FolderPage() {
  const location = useLocation();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Folder Page</h1>
      <p>Current route: {location.pathname}</p>
    </div>
  );
}
