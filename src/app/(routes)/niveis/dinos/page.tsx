import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";

const Niveis = () => {
  return (
    <div className="h-screen bg-[#b6d5f0]">
      <div className="flex flex-col h-screen p-6">
        <div className="flex justify-between z-10">
          <BackButton color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-3xl font-medium text-center text-white mb-10">Bem vindo, usuário!</h1>
        <div className="grid grid-cols-4 gap-8 z-10 items-center max-w-[400px] mx-auto">
          {Array.from({ length: 10 }, (_, index) => (
            <p
              className="bg-[#f8fafc] w-[70px] h-[65px] p-2 rounded-full text-center items-center flex justify-center font-mono"
              key={index}
            >
              {index + 1}
            </p>
          ))}
        </div>
      </div>
      <div>
        <img
          src="/arvore.webp"
          alt="arvore.webp"
          className="md:hidden lg:block absolute bottom-52 right-20 w-[366px] h-[425px] object-cover"
        />
        <img src="/matos.svg" alt="Matos" className="absolute bottom-0 w-full h-[350px] object-cover" />
        <img
          src="/dino-roxo.svg"
          alt="dino roxo"
          className="absolute bottom-20 right-20 w-[162px] h-[154px] object-cover"
        />
        <img
          src="/dino-azul.svg"
          alt="dino azul"
          className="absolute bottom-20 left-20 w-[257px] h-[212px] object-cover"
        />
      </div>
    </div>
  );
};

export default Niveis;
