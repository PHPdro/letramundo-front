import { PropsWithChildren } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReactQueryProvider from "@/utils/reactquery";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <ReactQueryProvider>
        <AntdRegistry>{children}</AntdRegistry>
      </ReactQueryProvider>
    </div>
  );
}
