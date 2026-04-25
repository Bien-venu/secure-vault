import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import QuickAccess from "./app/dashboard/QuickAccess";
import folderData from "@/data/data.json";

const Layout = lazy(() => import("./app/Layout"));
const Loading = lazy(() => import("./components/Loading"));
const FolderPage = lazy(() => import("./app/dashboard/[folder]/FolderPage"));

// Recursive route generator
function renderFolderRoutes(folders, parentPath = "") {
  return folders.flatMap((folder) => {
    if (folder.type !== "folder") return [];

    // Build nested path: /Parent/Child
    const routePath = `${parentPath}/${folder.name}`;

    return [
      <Route key={folder.id} path={routePath} element={<FolderPage />} />,
      ...(folder.children
        ? renderFolderRoutes(folder.children, routePath)
        : []),
    ];
  });
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Default dashboard */}
            <Route index element={<QuickAccess />} />

            {/* Recursively map all folders */}
            {renderFolderRoutes(folderData)}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
