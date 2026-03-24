"use client";
import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import { useGamePlay } from "@/contexts/GamePlayContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { notFound } from "next/navigation";
import { THEME_CONFIG, VALID_THEMES } from "@/utils/themeConfig";

const ThemeSelection = ({ params }: { params: { theme: string } }) => {
  const { theme } = params;
  if (!VALID_THEMES.includes(theme)) notFound();
  const { bgNiveisClass } = THEME_CONFIG[theme];

  const [student, setStudent] = useState<any>(null);
  const { changePhaseState } = useGamePlay();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const student = localStorage.getItem("aluno");
      setStudent(JSON.parse(student || "{}"));
    }
  }, []);

  return (
    <div className={bgNiveisClass}>
      <div className="flex flex-col h-full p-3 sm:p-4 md:p-6">
        <div className="flex justify-between z-10">
          <BackButton url={`niveis/${theme}`} color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-white mb-10 z-10">Nível 10</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8 z-10 items-center max-w-[300px] sm:max-w-[400px] mx-auto">
          {Array.from({ length: 8 }, (_, index) => (
            <Link href={`${theme}/jogo`} key={index}>
              <button
                onClick={() => changePhaseState(index + 1)}
                disabled={student?.phase < index + 1 && student.level === 10}
                className="bg-[#f8fafc] w-[55px] h-[50px] sm:w-[70px] sm:h-[65px] p-2 rounded-full text-center items-center flex justify-center font-mono"
                style={{
                  backgroundColor:
                    student?.phase - 1 < index + 1 && student.level === 10 ? "#f8fafc" : "#80cd3b",
                }}
              >
                {student?.phase < index + 1 && student.level === 10 ? <LockOutlined /> : index + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelection;
