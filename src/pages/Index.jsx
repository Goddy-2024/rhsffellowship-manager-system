
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
};

export default Index;
