import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createStudent } from "@/api/student";
import NewStudent from "../page";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/components/Navbar", () => ({
  NavBar: () => <nav data-testid="navbar">NavBar</nav>,
}));

jest.mock("@/hooks/useGetThemes", () => ({
  useFetchThemes: () => ({
    themes: [
      { id: 1, name: "Alimentos" },
      { id: 2, name: "Animais" },
    ],
  }),
}));

jest.mock("@/api/student", () => ({
  createStudent: jest.fn(),
}));

const mockedCreateStudent = createStudent as jest.MockedFunction<typeof createStudent>;

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

async function selectAntdOption(label: string, optionText: string) {
  // Find the Select container by its label
  const selectInput = screen.getByLabelText(label);
  const selectContainer = selectInput.closest(".ant-select")!;
  const selector = selectContainer.querySelector(".ant-select-selector")!;

  // Open dropdown
  fireEvent.mouseDown(selector);

  // Click the option
  const option = await screen.findByText(optionText, { selector: ".ant-select-item-option-content" });
  fireEvent.click(option);
}

describe("NewStudent (novoaluno)", () => {
  it("renders form with all fields", () => {
    renderWithProviders(<NewStudent />);

    expect(screen.getByText("Cadastro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Série")).toBeInTheDocument();
    expect(screen.getByLabelText("Turma")).toBeInTheDocument();
    expect(screen.getByLabelText("Tema")).toBeInTheDocument();
  });

  it("renders navbar", () => {
    renderWithProviders(<NewStudent />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderWithProviders(<NewStudent />);

    expect(screen.getByRole("button", { name: /adicionar aluno/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<NewStudent />);

    fireEvent.submit(screen.getByRole("button", { name: /adicionar aluno/i }));

    await waitFor(() => {
      expect(screen.getByText("Digite o nome")).toBeInTheDocument();
    });
  });

  it("calls createStudent and navigates on success", async () => {
    mockedCreateStudent.mockResolvedValueOnce(undefined);
    renderWithProviders(<NewStudent />);

    // Fill all fields including Ant Design Selects
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Ana" } });
    await selectAntdOption("Série", "1ª");
    fireEvent.change(screen.getByLabelText("Turma"), { target: { value: "B" } });
    await selectAntdOption("Tema", "Alimentos");

    fireEvent.submit(screen.getByRole("button", { name: /adicionar aluno/i }));

    await waitFor(() => {
      expect(mockedCreateStudent).toHaveBeenCalledWith({
        name: "Ana",
        year: 1,
        class: "B",
        theme_id: 1,
      });
    });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/inicio");
    });
  });

  it("shows error message on failed creation", async () => {
    mockedCreateStudent.mockRejectedValueOnce(new Error("Fail"));
    renderWithProviders(<NewStudent />);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Ana" } });
    await selectAntdOption("Série", "2ª");
    fireEvent.change(screen.getByLabelText("Turma"), { target: { value: "B" } });
    await selectAntdOption("Tema", "Animais");

    fireEvent.submit(screen.getByRole("button", { name: /adicionar aluno/i }));

    await waitFor(() => {
      expect(screen.getByText("Erro ao cadastrar aluno(a)")).toBeInTheDocument();
    });
  });
});
