import { render, screen, fireEvent } from "@testing-library/react";
import Nivel3 from "../page";
import { phases } from "../../../../nivel3/phases";
import {
  createGamePlayContext,
  getNotFoundMock,
} from "@/test/jogo-test-utils";

jest.mock("@/components/Avatar", () => require("@/test/jogo-test-utils").mockAvatar);
jest.mock("@/components/BackButton", () => require("@/test/jogo-test-utils").mockBackButton);
jest.mock("react-confetti", () => require("@/test/jogo-test-utils").mockConfetti);
jest.mock("next/navigation", () => require("@/test/jogo-test-utils").mockNextNavigation);
jest.mock("next/image", () => require("@/test/jogo-test-utils").mockNextImage);
jest.mock("@tanstack/react-query", () => require("@/test/jogo-test-utils").mockReactQuery);
jest.mock("@/api/progress", () => require("@/test/jogo-test-utils").mockProgress);
jest.mock("@/utils/getImage", () => require("@/test/jogo-test-utils").mockGetImage);

const defaultContext = createGamePlayContext({
  currentVowel: { key: 2, letter: "FA", sound: "/audios/fa.mp3" },
  targetLetters: ["F", "A"],
});
let ctxOverrides: Partial<typeof defaultContext> = {};

jest.mock("@/contexts/GamePlayContext", () => ({
  useGamePlay: () => ({ ...defaultContext, ...ctxOverrides }),
}));

const notFound = getNotFoundMock();

describe("Nivel3 Jogo Page", () => {
  beforeEach(() => {
    ctxOverrides = {};
    jest.clearAllMocks();
  });

  it("calls notFound for invalid theme", () => {
    expect(() => render(<Nivel3 params={{ theme: "invalid" }} />)).toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("renders play button when not started", () => {
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    expect(screen.getByAltText("play")).toBeInTheDocument();
    expect(screen.queryByText(/Nível 3 - Fase/)).not.toBeInTheDocument();
  });

  it("renders layout elements", () => {
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    const backButton = screen.getByTestId("back-button");
    expect(backButton).toHaveAttribute("href", "nivel3/alimentos");
  });

  it("calls handleStart on play click", () => {
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    fireEvent.click(screen.getByAltText("play"));
    expect(defaultContext.handleStart).toHaveBeenCalledWith(phases, 1);
  });

  it("calls getStudentFromLocalStorage on mount", () => {
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    expect(defaultContext.getStudentFromLocalStorage).toHaveBeenCalledTimes(1);
  });

  it("renders game UI in early phase (syllable buttons)", () => {
    ctxOverrides = { start: true, phase: 1 };
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    expect(screen.getByText("Nível 3 - Fase 1")).toBeInTheDocument();
    expect(screen.getByText("FA")).toBeInTheDocument();
    expect(screen.getByText("VA")).toBeInTheDocument();
  });

  it("renders game UI in late phase (letter grid)", () => {
    ctxOverrides = { start: true, phase: 3 };
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    expect(screen.getByText("Nível 3 - Fase 3")).toBeInTheDocument();
    const letters = ["U", "A", "F", "O", "E", "I", "V"];
    letters.forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  it("shows Confetti when isCorrect is true", () => {
    ctxOverrides = { isCorrect: true };
    render(<Nivel3 params={{ theme: "alimentos" }} />);
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });
});
