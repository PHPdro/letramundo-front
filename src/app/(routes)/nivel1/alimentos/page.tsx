"use client";
import React, { useEffect, useRef, useState } from "react";
import { message, Progress } from "antd";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";
import { Avatar } from "@/components/Avatar";
import Confetti from "react-confetti";
import { phases } from "./phases";
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
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState(0);

  const A = { key: 1, letter: "A", sound: "/audios/letra-a.mp3" };
  const U = { key: 2, letter: "U", sound: "/audios/letra-u.mp3" };
  const I = { key: 3, letter: "I", sound: "/audios/letra-i.mp3" };
  const O = { key: 4, letter: "O", sound: "/audios/letra-o.mp3" };
  const E = { key: 5, letter: "E", sound: "/audios/letra-e.mp3" };

  const vowels4: Vowel[] = [A, U, I];
  const vowels7: Vowel[] = [A, U, I, O, E];

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
    },
    onError: () => {
      message.error("Erro ao salvar progresso");
    },
  });

  const handleStart = () => {
    if (phase === 0) {
      setCurrentVowel(A);
      setProgress(0);
    } else if (phase === 1) {
      setCurrentVowel(U);
      setProgress(0);
    } else if (phase === 2) {
      setCurrentVowel(I);
      setProgress(0);
    } else if (phase === 3) {
      randomizeVowels(vowels4);
      setProgress(0);
    } else if (phase === 4) {
      setCurrentVowel(E);
      setProgress(0);
    } else if (phase === 5) {
      setCurrentVowel(O);
      setProgress(0);
    } else if (phase === 6) {
      randomizeVowels(vowels7);
      setProgress(0);
    }
    setStart(true);
    setIsCorrect(false);
  };

  const handleClick = (vowel: Vowel) => {
    if (vowel.key === currentVowel.key) {
      let count = stage + 1;
      if (count < 5) {
        setStage(count);
        setProgress((prev) => prev + 20);
      }
      if (count === 5) {
        // TODO: pegar o id do aluno
        mutation.mutate(student.id);
        return;
      }
      if (phase === 3) {
        randomizeVowels(phases[3][count]);
      } else if (phase === 6) {
        randomizeVowels(phases[6][count]);
      }
    } else {
      message.error("Você errou!");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const student = JSON.parse(localStorage.getItem("aluno") || "{}");
      setStudent(student);
      setPhase(student.phase_id - 1);
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
            <Progress percent={progress} showInfo={false} size={[400, 20]} />
            <audio ref={audioRef}>
              <source src={currentVowel.sound} type="audio/mpeg" />
            </audio>
            <div className="absolute lg:left-64 lg:top-72 md:left-20 md:top-96 flex flex-col justify-center align-middle gap-12 z-10 items-start">
              {phases[phase][stage].map((vowel) => (
                <button
                  key={vowel.key}
                  onClick={() => handleClick(vowel)}
                  className="flex justify-center items-center bg-white p-11 rounded-full w-[100%] h-[100%] text-center font-medium text-4xl"
                >
                  {vowel.letter}
                </button>
              ))}
            </div>
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
