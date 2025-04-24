"use client";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";

const Nivel2 = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [start, setStart] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const percent = (audio.currentTime / audio.duration) * 120;
      setProgress(percent);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = audioRef.current;
      if (audio) {
        if (start) {
          audio
            .play()
            .then(() => {
              updateProgress();
              audio.addEventListener("timeupdate", updateProgress);
              audio.addEventListener("ended", () => {
                setProgress(0);
                audio.currentTime = 0;
                audio.pause();
                setStart(false);
              });
            })
            .catch((err) => {
              console.error("Autoplay failed:", err);
            });
        }
      }
    }
  }, [start]);
  return (
    <div className="h-screen bg-[#b6d5f0]">
      <div className="pl-10 pt-10">
        <div className="flex justify-start">
          <Link href="/inicio">
            <Image src="/back-blue.svg" alt="background" className="object-cover" width={45} height={45} />
          </Link>
        </div>
      </div>
      <div className="absolute left-8 top-24 bg-white w-[90px] h-[90px] rounded-full border-primary border-2 flex justify-center items-center">
        <Image
          src="/avatar.png"
          alt="background"
          className="w-[80px] h-[80px] rounded-full object-cover z-10"
          width={80}
          height={80}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="relative flex flex-col bg-white rounded-3xl lg:h-[650px] md:h-[600px] w-[70%] m-3 p-5 z-10">
          {start ? (
            <div>
              <div className="flex flex-col justify-center items-center w-full">
                <div>
                  <Progress percent={progress} showInfo={false} size={[400, 20]} />
                </div>
                <div className="flex justify-center flex-col items-center w-full">
                  <img
                    src="/uva.svg"
                    alt="uva"
                    className="object-cover lg:h-[164px] md:h-[74px] lg:w-[124px] md:w-[60px] z-0 mt-2"
                  />
                  <div className="flex flex-row mt-8 gap-3">
                    <p className="border-[1px] border-black lg:p-7 md:p-3 rounded-sm text-xl">U</p>
                    <p className="border-[1px] border-black lg:p-7 md:p-3 p-7 rounded-sm text-xl">V</p>
                    <p className="border-[1px] border-black lg:p-7 md:p-3 p-7 rounded-sm text-xl">A</p>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-6 md:grid-cols-3 items-center align-middle lg:px-32 md:px-8 mt-10 gap-14">
                <div>
                  <button className="bg-purple rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl">
                    U
                  </button>
                </div>
                <div>
                  <button className="bg-purple rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl mt-10">
                    S
                  </button>
                </div>
                <div>
                  <button className="bg-purple rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl mt-6">
                    V
                  </button>
                </div>
                <div>
                  <button className="bg-purple rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl">
                    G
                  </button>
                </div>
                <div>
                  <button className="bg-purple rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl mt-14">
                    C
                  </button>
                </div>
                <div>
                  <button className="bg-purple rounded-sm lg:p-7 md:p-5 text-white font-medium text-xl">
                    A
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <Image
                src="/play.svg"
                alt="play"
                className="object-cover"
                width={100}
                height={100}
                onClick={() => setStart(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          src="/arvores.svg"
          alt="painel de fundo com árvores"
          className="absolute bottom-0 object-cover z-0"
        />
        <img
          src="/dino-azul-pintado.svg"
          alt="dino azul"
          className="absolute bottom-12 left-20 w-[300px] h-[262px] object-cover z-20"
        />
        <img
          src="/dino-vermelho.svg"
          alt="dino vermelho"
          className="absolute bottom-12 right-5 w-[280px] h-[222px] object-cover z-20"
        />
      </div>
    </div>
  );
};

export default Nivel2;
