"use client";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import { useLevelTwo } from "@/contexts/LevelTwoContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";

const Dinossauros = () => {
  const [student, setStudent] = useState<any>(null);
  const { changePhaseState } = useLevelTwo();

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
          <BackButton url="niveis/dinos" color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-3xl font-medium text-center text-white mb-10 z-10">Nível 8</h1>
        <div className="grid grid-cols-4 gap-8 z-10 items-center max-w-[400px] mx-auto">
          {Array.from({ length: 8 }, (_, index) => (
            <Link href={`dinossauros/jogo`} key={index}>
              <button
                onClick={() => changePhaseState(index + 1)}
                disabled={student?.phase < index + 1 && student.level === 8}
                className="w-[70px] h-[65px] p-2 rounded-full text-center items-center flex justify-center font-mono"
                style={{
                  backgroundColor:
                    student?.phase - 1 < index + 1 && student.level === 8 ? "#f8fafc" : "#80cd3b",
                }}
              >
                {student?.phase < index + 1 && student.level === 8 ? <LockOutlined /> : index + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <img
        src="/dinos-bg-niveis.png"
        alt="Dinossauros de tema de fundo"
        className="absolute bottom-0 w-full object-cover"
      />
    </div>
  );
};

export default Dinossauros;
