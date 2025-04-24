"use client";
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
        <AntdRegistry>{children}</AntdRegistry>
      </ReactQueryProvider>
    </div>
  );
}
