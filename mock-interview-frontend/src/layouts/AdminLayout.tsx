import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Toaster } from "@/components/ui/toaster";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  const adminId = localStorage.getItem("adminId");
  const adminName = localStorage.getItem("adminName");
  const adminEmail = localStorage.getItem("adminEmail");
  const adminPhotoURL = localStorage.getItem("adminPhotoURL");
  const createdAt = localStorage.getItem("created_at");

  const adminInfo = {token: adminToken, id: adminId, name: adminName, email: adminEmail, photoURL: adminPhotoURL, created_at:createdAt};

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return (
      parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
    );
  };

  const getNameInOne = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const firstName = capitalize(parts[0]);
    let lastName = "";
    if (parts.length === 1) return firstName;
    lastName = capitalize(parts[parts.length - 1]);
    return `${firstName} ${lastName}`;
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/95 backdrop-blur flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 mx-3"
                >
                  <Avatar className="h-9 w-9">
                    {adminInfo.photoURL && <AvatarImage src={adminInfo.photoURL} alt={adminInfo.name} />}
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {getInitials(adminInfo.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-md shadow-lg bg-background border-border"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="flex text-sm font-medium leading-none">
                      {getNameInOne(adminInfo.name)}
                      <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {adminInfo.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => navigate(`/admin/profile?id=${adminId}`)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.clear();
                    navigate("/admin/login");
                  }}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children || <Outlet />}
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default AdminLayout;
