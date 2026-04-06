import Image from "next/image";

export const Avatar = ({ src }: { src?: string }) => {
  return (
    <div className="bg-white w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] rounded-full border-primary border-2 flex justify-center items-center">
      <Image
        src={src || "/avatar.png"}
        alt="Avatar do usuário"
        className="w-[42px] h-[42px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] rounded-full object-cover"
        width={80}
        height={80}
      />
    </div>
  );
};
