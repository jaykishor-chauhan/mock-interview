import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, X, Bell, LogOut, LifeBuoy, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pages = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" },
  { name: "Request Quote", path: "/request-quote" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
];

export default function Header() {
  const navigate = useNavigate();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPages, setFilteredPages] = useState([]);
  const token = localStorage.getItem("authToken");
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredPages([]);
    } else {
      setFilteredPages(
        pages.filter((page) =>
          page.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const getInitials = (fullName: "Jaykishor Chauhan") => {
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
    const lastName = capitalize(parts[parts.length - 1] || parts[0]);
    return `${firstName} ${lastName}`;
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div
          className={`flex h-full w-full items-center justify-between ${isMobileSearchOpen ? "hidden" : "flex"
            } md:flex`}
        >
          <div className="flex items-center gap-4">
            {token ? (<SidebarTrigger />) : (null)}

            <div className="relative hidden md:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search interviews, topics..."
                className="w-64 pl-9 bg-muted/50 border-0 focus:bg-background"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {filteredPages.length > 0 && (
                <div className="absolute mt-[48px] w-full bg-background border rounded-md shadow-lg z-100">
                  {filteredPages.map((page) => (
                    <div
                      key={page.path}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        navigate(page.path);
                        setSearchTerm("");
                        setFilteredPages([]);
                      }}
                    >
                      {page.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {token ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge
                    className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    1
                  </Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 mx-3"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                          {getInitials(user.name)}
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
                        <p className="text-sm font-medium leading-none">{getNameInOne(user.name)}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onSelect={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate("/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => navigate("/support")}>
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-medium"
                >
                  Sign in
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Start for free
                </button>
              </div>

            )}

          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="flex w-full items-center gap-2 md:hidden">
            <div className="relative flex-1">
              <Input
                placeholder="Search interviews, topics..."
                className="w-full pl-9 bg-muted/50 border-0 focus:bg-background"
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />

              {filteredPages.length > 0 && (
                <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg z-50">
                  {filteredPages.map((page) => (
                    <div
                      key={page.path}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        navigate(page.path);
                        setIsMobileSearchOpen(false);
                        setSearchTerm("");
                        setFilteredPages([]);
                      }}
                    >
                      {page.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
