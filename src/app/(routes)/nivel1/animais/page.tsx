"use client";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "antd";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";
import { Avatar } from "@/components/Avatar";

const Nivel1 = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [start, setStart] = useState(false);
  const [progress, setProgress] = useState(0);

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
  }, [start]);
  return (
    <div className="h-screen bg-[#b6d5f0] bgAnimaisJogo">
      {/* <audio ref={audioRef}>
        <source src="/audios/a.m4a" type="audio/mpeg" />
      </audio> */}
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
            <Progress percent={progress} showInfo={false} size={[400, 20]} />
            <div className="absolute lg:left-64 lg:top-72 md:left-20 md:top-96 flex flex-col justify-center align-middle gap-12 z-10 items-start">
              <button className="flex justify-center items-center bg-white p-11 rounded-full w-[100%] h-[100%] text-center font-medium text-4xl">
                A
              </button>
              <button className="flex justify-center items-center bg-white p-11 rounded-full w-[100%] h-[100%] text-center font-medium text-4xl">
                U
              </button>
            </div>
          </div>
        ) : (
          <Image
            src="/play.svg"
            alt="play"
            className="object-cover"
            width={100}
            height={100}
            onClick={() => setStart(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Nivel1;
