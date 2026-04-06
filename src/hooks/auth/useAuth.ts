"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { request } from "@/api/config";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      setIsAuthenticated(false);
      router.push("/login");
      return;
    }

    request({ endpoint: "verify-token" })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("aluno");
        router.push("/login");
      });
  }, [router]);

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("aluno");
    router.push("/login");
  };

  return { isAuthenticated, logout };
}
