"use client";
import Image from "next/image";
import { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto py-4 md:py-8 px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4 items-center">
            <Image
              className="mr-5 w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
              src="/LetraMundo.png"
              alt="logo"
              width={100}
              height={100}
            />
            <div className="hidden md:flex space-x-4 items-center">
              <a
                href="#"
                className="relative text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium"
              >
                Alunos
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary"></span>
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <span className="hidden md:inline text-gray-700 px-3 py-2 rounded-md text-base font-medium">
              Professor
            </span>
            <button className="md:hidden p-2 text-gray-700" onClick={() => setDrawerOpen(true)}>
              <MenuOutlined style={{ fontSize: 24 }} />
            </button>
          </div>
        </div>
      </div>
      <Drawer title="Menu" placement="right" onClose={() => setDrawerOpen(false)} open={drawerOpen}>
        <div className="flex flex-col gap-4">
          <a href="#" className="text-gray-700 hover:text-gray-900 text-base font-medium">
            Alunos
          </a>
          <hr />
          <span className="text-gray-700 text-base font-medium">Professor</span>
        </div>
      </Drawer>
    </nav>
  );
};
