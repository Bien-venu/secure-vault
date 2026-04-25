import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/provider/Sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useClock } from "../hooks/useClock";
import Header from "../components/Header";

export default function Layout() {
  const time = useClock("Africa/Kigali"); // Rwanda timezone

  return (
    <SidebarProvider
      className="bg-background text-text flex h-screen w-full flex-col overflow-hidden text-sm"
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
        <span></span>
        <span>Rwanda {time}</span>
      </div>
      <div className="flex h-full w-full overflow-hidden">
        <div className="flex h-full overflow-hidden">
          <AppSidebar variant="inset" />
        </div>
        <SidebarInset className="bg-foreground flex h-full w-full flex-col overflow-hidden">
          <Header />
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
