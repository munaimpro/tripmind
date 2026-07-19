"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  Menu, 
  Bell,
  User
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const getPageTitle = () => {
    if (pathname === "/dashboard/user") return "Dashboard";
    if (pathname.includes("/my-trips")) return "My Trips";
    if (pathname.includes("/saved")) return "Saved Trips";
    if (pathname.includes("/history")) return "Trip History";
    if (pathname.includes("/profile")) return "Profile";
    if (pathname.includes("/planner")) return "AI Planner";
    return "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 md:ml-64 flex flex-col min-h-[calc(100vh-5rem)]">

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            {children}
        </main>
      </div>
    </div>
  );
}
