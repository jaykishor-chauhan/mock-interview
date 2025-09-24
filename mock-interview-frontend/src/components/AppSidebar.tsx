import { Brain, Home, MessageSquare, Phone, FileText, User, Quote } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "Interviews",
    url: "/interviews",
    icon: MessageSquare
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: FileText
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Phone
  },
  {
    title: "Request Quote",
    url: "/quote",
    icon: Quote
  },
];

export function AppSidebar() {
  const token = localStorage.getItem("authToken");
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";

  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(path + "/");

  const getNavClassName = (isActiveRoute: boolean) => {
    const baseClasses = "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300";
    const activeClasses = "bg-blue-100 text-blue-700 shadow-md hover:bg-blue-200"; 
    const inactiveClasses = "text-gray-600 hover:bg-blue-50 hover:text-blue-700";
    return `${baseClasses} ${isActiveRoute ? activeClasses : inactiveClasses}`;
  };



  if (!token) return null; // Return nothing if no token

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Branding */}
        <div className={`${isCollapsed ? "px-2 py-4" : "p-6"}`}>
          <div className="flex items-center gap-4">
            <div
              className={`${isCollapsed ? "w-9 h-9" : "w-12 h-12"
                } w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md`}>
              <Brain className={`${isCollapsed ? "w-5 h-5" : "w-8 h-8"} text-white`} />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold tracking-tight text-blue-700">
                  Mock Interview
                </h2>
                <p className="text-sm text-blue-600 mt-1">User Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel
            className={`text-xs uppercase py-4 ${isCollapsed ? "hidden" : "text-gray-500"}`}
          >
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className=" space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(isActive(item.url))}
                    >
                      <item.icon className="h-5 w-5 transition-transform duration-200" />
                      {!isCollapsed && (
                        <span className="tracking-wide">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
