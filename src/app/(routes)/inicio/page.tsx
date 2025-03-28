"use client";
import { NavBar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex items-center px-48 min-h-[70vh] max-w-screen-2xl mx-auto gap-32">
        <div className="lg:flex sm:hidden md:hidden p-8 w-full max-w-md items-center justify-center flex-col">
          <Image
            src="/aviaozinho.svg"
            alt="Aviãozinho"
            width={81}
            height={63}
            className="relative left-[40%]"
          />
          <Image src="/garotinha.svg" alt="Garotinha" width={206} height={284} />
          <div className="bg-[#efa54f] w-full h-1" />
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-3xl font-semibold">Bem vindo(a)!</p>
          <p className="text-3xl font-normal">Comece cadastrando seu primeiro aluno.</p>
          <Link href={"/novoaluno"}>
            <button className="bg-primary text-white p-2 text-lg rounded-lg w-full">
              Adicionar aluno(a)
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-[#fbe5a5] absolute bottom-0 h-20 w-20 rounded-tr-full" />
        <div className="bg-[#f8a680] absolute bottom-0 left-[70px] h-16 w-32 rounded-t-full" />
      </div>
      <div className="flex justify-end">
        <div className="bg-[#f8a29e] absolute bottom-0 h-40 w-44 right-0 rounded-tl-full" />
      </div>
    </div>
  );
};

export default Home;
