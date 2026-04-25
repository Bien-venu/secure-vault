import { default as Bienvenu } from "@/assets/hero.png";
import { Sidebar, SidebarContent } from "@/provider/Sidebar";
import { File02Icon, Folder03Icon, StarIcon } from "@hugeicons/core-free-icons";
import { Navfolder } from "./NavFolder";

// import your folder JSON (dummy now, backend later)
import folderData from "@/data/data.json";
import { NavMain } from "./NavMain";
import Search from "./Search";
import Logo from "./Logo";

export function AppSidebar({ ...props }) {
  const data = {
    user: {
      name: "user.name",
      email: "m@example.com",
      avatar: Bienvenu,
    },
    navMain: [
      { title: "Quick access", url: "/", icon: StarIcon, id: "access" },
      { title: "Folder", url: "#", icon: Folder03Icon, id: "folder" },
      { title: "Files", url: "#", icon: File02Icon, id: "file" },
    ],
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="h-full w-full overflow-hidden"
    >
      <SidebarContent className="flex h-full w-full flex-col justify-between overflow-hidden p-0">
        <div className="flex h-full w-full overflow-hidden">
          <div className="flex h-full max-w-14 flex-col justify-between gap-4 overflow-hidden p-2">
            <Logo />
            <div className="h-fit w-full overflow-hidden rounded-xl">
              <img
                src="/Bienvenu.jpg"
                alt="logo"
                className="w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-4 overflow-hidden border-x border-white/10 py-2">
            <div className="flex h-full w-full flex-col gap-4 overflow-hidden">
              <div className="flex flex-col gap-4 border-b border-white/10 px-2">
                <Search />
                <NavMain items={data.navMain} />
              </div>
              <div className="flex h-full w-full flex-col gap-1 overflow-auto px-2">
                <p className="bg-background sticky top-0 left-0 z-20 pb-3 text-white/50">
                  All folder
                </p>
                <div className="flex w-fit min-w-full">
                  <Navfolder items={folderData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
