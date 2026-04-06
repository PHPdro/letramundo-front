"use client";
import Image from "next/image";

const AVATARS = Array.from({ length: 13 }, (_, i) => `/avatares/avatar-${i + 1}.png`);

interface AvatarSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const AvatarSelector = ({ value, onChange }: AvatarSelectorProps) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
      {AVATARS.map((avatar) => (
        <div
          key={avatar}
          onClick={() => onChange?.(avatar)}
          className={`cursor-pointer rounded-full p-1 flex items-center justify-center transition-all ${
            value === avatar ? "border-primary scale-110" : "border-transparent hover:border-gray-300"
          }`}
          style={{ borderWidth: 3, borderStyle: "solid" }}
        >
          <Image
            src={avatar}
            alt="Avatar"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
