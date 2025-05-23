"use client";
import React, { useEffect, useRef, useState } from "react";
import { message, Progress } from "antd";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";
import { Avatar } from "@/components/Avatar";
import Confetti from "react-confetti";
import { letters, phases } from "./phases";
import { useMutation } from "@tanstack/react-query";
import { studentProgress } from "@/api/progress";

type Vowel = {
  key: number;
  letter: string;
  sound: string;
};

const Nivel1 = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [start, setStart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentVowels, setCurrentVowels] = useState<Vowel[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [currentVowel, setCurrentVowel] = useState<Vowel>({} as Vowel);
  const [isCorrect, setIsCorrect] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const [firstLetterCorrect, setFirstLetterCorrect] = useState(false);
  const [secondLetterCorrect, setSecondLetterCorrect] = useState(false);
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState(1);
  const [hardPhase, setHardPhase] = useState(0);
  const { A, U, I, O, E, OI, EI } = letters;

  const hardVowels = [
    [U, I, O],
    [A, U, I, O, E],
  ];

  const randomizeVowels = (data: Vowel[]) => {
    const shuffledVowels = [...data].sort(() => Math.random() - 0.5);
    const getTwo = shuffledVowels.slice(0, 2);
    const selectedVowel = getTwo[Math.floor(Math.random() * getTwo.length)];
    setCurrentVowel(selectedVowel);
    // setCurrentVowels(shuffledVowels.slice(0, 2));
    audioRef.current = new Audio(selectedVowel.sound);
  };

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

  const handleStart = () => {
    if (phase > 9) {
      return;
    }
    if (phase === 1) {
      setCurrentVowel(A);
      setProgress(0);
    } else if (phase === 2) {
      setCurrentVowel(U);
      setProgress(0);
    } else if (phase === 3) {
      setCurrentVowel(I);
      setProgress(0);
    } else if (phase === 4) {
      setCurrentVowel(A);
      setProgress(0);
    } else if (phase === 5) {
      setCurrentVowel(E);
      setProgress(0);
    } else if (phase === 6) {
      setCurrentVowel(O);
      setProgress(0);
    } else if (phase === 7) {
      setCurrentVowel(E);
      setProgress(0);
    } else if (phase === 8) {
      setCurrentVowel(OI);
      setFirstLetter("O");
      setSecondLetter("I");
      setProgress(0);
    } else if (phase === 9) {
      setCurrentVowel(EI);
      setFirstLetter("E");
      setSecondLetter("I");
      setProgress(0);
    }
    setStart(true);
    setIsCorrect(false);
  };

  const handleClickLetter = (letter: string) => {
    let newFirstCorrect = firstLetterCorrect;
    let newSecondCorrect = secondLetterCorrect;

    if (letter === firstLetter) {
      newFirstCorrect = true;
    } else if (letter === secondLetter) {
      newSecondCorrect = true;
    }
    setFirstLetterCorrect(newFirstCorrect);
    setSecondLetterCorrect(newSecondCorrect);
    if (newFirstCorrect && newSecondCorrect) {
      let count = stage + 1;
      if (count < 3) {
        setStage(count);
        setProgress((prev) => prev + 33);
        setFirstLetterCorrect(false);
        setSecondLetterCorrect(false);
        setFirstLetter(phases[phase - 1][count][0].letter);
        setSecondLetter(phases[phase - 1][count][1].letter);
        audioRef.current = new Audio(phases[phase - 1][count][2].sound);
      }
      if (count === 3) {
        mutation.mutate(student.id);
        return;
      }
    }
  };

  const handleClick = (vowel: Vowel) => {
    if (vowel.key === currentVowel.key) {
      let count = stage + 1;
      if (count < 5) {
        setStage(count);
        setProgress((prev) => prev + 20);
        audioRef.current = new Audio(currentVowel.sound);
      }
      if (count === 5) {
        mutation.mutate(student.id);
        return;
      }
      if (phase === 4) {
        randomizeVowels(phases[3][count]);
      } else if (phase === 7) {
        randomizeVowels(phases[6][count]);
      }
    } else {
      message.error("Ah não, você errou :(");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const student = JSON.parse(localStorage.getItem("aluno") || "{}");
      setStudent(student);
      setPhase(student.phase_id);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = audioRef.current;
      if (audio) {
        if (start) {
          audio.play().catch((err) => {
            console.error("Autoplay failed:", err);
          });
        }
      }
    }
  }, [start, stage]);

  return (
    <div className="h-screen bg-[#b6d5f0] bgAlimentosJogo">
      {isCorrect && <Confetti width={window.innerWidth || 300} height={window.innerHeight || 200} />}
      <div className="p-6">
        <div className="flex justify-between z-10">
          <BackButton color="red" />
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
                <div className="absolute lg:left-64 lg:top-72 md:left-20 md:top-96 flex flex-col justify-center align-middle gap-12 z-10 items-start">
                  {phases[phase - 1][stage].map((vowel) => (
                    <button
                      key={vowel.key}
                      onClick={() => handleClick(vowel)}
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
                        src={`/${phases[phase - 1][stage][0].letter}${
                          phases[phase - 1][stage][1].letter
                        }.png`}
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
                          onClick={() => handleClickLetter(vowel.letter)}
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
    </div>
  );
};

export default Nivel1;
