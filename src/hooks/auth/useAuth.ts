"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(!!auth);

    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("aluno");
    router.push("/login");
  };

  return { isAuthenticated, logout };
}
