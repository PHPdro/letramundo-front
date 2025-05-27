"use client";
import React, { useEffect } from "react";
import { message, Progress } from "antd";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";
import { Avatar } from "@/components/Avatar";
import { useGame } from "@/contexts/GameContext";
import Confetti from "react-confetti";
import { useMutation } from "@tanstack/react-query";
import { studentProgress } from "@/api/progress";
import { phases } from "../phases";

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
    firstLetterCorrect,
    setFirstLetterCorrect,
    secondLetterCorrect,
    setSecondLetterCorrect,
    student,
    handleClickLetter,
    handleClick,
    handleStart,
    hardPhase,
    setHardPhase,
    hardVowels,
    getStudentFromLocalStorage,
  } = useGame();

  const mutation = useMutation({
    mutationFn: studentProgress,
    onSuccess: () => {
      message.success("Parabéns, você concluiu a fase!", 10);
      setIsCorrect(true);
      setPhase((prev) => prev + 1);
      setStage(0);
      setStart(false);
      if (phase > 7) {
        setFirstLetterCorrect(false);
        setSecondLetterCorrect(false);
        setHardPhase((prev) => prev + 1);
      }
    },
    onError: () => {
      message.error("Erro ao salvar progresso");
    },
  });

  const handleSubmit = () => mutation.mutate(student.id);

  useEffect(() => {
    getStudentFromLocalStorage();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = audioRef.current;
      if (audio) {
        if (start) {
          audio
            .play()
            .then(() => {})
            .catch((err) => {
              console.error("Autoplay failed:", err);
            });
        }
      }
    }
  }, [start, stage]);
  return (
    <div className="h-screen bg-[#b6d5f0]">
      {isCorrect && <Confetti width={window.innerWidth || 300} height={window.innerHeight || 200} />}
      <div className="p-6">
        <div className="flex justify-between z-10">
          <BackButton color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        {start ? (
          <div>
            <audio ref={audioRef}>
              <source src={currentVowel.sound} type="audio/mpeg" />
            </audio>
            {phase < 8 ? (
              <>
                <Progress percent={progress} showInfo={false} size={[400, 20]} />
                <div className="absolute lg:right-72 lg:top-72 md:right-20 md:top-96 flex flex-col justify-center align-middle gap-12 z-10 items-start">
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
                        src={`/dino-${phases[phase - 1][stage][0].letter}${
                          phases[phase - 1][stage][1].letter
                        }.png`}
                        alt={`${phases[phase - 1][stage][0].letter}${phases[phase - 1][stage][1].letter}`}
                        className="object-cover lg:h-[184px] md:h-[74px] lg:w-[194px] md:w-[60px] z-0 mt-2"
                      />
                      <div className="flex flex-row mt-8 gap-3">
                        <p className="border-[1px] border-black h-[86px] w-[70px] text-center lg:p-7 md:p-3 rounded-sm text-xl">
                          {firstLetterCorrect ? firstLetter : ""}
                        </p>
                        <p className="border-[1px] border-black h-[86px] w-[70px] text-center lg:p-7 md:p-3 rounded-sm text-xl">
                          {secondLetterCorrect ? secondLetter : ""}
                        </p>
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
            onClick={handleStart}
          />
        )}
      </div>
      <div className="z-0">
        <img
          src="/arvore.webp"
          alt="arvore.webp"
          className="md:hidden lg:block absolute bottom-52 right-20 w-[366px] h-[425px] object-cover"
        />
        <img src="/matos.svg" alt="Matos" className="absolute bottom-0 w-full h-[350px] object-cover" />
        <img
          src="/dino-laranja.svg"
          alt="dino azul"
          className="absolute bottom-32 left-20 w-[367px] h-[302px] object-cover"
        />
      </div>
    </div>
  );
};

export default Nivel1;
