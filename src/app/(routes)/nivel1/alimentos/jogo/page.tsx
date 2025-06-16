"use client";
import React, { useEffect } from "react";
import { message, Progress } from "antd";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";
import { Avatar } from "@/components/Avatar";
import Confetti from "react-confetti";
import { phases } from "../../phases";
import { useMutation } from "@tanstack/react-query";
import { studentProgress } from "@/api/progress";
import { useGame } from "@/contexts/GameContext";
import { SoundOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Nivel1 = () => {
  const {
    audioRef,
    start,
    setStart,
    stage,
    setStage,
    phase,
    setPhase,
    progress,
    isCorrect,
    setIsCorrect,
    currentVowel,
    firstLetter,
    secondLetter,
    thirdLetter,
    firstLetterCorrect,
    setFirstLetterCorrect,
    secondLetterCorrect,
    setSecondLetterCorrect,
    thirdLetterCorrect,
    setThirdLetterCorrect,
    student,
    handleClickLetter,
    handleClick,
    handleStart,
    hardPhase,
    setHardPhase,
    hardVowels,
    getStudentFromLocalStorage,
  } = useGame();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: studentProgress,
    onSuccess: () => {
      message.success("Parabéns, você concluiu a fase!", 10);
      setIsCorrect(true);
      setPhase((prev) => prev + 1);
      setStage(0);
      if (phase > 7) {
        setFirstLetterCorrect(false);
        setSecondLetterCorrect(false);
        setThirdLetterCorrect(false);
        setHardPhase((prev) => prev + 1);
      }
      setTimeout(() => {
        router.push("/nivel1/alimentos");
        localStorage.setItem("aluno", JSON.stringify({ ...student, phase: phase + 1 }));
      }, 2000);
      setStart(false);
    },
    onError: () => {
      message.error("Erro ao salvar progresso");
    },
  });

  const handleSubmit = () => mutation.mutate(student.id);

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }
  };

  useEffect(() => {
    getStudentFromLocalStorage();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      playAudio();
    }
  }, [start, stage]);

  return (
    <div className="h-screen bg-[#b6d5f0] bgAlimentosJogo">
      {isCorrect && <Confetti width={window.innerWidth || 300} height={window.innerHeight || 200} />}
      <div className="p-6">
        <div className="flex justify-between z-10">
          <BackButton url="niveis/alimentos" color="red" />
          <div>
            <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
            {start && (
              <div className="flex justify-center items-center mt-2">
                <SoundOutlined
                  className="bg-white p-4 rounded-full justify-center text-4xl border-amber-300 border-2"
                  onClick={() => playAudio()}
                />
              </div>
            )}
          </div>
          <Avatar />
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        {start ? (
          <div>
            <audio ref={audioRef}>
              <source src={currentVowel.sound} type="audio/mpeg" />
            </audio>
            <p className="text-center mb-2 text-xl font-bold">Nível 1 - Fase {phase}</p>
            {phase < 8 ? (
              <>
                <Progress percent={progress} showInfo={false} size={[400, 20]} />
                <div className="absolute lg:left-64 lg:top-72 md:left-20 md:top-96 flex flex-col justify-center align-middle gap-12 z-10 items-start">
                  {phases[phase - 1][stage].map((vowel) => (
                    <button
                      key={vowel.key}
                      onClick={() => handleClick(vowel, handleSubmit)}
                      className="flex justify-center items-center bg-white p-11 rounded-full w-[100%] h-[100%] text-center font-medium text-4xl"
                    >
                      {vowel.letter}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="relative flex flex-col bg-white rounded-3xl md:h-[600px] m-3 p-5 z-10">
                <div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div>
                      <Progress percent={progress} showInfo={false} size={[400, 20]} />
                    </div>
                    <div className="flex justify-center flex-col items-center w-full">
                      <img
                        src={`/${phases[phase - 1][stage][2].letter}.png`}
                        alt={`${phases[phase - 1][stage][0].letter}${phases[phase - 1][stage][1].letter}`}
                        className="object-cover lg:h-[184px] md:h-[74px] lg:w-[184px] md:w-[60px] z-0 mt-2"
                      />
                      <div className="flex flex-row mt-8 gap-3">
                        <p className="border-[1px] border-black h-[86px] w-[70px] text-center lg:p-7 md:p-3 rounded-sm text-xl">
                          {firstLetterCorrect ? firstLetter : ""}
                        </p>
                        <p className="border-[1px] border-black h-[86px] w-[70px] text-center lg:p-7 md:p-3 rounded-sm text-xl">
                          {secondLetterCorrect ? secondLetter : ""}
                        </p>
                        {phase == 10 && stage > 1 && (
                          <p className="border-[1px] border-black h-[86px] w-[70px] text-center lg:p-7 md:p-3 rounded-sm text-xl">
                            {thirdLetterCorrect ? thirdLetter : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex justify-center items-center align-middle lg:px-32 md:px-8 mt-10 gap-14`}
                  >
                    {hardVowels[hardPhase].map((vowel) => (
                      <div key={vowel.key}>
                        <button
                          className="bg-[#e94d39] rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl"
                          onClick={() => handleClickLetter(vowel.letter, handleSubmit)}
                        >
                          {vowel.letter}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Image
            src="/play.svg"
            alt="play"
            className="object-cover"
            width={100}
            height={100}
            onClick={() => handleStart(phase)}
          />
        )}
      </div>
    </div>
  );
};

export default Nivel1;
