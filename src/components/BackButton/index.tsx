import Link from "next/link";
import Image from "next/image";

interface BackButtonProps {
  color: "blue" | "red" | "orange";
}

export const BackButton = ({ color }: BackButtonProps) => {
  return (
    <Link href="/inicio">
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
