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

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Interviews", url: "/interviews", icon: MessageSquare },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Blogs", url: "/blogs", icon: FileText },
  { title: "Contact", url: "/contact", icon: Phone },
  { title: "Request Quote", url: "/quote", icon: Quote },
];

export function AppSidebar() {
  const token = localStorage.getItem("authToken");
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50";

  if (!token) return null; // Return nothing if no token

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center">
            <div
              className={`${
                isCollapsed ? "w-9 h-9" : "w-14 h-14"
              } rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md transition-all duration-300`}
            >
              <Brain className={`${isCollapsed ? "w-5 h-5" : "w-7 h-7"} text-white`} />
            </div>

            {!isCollapsed && (
              <span className="mt-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
                AI Powered MI
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
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
