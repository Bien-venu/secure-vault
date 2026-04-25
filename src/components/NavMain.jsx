import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/provider/Sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocation, Link } from "react-router-dom";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-0 pb-4">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link to={item.url} key={item.id}>
                <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                  {item.icon && (
                    <HugeiconsIcon
                      icon={item.icon}
                      size={20}
                      className="text-text/70"
                    />
                  )}
                  <span className="line-clamp-1">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
