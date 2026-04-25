import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/provider/Sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FolderIcon,
  ArrowRight01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function NavFolderItem({ item, parentPath = "" }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  if (item.type !== "folder") return null;

  const hasFolderChildren =
    item.children?.some((child) => child.type === "folder") ?? false;

  // Build nested route path
  const route = `${parentPath.toLowerCase()}/${item.name.toLowerCase()}`;
  const isActive = location.pathname.toLowerCase() === route.toLowerCase();

  return (
    <SidebarMenuItem key={item.id}>
      <Link to={route} className="flex flex-1">
        <SidebarMenuButton
          tooltip={item.name}
          isActive={isActive}
          className="flex w-77 max-w-77 min-w-60 items-center gap-1 "
        >
          {/* Arrow toggler (collapse only, no navigation) */}
          {hasFolderChildren && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(!open);
              }}
              className="flex cursor-pointer items-center justify-center"
            >
              <HugeiconsIcon
                icon={open ? ArrowDown01Icon : ArrowRight01Icon}
                size={15}
                className="transition-colors"
              />
            </span>
          )}

          {/* Folder icon + name */}
          <div className="flex items-center gap-1 overflow-hidden text-sm">
            <HugeiconsIcon icon={FolderIcon} size={18} />
            <span className="line-clamp-1 w-full truncate">{item.name}</span>
          </div>
        </SidebarMenuButton>
      </Link>

      {/* Children folders (collapse only) */}
      {hasFolderChildren && open && (
        <div className="ml-4 flex flex-col gap-0 border-l border-white/10 pl-2">
          {item.children
            .filter((child) => child.type === "folder")
            .map((child) => (
              <NavFolderItem
                key={child.id}
                item={child}
                parentPath={route} // pass down parent path
              />
            ))}
        </div>
      )}
    </SidebarMenuItem>
  );
}

export function Navfolder({ items }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <NavFolderItem key={item.id || item.title} item={item} />
      ))}
    </SidebarMenu>
  );
}
