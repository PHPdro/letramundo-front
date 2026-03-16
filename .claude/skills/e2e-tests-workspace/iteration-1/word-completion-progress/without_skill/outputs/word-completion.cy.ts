const API_BASE = "https://letramundo-back-main-r7azsi.laravel.cloud/api";

const mockStudent = {
  id: 42,
  name: "Test Student",
  phase: 8,
  level: 1,
};

const authToken = "fake-jwt-token-for-testing";

const phase8Words = ["OI", "UI", "OU"];
const phase9Words = ["EI", "AU", "EU"];
const phase10Words = ["AI", "UAU", "UAI"];

function setupAuthAndStudent(student: typeof mockStudent) {
  cy.window().then((win) => {
    win.localStorage.setItem("auth", authToken);
    win.localStorage.setItem("aluno", JSON.stringify(student));
  });
}

function interceptProgressApi(alias = "saveProgress") {
  cy.intercept("PUT", `${API_BASE}/students/${mockStudent.id}/progress`, {
    statusCode: 200,
    body: { message: "Progress updated" },
  }).as(alias);
}

function clickPlay() {
  cy.get('img[alt="play"]').should("be.visible").click();
}

function spellWord(word: string) {
  const letters = word.split("");
  letters.forEach((letter) => {
    cy.contains("button", letter).click();
  });
}

function completePhaseStages(words: string[]) {
  words.forEach((word, index) => {
    spellWord(word);
    if (index < words.length - 1) {
      cy.wait(2500);
    }
  });
}

describe("Phases 8-10: Word Completion and Progress Saving", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      cy.stub(win.HTMLAudioElement.prototype, "play").resolves();
      cy.stub(win.HTMLAudioElement.prototype, "load").returns(undefined);
    });
  });

  describe("Phase 8 - Two-letter word completion (OI, UI, OU)", () => {
    beforeEach(() => {
      const student = { ...mockStudent, phase: 8 };
      setupAuthAndStudent(student);
      interceptProgressApi("saveProgressPhase8");
      cy.visit("/nivel1/animais/jogo");
    });

    it("should display the word completion UI when phase 8 starts", () => {
      clickPlay();
      cy.contains("Nível 1 - Fase 8").should("be.visible");
      cy.get("div.bg-white.rounded-3xl").should("exist");
      cy.get('button[class*="bg-[#e94d39]"]').should("have.length.gte", 3);
      cy.get('p[class*="border-black"]').should("have.length", 2);
    });

    it("should fill in letter slots when correct letters are clicked in order", () => {
      clickPlay();
      cy.contains("button", "O").click();
      cy.get('p[class*="border-black"]').first().should("contain.text", "O");
    });

    it("should not fill a slot when an incorrect letter is clicked", () => {
      clickPlay();
      cy.contains("button", "U").click();
      cy.get('p[class*="border-black"]').each(($el) => {
        cy.wrap($el).should("have.text", "");
      });
    });

    it("should complete phase 8 and save progress", () => {
      clickPlay();
      completePhaseStages(phase8Words);
      cy.wait("@saveProgressPhase8").then((interception) => {
        expect(interception.request.url).to.include(`students/${mockStudent.id}/progress`);
        expect(interception.request.method).to.equal("PUT");
      });
      cy.contains("Parabéns, você concluiu a fase!").should("be.visible");
    });

    it("should update localStorage with the next phase after completion", () => {
      clickPlay();
      completePhaseStages(phase8Words);
      cy.wait("@saveProgressPhase8");
      cy.wait(2500);
      cy.window().then((win) => {
        const stored = JSON.parse(win.localStorage.getItem("aluno") || "{}");
        expect(stored.phase).to.equal(9);
      });
    });
  });

  describe("Phase 9 - Two-letter word completion (EI, AU, EU)", () => {
    beforeEach(() => {
      const student = { ...mockStudent, phase: 9 };
      setupAuthAndStudent(student);
      interceptProgressApi("saveProgressPhase9");
      cy.visit("/nivel1/animais/jogo");
    });

    it("should display 5 letter buttons for phase 9", () => {
      clickPlay();
      cy.contains("Nível 1 - Fase 9").should("be.visible");
      cy.get('button[class*="bg-[#e94d39]"]').should("have.length", 5);
    });

    it("should complete phase 9 and save progress", () => {
      clickPlay();
      completePhaseStages(phase9Words);
      cy.wait("@saveProgressPhase9").then((interception) => {
        expect(interception.request.url).to.include(`students/${mockStudent.id}/progress`);
      });
      cy.contains("Parabéns, você concluiu a fase!").should("be.visible");
    });
  });

  describe("Phase 10 - Multi-letter word completion (AI, UAU, UAI)", () => {
    beforeEach(() => {
      const student = { ...mockStudent, phase: 10 };
      setupAuthAndStudent(student);
      interceptProgressApi("saveProgressPhase10");
      cy.visit("/nivel1/animais/jogo");
    });

    it("should handle 3-letter words (UAU, UAI) with 3 blank slots", () => {
      clickPlay();
      cy.get('p[class*="border-black"]').should("have.length", 2);
      spellWord("AI");
      cy.wait(2500);
      cy.get('p[class*="border-black"]').should("have.length", 3);
    });

    it("should complete phase 10 and save progress", () => {
      clickPlay();
      completePhaseStages(phase10Words);
      cy.wait("@saveProgressPhase10").then((interception) => {
        expect(interception.request.url).to.include(`students/${mockStudent.id}/progress`);
      });
      cy.contains("Parabéns, você concluiu a fase!").should("be.visible");
    });

    it("should update localStorage to phase 11 after completing phase 10", () => {
      clickPlay();
      completePhaseStages(phase10Words);
      cy.wait("@saveProgressPhase10");
      cy.wait(2500);
      cy.window().then((win) => {
        const stored = JSON.parse(win.localStorage.getItem("aluno") || "{}");
        expect(stored.phase).to.equal(11);
      });
    });
  });

  describe("Confetti celebration on phase completion", () => {
    it("should display confetti animation after completing a phase", () => {
      const student = { ...mockStudent, phase: 8 };
      setupAuthAndStudent(student);
      interceptProgressApi("saveProgressConfetti");
      cy.visit("/nivel1/animais/jogo");
      clickPlay();
      completePhaseStages(phase8Words);
      cy.wait("@saveProgressConfetti");
      cy.get("canvas").should("exist");
    });
  });
});
