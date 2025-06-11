"use client";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";

const Alimentos = () => {
  const [student, setStudent] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const student = localStorage.getItem("aluno");
      setStudent(JSON.parse(student || "{}"));
    }
  }, []);
  return (
    <div className="h-screen bg-[#b6d5f0]">
      <div className="flex flex-col h-screen p-6">
        <div className="flex justify-between z-10">
          <BackButton url="inicio" color="red" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-3xl font-medium text-center text-white mb-10 z-10">
          Bem vindo, {student?.name}!
        </h1>
        <div className="grid grid-cols-4 gap-8 z-10 items-center max-w-[400px] mx-auto">
          {Array.from({ length: 10 }, (_, index) => (
            <Link href={`/nivel${index + 1}/alimentos`} key={index}>
              <button
                disabled={student?.level < index + 1}
                className="bg-[#f8fafc] w-[70px] h-[65px] p-2 rounded-full text-center items-center flex justify-center font-mono"
              >
                {student?.level < index + 1 ? <LockOutlined /> : index + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <img
        src="/alimentos-bg-niveis.png"
        alt="Alimentos de tema de fundo"
        className="absolute bottom-0 w-full object-cover"
      />
    </div>
  );
};

export default Alimentos;
