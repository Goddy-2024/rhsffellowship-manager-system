
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { MemberManagement } from "@/components/members/MemberManagement";
import { EventManagement } from "@/components/events/EventManagement";
import { Reports } from "@/components/reports/Reports";
import { DashboardHome } from "@/components/dashboard/DashboardHome";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "members":
        return <MemberManagement />;
      case "events":
        return <EventManagement />;
      case "reports":
        return <Reports />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}
