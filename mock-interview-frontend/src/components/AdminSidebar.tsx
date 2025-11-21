import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  FileText,
  Brain,
} from "lucide-react";

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
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/get-registered?state=users",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Questions",
    url: "/questions",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
];


export function AdminSidebar() {
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


  return (
    <Sidebar collapsible="icon" >
      <SidebarContent className="bg-gray-50">
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
                <p className="text-sm text-blue-600 mt-1">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel
            className={`text-xs uppercase py-4 ${isCollapsed ? "hidden" : "text-gray-500"}`}
          >
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
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
