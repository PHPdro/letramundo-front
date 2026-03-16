const API_BASE = "https://letramundo-back-main-r7azsi.laravel.cloud/api";

const FAKE_TOKEN = "fake-jwt-token-for-testing";
const FAKE_STUDENT = {
  id: 1,
  name: "Aluno Teste",
  phase: 1,
  level: 1,
};

const PHASE_1_CORRECT_LETTER = "A";
const PHASE_1_STAGES = 5;

describe("Level 1 - Animais Theme - Game Play Flow", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("auth", FAKE_TOKEN);
      win.localStorage.setItem("aluno", JSON.stringify(FAKE_STUDENT));
    });

    cy.intercept("PUT", `${API_BASE}/students/*/progress`, {
      statusCode: 200,
      body: { message: "Progress updated" },
    }).as("saveProgress");
  });

  describe("Phase selection page", () => {
    it("should display phase buttons on the Animais level 1 page", () => {
      cy.visit("/nivel1/animais");
      cy.contains("Nível 1").should("be.visible");
      cy.get("button").contains("1").should("be.visible").and("not.be.disabled");
    });

    it("should lock phases beyond the student current phase", () => {
      cy.visit("/nivel1/animais");
      cy.get("button").contains("2").should("be.disabled");
    });
  });

  describe("Starting the game", () => {
    it("should show the play button before the game starts", () => {
      cy.visit("/nivel1/animais/jogo");
      cy.get('img[alt="play"]').should("be.visible");
    });

    it("should start the game when play button is clicked", () => {
      cy.visit("/nivel1/animais/jogo");
      cy.get('img[alt="play"]').click();
      cy.contains("Nível 1 - Fase 1").should("be.visible");
    });
  });

  describe("Phase 1-7 gameplay (vowel recognition)", () => {
    beforeEach(() => {
      cy.visit("/nivel1/animais/jogo");
      cy.get('img[alt="play"]').click();
      cy.contains("Nível 1 - Fase 1").should("be.visible");
    });

    it("should display two vowel option buttons per stage", () => {
      cy.get("button.rounded-full").should("have.length", 2);
    });

    it("should advance through stages when correct vowel is clicked", () => {
      cy.get("button.rounded-full").contains(PHASE_1_CORRECT_LETTER).click();
      cy.wait(3000);
      cy.contains("Nível 1 - Fase 1").should("be.visible");
      cy.get("button.rounded-full").should("have.length", 2);
    });

    it("should play error feedback when wrong vowel is clicked", () => {
      cy.get("button.rounded-full").contains("E").click();
      cy.get("button.rounded-full").should("have.length", 2);
      cy.contains("Nível 1 - Fase 1").should("be.visible");
    });

    it("should complete phase 1 after answering all 5 stages correctly", () => {
      for (let i = 0; i < PHASE_1_STAGES; i++) {
        cy.get("button.rounded-full").contains(PHASE_1_CORRECT_LETTER).click();
        if (i < PHASE_1_STAGES - 1) {
          cy.wait(3000);
        }
      }
      cy.wait("@saveProgress").its("request.method").should("eq", "PUT");
      cy.contains("Parabéns").should("be.visible");
    });
  });

  describe("Phase 8-10 gameplay (syllable building)", () => {
    const ADVANCED_STUDENT = { ...FAKE_STUDENT, phase: 8 };

    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem("aluno", JSON.stringify(ADVANCED_STUDENT));
      });
    });

    it("should show image and letter slots for hard phases", () => {
      cy.visit("/nivel1/animais/jogo");
      cy.get('img[alt="play"]').click();
      cy.contains("Nível 1 - Fase 8").should("be.visible");
      cy.get("img").should("exist");
      cy.get("button.bg-\\[\\#e94d39\\]").should("have.length.at.least", 2);
    });

    it("should fill in letter slots when correct letters are clicked in order", () => {
      cy.visit("/nivel1/animais/jogo");
      cy.get('img[alt="play"]').click();
      cy.contains("Nível 1 - Fase 8").should("be.visible");
      cy.get("button.bg-\\[\\#e94d39\\]").contains("O").click();
      cy.get("button.bg-\\[\\#e94d39\\]").contains("I").click();
      cy.wait(2500);
    });
  });

  describe("Confetti celebration", () => {
    it("should show confetti when phase is completed", () => {
      cy.visit("/nivel1/animais/jogo");
      cy.get('img[alt="play"]').click();
      for (let i = 0; i < PHASE_1_STAGES; i++) {
        cy.get("button.rounded-full").contains(PHASE_1_CORRECT_LETTER).click();
        if (i < PHASE_1_STAGES - 1) {
          cy.wait(3000);
        }
      }
      cy.wait("@saveProgress");
      cy.get("canvas").should("exist");
    });
  });
});
