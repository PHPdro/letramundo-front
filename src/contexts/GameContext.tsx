"use client";
import { letters, phases } from "@/app/(routes)/nivel1/phases";
import { message } from "antd";
import React, { createContext, useContext, useRef, useState } from "react";

type GameContextType = {
  audioRef: React.RefObject<HTMLAudioElement>;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isCorrect: boolean;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  currentVowel: Vowel;
  setCurrentVowel: React.Dispatch<React.SetStateAction<Vowel>>;
  firstLetter: string;
  secondLetter: string;
  thirdLetter: string;
  firstLetterCorrect: boolean;
  setFirstLetterCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  secondLetterCorrect: boolean;
  setSecondLetterCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  thirdLetterCorrect: boolean;
  setThirdLetterCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  student: any;
  setStudent: React.Dispatch<React.SetStateAction<any>>;
  hardPhase: number;
  setHardPhase: React.Dispatch<React.SetStateAction<number>>;
  handleStart: () => void;
  handleClickLetter: (letter: string, handleRequest: () => void) => void;
  handleClick: (vowel: Vowel, handleRequest: () => void) => void;
  getStudentFromLocalStorage: () => void;
  hardVowels: Vowel[][];
};

type Vowel = {
  key: number;
  letter: string;
  sound: string;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [start, setStart] = useState(false);
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentVowel, setCurrentVowel] = useState<Vowel>({} as Vowel);
  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const [thirdLetter, setThirdLetter] = useState("");
  const [firstLetterCorrect, setFirstLetterCorrect] = useState(false);
  const [secondLetterCorrect, setSecondLetterCorrect] = useState(false);
  const [thirdLetterCorrect, setThirdLetterCorrect] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [hardPhase, setHardPhase] = useState(0);
  const { A, U, I, O, E, OI, EI, AI } = letters;
  const hardVowels = [
    [U, I, O],
    [A, U, I, O, E],
    [A, U, E, I],
  ];

  const getStudentFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const student = JSON.parse(localStorage.getItem("aluno") || "{}");
      if (student.id !== undefined) {
        setStudent(student);
        setPhase(student.phase);
      }
    }
  };
  const handleStart = () => {
    if (phase > 10) {
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
      setHardPhase(1);
    } else {
      setCurrentVowel(AI);
      setFirstLetter("A");
      setSecondLetter("I");
      setProgress(0);
      setHardPhase(2);
    }
    setStart(true);
    setIsCorrect(false);
  };

  const randomizeVowels = (data: Vowel[]) => {
    const shuffledVowels = [...data].sort(() => Math.random() - 0.5);
    const getTwo = shuffledVowels.slice(0, 2);
    const selectedVowel = getTwo[Math.floor(Math.random() * getTwo.length)];
    setCurrentVowel(selectedVowel);
    // setCurrentVowels(shuffledVowels.slice(0, 2));
    if (audioRef.current) {
      audioRef.current.src = selectedVowel.sound;
      audioRef.current.load();
    }
  };
  const handleClickLetter = (letter: string, handleRequest: () => void) => {
    let newFirstCorrect = firstLetterCorrect;
    let newSecondCorrect = secondLetterCorrect;
    let newthirdLetterCorrect = thirdLetterCorrect;
    if (letter === thirdLetter && phase === 10 && stage > 1) {
      newthirdLetterCorrect = true;
    }
    if (letter === secondLetter) {
      newSecondCorrect = true;
    } else if (letter === firstLetter) {
      newFirstCorrect = true;
    }

    setFirstLetterCorrect(newFirstCorrect);
    setSecondLetterCorrect(newSecondCorrect);
    setThirdLetterCorrect(newthirdLetterCorrect);

    if (newFirstCorrect && newSecondCorrect) {
      let count = stage + 1;
      if (count < phases[phase - 1].length) {
        setStage(count);
        setProgress((prev) => prev + 100 / phases[phase - 1].length);
        setFirstLetterCorrect(false);
        setSecondLetterCorrect(false);
        setThirdLetterCorrect(false);
        setFirstLetter(phases[phase - 1][count][0].letter);
        setSecondLetter(phases[phase - 1][count][1].letter);
        if (phase === 10 && count > 1) {
          setThirdLetter(phases[phase - 1][count][2].letter.split("")[2]);
        }
        if (audioRef.current) {
          audioRef.current.src = phases[phase - 1][count][2].sound;
          audioRef.current.load();
        }
      }
      if (count === phases[phase - 1].length) {
        if (phase === 10 && letter !== thirdLetter) return;
        handleRequest();
        return;
      }
    }
  };

  const handleClick = (vowel: Vowel, handleRequest: () => void) => {
    if (vowel.key === currentVowel.key) {
      let count = stage + 1;
      if (count < 5) {
        setStage(count);
        setProgress((prev) => prev + 20);
        if (audioRef.current) {
          audioRef.current.src = currentVowel.sound;
          audioRef.current.load();
        }
      }
      if (count === 5) {
        handleRequest();
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
  return (
    <GameContext.Provider
      value={{
        audioRef,
        start,
        setStart,
        stage,
        setStage,
        phase,
        setPhase,
        progress,
        setProgress,
        isCorrect,
        setIsCorrect,
        currentVowel,
        setCurrentVowel,
        hardPhase,
        setHardPhase,
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
        setStudent,
        handleStart,
        handleClickLetter,
        handleClick,
        hardVowels,
        getStudentFromLocalStorage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a AuthProvider");
  }
  return context;
};
