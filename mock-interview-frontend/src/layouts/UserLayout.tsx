import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom"; // <-- import Outlet

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          {/* Main content */}
          <main className="flex-1">
            <Outlet /> {/* <-- Nested routes render here */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
