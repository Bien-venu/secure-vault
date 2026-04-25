/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={{
          "--sidebar-width": 96,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        }}
        className={cn(
          "group/sidebar-wrapper flex h-full w-full overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn("flex h-full w-96 flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        {openMobile && (
          <div
            className="absolute inset-0 z-40"
            onClick={() => setOpenMobile(false)}
          />
        )}
        <div
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={cn(
            "dark: p0 absolute top-0 z-50 h-full w-96 transition-transform duration-300 ease-in-out",
            side === "left"
              ? `${openMobile ? "translate-x-0" : "-translate-x-full"} left-0`
              : `${openMobile ? "translate-x-0" : "translate-x-full"} right-0`,
            "p-0",
          )}
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </div>
      </>
    );
  }

  return (
    <div
      className="group peer relative hidden h-full w-96 md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-96 bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "h- absolute inset-y-0 top-0 bottom-0 z-10 hidden w-96 transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:-left-112"
            : "right-0 group-data-[collapsible=offcanvas]:-right-112",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            "flex h-full w-full flex-col",
            variant === "floating" && "rounded-lg",
            variant === "inset" && "",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      className={cn(
        "hover: hover:/10 2 rounded-lg transition-colors",
        className,
      )}
      {...props}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {!isMobile ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        )}
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "after:/10 dark:after: after:0 absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "dark: relative flex w-full flex-1 flex-col overflow-auto",
        className,
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("4 -b flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("4 -t flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex- flex h-full min-h-0 w-full flex-col gap-1 overflow-auto",
        "group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, asChild = false, ...props }) {
  if (asChild) {
    return <>{props.children}</>;
  }
  return (
    <div
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  children,
  ...props
}) {
  const { state } = useSidebar();

  const buttonContent = (
    <button
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
        isActive ? "bg-primary font-medium" : "hover:bg-active-hover hover:",
        state === "collapsed" && "justify-center px-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );

  if (asChild) {
    return <>{buttonContent}</>;
  }

  return buttonContent;
}

function SidebarMenuSub({ className, ...props }) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "-l ml-6 flex min-w-0 flex-col gap-1 pl-3",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  isActive = false,
  className,
  children,
  ...props
}) {
  const buttonContent = (
    <a
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-active={isActive}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-1.5 transition-all duration-200",
        isActive ? "dark: font-medium" : "hover: hover:",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );

  if (asChild) {
    return <>{buttonContent}</>;
  }

  return buttonContent;
}

// Utility function for className merging
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};
