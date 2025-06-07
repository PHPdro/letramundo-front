"use client";
import { GameProvider } from "@/contexts/GameContext";
import { LevelTwoProvider } from "@/contexts/LevelTwoContext";
import { useAuth } from "@/hooks/auth/useAuth";
import ReactQueryProvider from "@/utils/reactquery";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Spin } from "antd";
import { PropsWithChildren } from "react";

export default function RoutesLayout({ children }: PropsWithChildren) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Spin />;
  }

  return (
    <div>
      <ReactQueryProvider>
        <GameProvider>
          <LevelTwoProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </LevelTwoProvider>
        </GameProvider>
      </ReactQueryProvider>
    </div>
  );
}
