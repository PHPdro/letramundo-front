"use client";
import { GameProvider } from "@/contexts/GameContext";
import { LevelTwoProvider } from "@/contexts/LevelTwoContext";
import { useAuth } from "@/hooks/auth/useAuth";
import ReactQueryProvider from "@/utils/reactquery";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useRef, useState, useEffect, useCallback } from "react";

const THEME_MUSIC: Record<string, string> = {
  alimentos: "/audios/mus_alimentos.mp3",
  animais: "/audios/mus_animais.mp3",
  cowboy: "/audios/mus_cowboy.mp3",
  praia: "/audios/mus_praia.mp3",
};

const DEFAULT_MUSIC = "/audios/mus_plataforma.mp3";

function getMusicSrc(pathname: string): string {
  const segments = pathname.split("/");
  const themeIndex = segments.findIndex((s) => /^nivel\d+$/.test(s));
  if (themeIndex !== -1 && segments[themeIndex + 1]) {
    const theme = segments[themeIndex + 1];
    if (THEME_MUSIC[theme]) return THEME_MUSIC[theme];
  }
  return DEFAULT_MUSIC;
}

export default function RoutesLayout({ children }: PropsWithChildren) {
  const isAuthenticated = useAuth();
  const pathname = usePathname();
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const musicSrc = getMusicSrc(pathname);

  useEffect(() => {
    const audio = bgMusicRef.current;
    if (!audio || !hasStarted) return;
    if (audio.src.endsWith(musicSrc)) return;
    audio.src = musicSrc;
    audio.load();
    audio.volume = 0.1;
    audio.play().catch(() => {});
  }, [musicSrc, hasStarted]);

  const startMusic = useCallback(() => {
    if (hasStarted) return;
    const audio = bgMusicRef.current;
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(() => {});
      setHasStarted(true);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      document.addEventListener("click", startMusic, { once: true });
      return () => document.removeEventListener("click", startMusic);
    }
  }, [hasStarted, startMusic]);

  const toggleMute = () => {
    const audio = bgMusicRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isAuthenticated) {
    return <Spin />;
  }

  return (
    <div>
      <audio ref={bgMusicRef} src={musicSrc} loop />
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? (
          <MutedOutlined style={{ fontSize: 24, color: "#f4a460" }} />
        ) : (
          <SoundOutlined style={{ fontSize: 24, color: "#f4a460" }} />
        )}
      </button>
      <ReactQueryProvider>
        <GameProvider>
          <LevelTwoProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </LevelTwoProvider>
        </GameProvider>
      </ReactQueryProvider>
    </div>
  );
}
