"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/PasswordGate";
import AppShell from "@/components/AppShell";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("murarihealth_auth");
    if (stored === "true") setAuthenticated(true);
    setChecking(false);
  }, []);

  const handleAuth = () => {
    sessionStorage.setItem("murarihealth_auth", "true");
    setAuthenticated(true);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <PasswordGate onSuccess={handleAuth} />;
  }

  return <AppShell />;
}
