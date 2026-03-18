import Link from "next/link";
import Image from "next/image";

export const EmptyTable = () => {
  return (
    <div>
      <div className="flex items-center px-4 md:px-16 lg:px-48 min-h-[70vh] max-w-screen-2xl mx-auto gap-8 md:gap-16 lg:gap-32">
        <div className="hidden lg:flex p-8 w-full max-w-md items-center justify-center flex-col">
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
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold">Bem vindo(a)!</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-normal">Comece cadastrando seu primeiro aluno.</p>
          <Link href={"/novoaluno"}>
            <button className="bg-primary text-white p-2 text-lg rounded-lg w-full">
              Adicionar aluno(a)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
