import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Dashboard } from "@/components/Dashboard";

interface User {
  name: string;
  email: string;
  role: "student" | "teacher";
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionTier] = useState<"free" | "student" | "teacher" | "personal">("free");

  const handleAuth = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthForm onAuth={handleAuth} />;
  }

  return (
    <Dashboard 
      userRole={user.role}
      userName={user.name}
      subscriptionTier={subscriptionTier}
    />
  );
};

export default Index;
