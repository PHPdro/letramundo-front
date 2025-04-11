"use client";
import React, { useEffect, useRef } from "react";
import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";

const Nivel1 = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = true;
        console.log("Audio element found");
        audio.play().catch((err) => {
          console.error("Autoplay failed:", err);
        });
      }
    }
  }, []);
  return (
    <div className="h-screen bg-[#b6d5f0]">
      <audio ref={audioRef} hidden>
        <source src="/audios/a.m4a" type="audio/mpeg" />
      </audio>
      <div className="p-10">
        <div className="flex justify-start">
          <Link href="/inicio">
            <Image src="/back-blue.svg" alt="background" className="object-cover" width={45} height={45} />
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div>
          <Progress percent={100} showInfo={false} size={[400, 20]} />
        </div>
      </div>
      <div className="absolute right-64 top-72 flex flex-col justify-center align-middle gap-8 z-10 items-end">
        <button className="bg-white rounded-full p-11 text-center font-medium text-2xl">A</button>
        <button className="bg-white rounded-full p-11 text-center font-medium text-2xl">U</button>
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
