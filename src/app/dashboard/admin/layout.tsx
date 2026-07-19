"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react"; // Unused Bell এবং User রিমুভ করা হয়েছে
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

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

    // Dedicated Admin টাইটেল লজিক
    const getPageTitle = () => {
        if (pathname === "/dashboard/admin") return "Dashboard";
        if (pathname.includes("/analytics")) return "Analytics";
        if (pathname.includes("/destinations")) return "Destinations";
        if (pathname.includes("/trips")) return "Trips";
        if (pathname.includes("/users")) return "Users";
        return "Admin Panel";
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

                {/* Mobile Menu Trigger & Page Title (যেহেতু কোনো গ্লোবাল হেডার নেই) */}
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 md:hidden mb-2">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Open Menu"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {getPageTitle()}
                    </h1>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}