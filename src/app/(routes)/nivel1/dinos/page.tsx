"use client";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";
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
    <div className="h-screen bg-[#b6d5f0]">
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
      <div className="absolute right-64 top-72 flex flex-col justify-center align-middle gap-8 z-10 items-end">
        <button className="flex justify-center items-center bg-white p-11 rounded-full w-[110px] h-[110px] text-center font-medium text-2xl">
          A
        </button>
        <button className="flex justify-center items-center bg-white p-11 rounded-full w-[110px] h-[110px] text-center font-medium text-2xl">
          U
        </button>
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
