"use client";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { useFetchStudents } from "@/hooks/useFetchStudents";

const Praia = () => {
  const [student, setStudent] = useState<any>(null);
  const _ = useFetchStudents();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const student = localStorage.getItem("aluno");
      setStudent(JSON.parse(student || "{}"));
    }
  }, []);
  return (
    <div className="bgPraiaNiveis">
      <div className="flex flex-col h-full p-3 sm:p-4 md:p-6">
        <div className="flex justify-between z-10">
          <BackButton url="inicio" color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-white mb-10 z-10">
          Bem vindo, {student?.name}!
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8 z-10 items-center max-w-[300px] sm:max-w-[400px] mx-auto">
          {Array.from({ length: 12 }, (_, index) => (
            <Link href={`/nivel${index + 1}/praia`} key={index}>
              <button
                disabled={student?.level < index + 1}
                className="bg-[#f8fafc] w-[55px] h-[50px] sm:w-[70px] sm:h-[65px] p-2 rounded-full text-center items-center flex justify-center font-mono"
              >
                {student?.level < index + 1 ? <LockOutlined /> : index + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Praia;
