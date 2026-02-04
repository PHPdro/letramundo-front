"use client";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";

const Dinos = () => {
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
          <BackButton url="inicio" color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-3xl font-medium text-center text-white mb-10 z-10">
          Bem vindo, {student?.name}!
        </h1>
        <div className="grid grid-cols-4 gap-8 z-10 items-center max-w-[400px] mx-auto">
          {Array.from({ length: 12 }, (_, index) => (
            <Link href={`/nivel${index + 1}/dinossauros`} key={index}>
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
      <div>
        <img
          src="/arvore.webp"
          alt="arvore.webp"
          className="md:hidden lg:block absolute bottom-52 right-20 w-[366px] h-[425px] object-cover"
        />
        <img src="/matos.svg" alt="Matos" className="absolute bottom-0 w-full h-[350px] object-cover" />
        <img
          src="/dino-roxo.svg"
          alt="dino roxo"
          className="absolute bottom-20 right-20 w-[162px] h-[154px] object-cover"
        />
        <img
          src="/dino-azul.svg"
          alt="dino azul"
          className="absolute bottom-20 left-20 w-[257px] h-[212px] object-cover"
        />
      </div>
    </div>
  );
};

export default Dinos;
