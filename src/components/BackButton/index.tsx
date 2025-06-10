import Link from "next/link";
import Image from "next/image";

interface BackButtonProps {
  color: "blue" | "red" | "orange";
  url?: string;
}

export const BackButton = ({ color, url }: BackButtonProps) => {
  return (
    <Link href={`/${url}`}>
      <Image
        src={`/back-${color}.svg`}
        alt="Botão para voltar"
        className="object-cover z-10"
        width={45}
        height={45}
      />
    </Link>
  );
};
