"use client";
import React, { useEffect } from "react";
import { message, Progress } from "antd";
import { BackButton } from "@/components/BackButton";
import { Avatar } from "@/components/Avatar";
import { phases, phrases } from "../../phases";
import { useMutation } from "@tanstack/react-query";
import { studentProgress } from "@/api/progress";
import { useLevelTwo } from "@/contexts/LevelTwoContext";
import Image from "next/image";
import Confetti from "react-confetti";
import { SoundOutlined } from "@ant-design/icons";
import { useRouter, notFound } from "next/navigation";
import { getImage } from "@/utils/getImage";
import { THEME_CONFIG, VALID_THEMES } from "@/utils/themeConfig";

const Nivel7 = ({ params }: { params: { theme: string } }) => {
  const { theme } = params;
  if (!VALID_THEMES.includes(theme)) notFound();
  const { bgClass, color } = THEME_CONFIG[theme];

  const router = useRouter();
  const {
    audioRef,
    audioRefFeedBack,
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
    student,
    handleClickLetter,
    handleClick,
    handleStart,
    hardPhase,
    correctStates,
    targetLetters,
    handleClickWord,
    getStudentFromLocalStorage,
  } = useLevelTwo();

  const hardVowels = ["J", "O", "N", "I", "A", "L", "M", "U", "E", "F", "V"];

  const mutation = useMutation({
    mutationFn: studentProgress,
    onSuccess: () => {
      message.success("Parabéns, você concluiu a fase!", 10);
      setIsCorrect(true);
      setPhase((prev) => prev + 1);
      setStage(0);
      setTimeout(() => {
        router.push(`/nivel7/${theme}`);
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
    <div className={`min-h-screen bg-[#b6d5f0] ${bgClass}`}>
      {isCorrect && <Confetti width={window.innerWidth || 300} height={window.innerHeight || 200} />}
      <div className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
        <div className="flex justify-between z-10">
          <BackButton url={`nivel7/${theme}`} color={color} />
          <div>
            <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
            {start && (
              <div className="flex justify-center items-center mt-2">
                <SoundOutlined
                  className="bg-white p-2 sm:p-3 md:p-4 rounded-full justify-center text-2xl sm:text-3xl md:text-4xl border-amber-300 border-2"
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
            <audio ref={audioRefFeedBack} className="hidden">
              <source src={currentVowel.sound} type="audio/mpeg" />
            </audio>
            <audio ref={audioRef}>
              <source src={currentVowel.sound} type="audio/mpeg" />
            </audio>
            <p className="text-center mb-2 text-xl font-bold">Nível 7 - Fase {phase}</p>
            {phase < 3 ? (
              <>
                <div className="w-full max-w-[400px] mx-auto">
                  <Progress percent={progress} showInfo={false} />
                </div>
                <div className="md:absolute md:left-20 md:top-96 lg:left-64 lg:top-72 flex flex-col justify-center align-middle gap-12 z-10 items-start">
                  {phases[phase - 1][stage].map(
                    (vowel, index) =>
                      index < 2 && (
                        <button
                          key={vowel.key}
                          onClick={() => handleClick(vowel, handleSubmit)}
                          className="flex justify-center items-center bg-white p-6 sm:p-8 md:p-11 rounded-full w-[100%] h-[100%] text-center font-medium text-2xl sm:text-3xl md:text-4xl"
                        >
                          {vowel.letter}
                        </button>
                      ),
                  )}
                </div>
              </>
            ) : (
              <div className="relative flex flex-col bg-white rounded-3xl min-h-[400px] md:min-h-[600px] m-3 p-5 z-10">
                <div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div>
                      <div className="w-full max-w-[400px] mx-auto">
                        <Progress percent={progress} showInfo={false} />
                      </div>
                    </div>
                    <div className="flex justify-center flex-col items-center w-full">
                      <img
                        src={getImage(theme, phases[phase - 1][stage][0].letter)}
                        alt={`${phases[phase - 1][stage][0].letter}`}
                        className="h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] lg:h-[194px] lg:w-[194px] z-0 mt-2"
                      />
                      <div className="flex flex-row mt-8 gap-3">
                        {correctStates.map((_, index) => (
                          <p
                            key={index}
                            className="border-[1px] border-black h-[50px] sm:h-[65px] md:h-[86px] text-center p-2 sm:p-3 md:p-5 lg:p-7 rounded-sm text-xl"
                          >
                            {correctStates[index] ? targetLetters[index] : ""}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex flex-wrap justify-center items-center align-middle px-4 md:px-8 lg:px-32 mt-10 gap-4 sm:gap-8 md:gap-14`}
                  >
                    {phase < 6
                      ? hardVowels.map((vowel, index) => (
                          <div key={index}>
                            <button
                              className="bg-[#e94d39] rounded-sm p-3 sm:p-4 md:p-5 lg:p-7 text-white font-medium text-xl"
                              onClick={() => handleClickLetter(vowel, handleSubmit)}
                            >
                              {vowel}
                            </button>
                          </div>
                        ))
                      : phrases[hardPhase][stage].map((phrase, index) => (
                          <div key={index}>
                            <button
                              className="bg-[#e94d39] rounded-sm p-3 sm:p-4 md:p-5 lg:p-7 text-white font-medium text-xl"
                              onClick={() => handleClickWord(phrase, handleSubmit)}
                            >
                              {phrase}
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
            onClick={() => handleStart(phases, phase)}
          />
        )}
      </div>
    </div>
  );
};

export default Nivel7;
