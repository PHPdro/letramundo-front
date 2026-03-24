import React from "react";

// ── Shared mock implementations (used via require() in jest.mock factories) ──

export const mockAvatar = {
  Avatar: () => <div data-testid="avatar">Avatar</div>,
};

export const mockBackButton = {
  BackButton: ({ url, color }: { url: string; color: string }) => (
    <a data-testid="back-button" href={url} data-color={color}>
      Voltar
    </a>
  ),
};

export const mockConfetti = (props: any) => (
  <div data-testid="confetti" {...props} />
);

export const mockNextNavigation = {
  useRouter: () => ({ push: jest.fn() }),
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
};

export const mockNextNavigationSimple = {
  notFound: jest.fn(),
};

export const mockNextImage = (props: any) => <img {...props} />;

export const mockReactQuery = {
  useMutation: () => ({ mutate: jest.fn() }),
};

export const mockProgress = {
  studentProgress: jest.fn(),
};

export const mockGetImage = {
  getImage: (_theme: string, letter: string) => `/mock/${letter}.png`,
};

// ── Context factories ──

export function createGamePlayContext(
  overrides: Record<string, any> = {},
) {
  return {
    audioRef: { current: null },
    audioRefFeedBack: { current: null },
    start: false,
    setStart: jest.fn(),
    stage: 0,
    setStage: jest.fn(),
    phase: 1,
    setPhase: jest.fn(),
    progress: 0,
    setProgress: jest.fn(),
    isCorrect: false,
    setIsCorrect: jest.fn(),
    currentVowel: { key: 1, letter: "VA", sound: "/audios/va.mp3" },
    setCurrentVowel: jest.fn(),
    student: { id: 1, name: "Test" },
    setStudent: jest.fn(),
    hardPhase: 0,
    setHardPhase: jest.fn(),
    handleStart: jest.fn(),
    handleClickLetter: jest.fn(),
    handleClick: jest.fn(),
    getStudentFromLocalStorage: jest.fn(),
    handleClickWord: jest.fn(),
    targetLetters: ["X", "Y"],
    setTargetLetters: jest.fn(),
    correctStates: [false, false],
    setCorrectStates: jest.fn(),
    changePhaseState: jest.fn(),
    ...overrides,
  };
}

export function createGamePlayEasyContext(
  overrides: Record<string, any> = {},
) {
  return {
    audioRef: { current: null },
    audioRefFeedBack: { current: null },
    start: false,
    setStart: jest.fn(),
    stage: 0,
    setStage: jest.fn(),
    phase: 1,
    setPhase: jest.fn(),
    progress: 0,
    setProgress: jest.fn(),
    isCorrect: false,
    setIsCorrect: jest.fn(),
    currentVowel: { key: 1, letter: "A", sound: "/audios/letra-a.mp3" },
    setCurrentVowel: jest.fn(),
    firstLetterCorrect: false,
    setFirstLetterCorrect: jest.fn(),
    secondLetterCorrect: false,
    setSecondLetterCorrect: jest.fn(),
    thirdLetterCorrect: false,
    setThirdLetterCorrect: jest.fn(),
    student: { id: 1, name: "Test" },
    setStudent: jest.fn(),
    hardPhase: 0,
    setHardPhase: jest.fn(),
    handleStart: jest.fn(),
    handleClickLetter: jest.fn(),
    handleClick: jest.fn(),
    getStudentFromLocalStorage: jest.fn(),
    hardVowels: [
      [
        { key: 2, letter: "U", sound: "/audios/letra-u.mp3" },
        { key: 3, letter: "I", sound: "/audios/letra-i.mp3" },
        { key: 4, letter: "O", sound: "/audios/letra-o.mp3" },
      ],
    ],
    changePhaseState: jest.fn(),
    targetLetters: ["O", "I"],
    correctStates: [false, false],
    editStudent: null,
    setEditStudent: jest.fn(),
    ...overrides,
  };
}

// ── Helper to get the notFound mock ──

export function getNotFoundMock() {
  return jest.requireMock("next/navigation").notFound;
}
