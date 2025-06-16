"use client";
import { message } from "antd";
import React, { createContext, useContext, useRef, useState } from "react";

type LevelTwoContextType = {
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
  student: any;
  targetLetters: string[];
  setTargetLetters: React.Dispatch<React.SetStateAction<string[]>>;
  correctStates: boolean[];
  setCorrectStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  setStudent: React.Dispatch<React.SetStateAction<any>>;
  hardPhase: number;
  setHardPhase: React.Dispatch<React.SetStateAction<number>>;
  handleStart: (phases: any, phase: number) => void;
  handleClickLetter: (letter: string, handleRequest: () => void) => void;
  handleClick: (vowel: Vowel, handleRequest: () => void) => void;
  getStudentFromLocalStorage: () => void;
  hardVowels: string[];
  handleClickWord: (selectedWord: string, handleRequest: () => void) => void;
  changePhaseState: (index: number) => void;
};

type Vowel = {
  key: number;
  letter: string;
  sound: string;
};

const LevelTwoContext = createContext<LevelTwoContextType | undefined>(undefined);

export const LevelTwoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [start, setStart] = useState(false);
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentVowel, setCurrentVowel] = useState<Vowel>({} as Vowel);
  const [targetLetters, setTargetLetters] = useState<string[]>([]);
  const [correctStates, setCorrectStates] = useState<boolean[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [hardPhase, setHardPhase] = useState(0);
  const [expectedSequence, setExpectedSequence] = useState<string[]>([]);
  const hardVowels = ["V", "A", "U", "O", "E", "I"];
  const [phases, setPhases] = useState<any>();

  const getStudentFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const student = JSON.parse(localStorage.getItem("aluno") || "{}");
      if (student.id !== undefined) {
        setStudent(student);
        setPhase(student.phase);
      }
    }
  };

  const startPhase = (phases: any) => {
    setCurrentVowel(phases[phase - 1][stage][0]);
    const word = phases[phase - 1][stage][0].letter.split("");
    setTargetLetters(word);
    setCorrectStates(Array(word.length).fill(false));
    setProgress(0);
  };

  const startWithPhrase = (phases: any, hardphaseStage: number) => {
    setCurrentVowel(phases[phase - 1][stage][0]);
    const phrase = phases[phase - 1][stage][0].letter.split(" ");
    setExpectedSequence(phrase);
    setCorrectStates(Array(phrase.length).fill(false));
    setProgress(0);
    setTargetLetters(phrase);
    setHardPhase(hardphaseStage);
  };

  const changePhaseState = (index: number) => {
    setPhase(index);
    setStart(false);
    setStage(0);
  };

  const handleStart = (phases: any, phase: number) => {
    setPhases(phases);
    if (phase > 8) {
      return;
    }
    if (phase === 1) {
      setCurrentVowel(phases[phase - 1][stage][0]);
      setProgress(0);
    } else if (phase === 2) {
      setCurrentVowel(phases[phase - 1][stage][0]);
      setProgress(0);
    } else if (phase === 3) {
      startPhase(phases);
    } else if (phase === 4) {
      startPhase(phases);
    } else if (phase === 5) {
      startPhase(phases);
    } else if (phase === 6) {
      startWithPhrase(phases, 0);
    } else if (phase === 7) {
      startWithPhrase(phases, 1);
    } else if (phase === 8) {
      startWithPhrase(phases, 2);
    }
    setStart(true);
    setIsCorrect(false);
  };

  const handleClickLetter = (letter: string, handleRequest: () => void) => {
    const nextExpectedIndex = correctStates.findIndex((isCorrect) => !isCorrect);

    if (nextExpectedIndex === -1) return;

    if (targetLetters[nextExpectedIndex] === letter) {
      const newCorrectStates = [...correctStates];
      newCorrectStates[nextExpectedIndex] = true;
      setCorrectStates(newCorrectStates);

      const allCorrect = newCorrectStates.every(Boolean);
      if (allCorrect) {
        setTimeout(() => {
          const nextStage = stage + 1;
          const nextPhase = phases[phase - 1];

          if (nextStage < nextPhase.length) {
            setStage(nextStage);
            setProgress((prev) => prev + 100 / phases[phase - 1].length);

            const nextWord = nextPhase[nextStage][0].letter.split("");
            setTargetLetters(nextWord);
            setCorrectStates(Array(nextWord.length).fill(false));

            if (audioRef.current) {
              audioRef.current.src = nextPhase[nextStage][0].sound;
              audioRef.current.load();
            }
          } else {
            handleRequest();
          }
        }, 2000);
      }
    } else {
      message.error("Ah não, você errou :(");
    }
  };

  const handleClick = (vowel: Vowel, handleRequest: () => void) => {
    if (vowel.key === currentVowel.key) {
      let count = stage + 1;
      if (count < 5) {
        const currentWord = phases[phase - 1][count][0];
        setCurrentVowel(currentWord);
        setStage(count);
        setProgress((prev) => prev + 20);
        if (audioRef.current) {
          audioRef.current.src = currentWord.sound;
          audioRef.current.load();
        }
      }
      if (count === 5) {
        handleRequest();
        return;
      }
    } else {
      message.error("Ah não, você errou :(");
    }
  };

  const handleClickWord = (selectedWord: string, handleRequest: () => void) => {
    const nextIndex = correctStates.findIndex((correct) => !correct);

    if (selectedWord === expectedSequence[nextIndex]) {
      const newCorrectStates = [...correctStates];
      newCorrectStates[nextIndex] = true;
      setCorrectStates(newCorrectStates);

      const allCorrect = newCorrectStates.every(Boolean);

      if (allCorrect) {
        setTimeout(() => {
          const nextStage = stage + 1;
          const nextPhase = phases[phase - 1];

          if (nextStage < nextPhase.length) {
            setStage(nextStage);
            setProgress((prev) => prev + 100 / nextPhase.length);
            const nextWords = nextPhase[nextStage][0].letter.split(" ");
            setTargetLetters(nextWords);
            setExpectedSequence(nextWords);
            setCorrectStates(Array(nextWords.length).fill(false));

            if (audioRef.current) {
              audioRef.current.src = nextPhase[nextStage][0].sound;
              audioRef.current.load();
            }
          } else {
            handleRequest();
          }
        }, 2000);
      }
    } else {
      message.error("Ah não, você errou :(");
    }
  };

  return (
    <LevelTwoContext.Provider
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
        correctStates,
        setCorrectStates,
        targetLetters,
        setTargetLetters,
        student,
        setStudent,
        handleStart,
        handleClickLetter,
        handleClick,
        hardVowels,
        getStudentFromLocalStorage,
        handleClickWord,
        changePhaseState,
      }}
    >
      {children}
    </LevelTwoContext.Provider>
  );
};

export const useLevelTwo = (): LevelTwoContextType => {
  const context = useContext(LevelTwoContext);
  if (context === undefined) {
    throw new Error("useLevelTwo must be used within a AuthProvider");
  }
  return context;
};
