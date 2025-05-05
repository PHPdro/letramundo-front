import { Avatar } from "@/components/Avatar";
import { BackButton } from "@/components/BackButton";

const Animais = () => {
  return (
    <div className="h-screen bg-[#b6d5f0]">
      <div className="flex flex-col h-screen p-6">
        <div className="flex justify-between z-10">
          <BackButton color="blue" />
          <img src="/logo-transparente.png" alt="Logo" className=" z-10 w-[67px] h-[50px]" />
          <Avatar />
        </div>
        <h1 className="text-3xl font-medium text-center text-white mb-10 z-10">Bem vindo, usuário!</h1>
        <div className="grid grid-cols-4 gap-8 z-10 items-center max-w-[400px] mx-auto">
          {Array.from({ length: 10 }, (_, index) => (
            <p
              className="bg-[#f8fafc] w-[70px] h-[65px] p-2 rounded-full text-center items-center flex justify-center font-mono cursor-pointer"
              key={index}
            >
              {index + 1}
            </p>
          ))}
        </div>
      </div>
      <img
        src="/animais-bg-niveis.png"
        alt="Animais de tema de fundo"
        className="absolute bottom-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Animais;
