import Image from "next/image";

export const Avatar = () => {
  return (
    <div className="bg-white w-[90px] h-[90px] rounded-full border-primary border-2 flex justify-center items-center">
      <Image
        src="/avatar.png"
        alt="Avatar do usuário"
        className="w-[80px] h-[80px] rounded-full object-cover"
        width={80}
        height={80}
      />
    </div>
  );
};
