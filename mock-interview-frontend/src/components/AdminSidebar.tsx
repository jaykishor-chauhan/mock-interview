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
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Questions",
    url: "/admin/questions",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/admin/reports",
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

    const activeClasses = "bg-primary/20 text-primary shadow-md hover:bg-primary/30";
    const inactiveClasses = "text-gray-600 hover:bg-primary/10 hover:text-primary";

    return `${baseClasses} ${isActiveRoute ? activeClasses : inactiveClasses}`;
  };



  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"
        }`}
      collapsible="icon"
    >
      {/* Branding */}
      <SidebarContent className="bg-gray-50">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <Brain className={`${isCollapsed ? "w-6 h-6" : "w-8 h-8"} text-white`} />
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


        {/* Navigation */}
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
