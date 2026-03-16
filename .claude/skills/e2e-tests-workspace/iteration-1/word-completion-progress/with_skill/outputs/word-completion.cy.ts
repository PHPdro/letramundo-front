/**
 * E2E Tests: Student completes phases 8-10 (word completion) and progress is saved.
 *
 * Phases 8-10 in Level 1 present letter-combination words (OI, UI, OU, EI, AU, EU, AI, UAU, UAI).
 * The student sees an image and must click individual letters in the correct order to spell the word.
 * On completing all stages of a phase, progress is saved via PUT /students/:id/progress.
 */

describe('Phases 8-10 Word Completion and Progress Saving', () => {
  const mockStudent = {
    id: 1,
    name: 'Maria',
    year: 2,
    class: 'B',
    theme: 'animais',
    level: 1,
    phase: 8,
    theme_id: 2,
  };

  beforeEach(() => {
    cy.intercept('PUT', '**/students/*/progress', {
      statusCode: 200,
      body: { success: true },
    }).as('updateProgress');

    cy.intercept('GET', '**/api/students', {
      statusCode: 200,
      body: [mockStudent],
    }).as('getStudents');

    cy.window().then((win) => {
      win.localStorage.setItem('auth', JSON.stringify({ token: 'fake-jwt-token' }));
      win.localStorage.setItem('aluno', JSON.stringify(mockStudent));
    });

    cy.window().then((win) => {
      cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
    });
  });

  describe('Phase 8 - Word Completion (OI, UI, OU)', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('aluno', JSON.stringify({ ...mockStudent, phase: 8 }));
      });
      cy.visit('/nivel1/animais/jogo');
    });

    it('should display play button and start phase 8 on click', () => {
      cy.get('img[alt="play"]').should('be.visible');
      cy.get('img[alt="play"]').click();
      cy.contains('Nível 1 - Fase 8').should('be.visible');
      cy.get('img[src*="/animais/OI.png"]').should('be.visible');
      cy.get('p.border-black').should('have.length', 2);
      cy.contains('button', 'U').should('be.visible');
      cy.contains('button', 'I').should('be.visible');
      cy.contains('button', 'O').should('be.visible');
    });

    it('should fill letter slots when correct letters are clicked in order', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'O').click();
      cy.get('p.border-black').eq(0).should('contain.text', 'O');
      cy.contains('button', 'I').click();
      cy.get('p.border-black').eq(1).should('contain.text', 'I');
    });

    it('should not fill slot when wrong letter is clicked', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'U').click();
      cy.get('p.border-black').eq(0).should('have.text', '');
    });

    it('should advance through all stages and save progress on phase completion', () => {
      cy.get('img[alt="play"]').click();

      // Stage 0: Spell "OI"
      cy.contains('button', 'O').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);

      // Stage 1: Spell "UI"
      cy.get('img[src*="/animais/UI.png"]', { timeout: 5000 }).should('be.visible');
      cy.contains('button', 'U').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);

      // Stage 2: Spell "OU"
      cy.get('img[src*="/animais/OU.png"]', { timeout: 5000 }).should('be.visible');
      cy.contains('button', 'O').click();
      cy.contains('button', 'U').click();

      cy.wait('@updateProgress', { timeout: 10000 });
      cy.get('canvas', { timeout: 5000 }).should('exist');
      cy.contains('Parabéns, você concluiu a fase!', { timeout: 5000 }).should('be.visible');
    });

    it('should update localStorage with new phase after completion', () => {
      cy.get('img[alt="play"]').click();

      cy.contains('button', 'O').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);
      cy.contains('button', 'U').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);
      cy.contains('button', 'O').click();
      cy.contains('button', 'U').click();

      cy.wait('@updateProgress', { timeout: 10000 });
      cy.wait(3000);

      cy.window().then((win) => {
        const student = JSON.parse(win.localStorage.getItem('aluno')!);
        expect(student.phase).to.eq(9);
      });
    });
  });

  describe('Phase 9 - Word Completion (EI, AU, EU)', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('aluno', JSON.stringify({ ...mockStudent, phase: 9 }));
      });
      cy.visit('/nivel1/animais/jogo');
    });

    it('should start phase 9 and show correct image and buttons', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('Nível 1 - Fase 9').should('be.visible');
      cy.get('img[src*="/animais/EI.png"]').should('be.visible');
      cy.contains('button', 'A').should('be.visible');
      cy.contains('button', 'U').should('be.visible');
      cy.contains('button', 'I').should('be.visible');
      cy.contains('button', 'O').should('be.visible');
      cy.contains('button', 'E').should('be.visible');
    });

    it('should complete phase 9 and save progress', () => {
      cy.get('img[alt="play"]').click();

      cy.contains('button', 'E').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);

      cy.get('img[src*="/animais/AU.png"]', { timeout: 5000 }).should('be.visible');
      cy.contains('button', 'A').click();
      cy.contains('button', 'U').click();
      cy.wait(2500);

      cy.get('img[src*="/animais/EU.png"]', { timeout: 5000 }).should('be.visible');
      cy.contains('button', 'E').click();
      cy.contains('button', 'U').click();

      cy.wait('@updateProgress', { timeout: 10000 });
      cy.get('canvas', { timeout: 5000 }).should('exist');
      cy.contains('Parabéns, você concluiu a fase!', { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Phase 10 - Word Completion (AI, UAU, UAI)', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('aluno', JSON.stringify({ ...mockStudent, phase: 10 }));
      });
      cy.visit('/nivel1/animais/jogo');
    });

    it('should start phase 10 and show correct image and buttons', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('Nível 1 - Fase 10').should('be.visible');
      cy.get('img[src*="/animais/AI.png"]').should('be.visible');
      cy.contains('button', 'A').should('be.visible');
      cy.contains('button', 'U').should('be.visible');
      cy.contains('button', 'E').should('be.visible');
      cy.contains('button', 'I').should('be.visible');
    });

    it('should handle 3-letter words (UAU, UAI) correctly', () => {
      cy.get('img[alt="play"]').click();

      cy.get('p.border-black').should('have.length', 2);
      cy.contains('button', 'A').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);

      cy.get('img[src*="/animais/UAU.png"]', { timeout: 5000 }).should('be.visible');
      cy.get('p.border-black').should('have.length', 3);
      cy.contains('button', 'U').click();
      cy.contains('button', 'A').click();
      cy.contains('button', 'U').click();
      cy.wait(2500);

      cy.get('img[src*="/animais/UAI.png"]', { timeout: 5000 }).should('be.visible');
      cy.get('p.border-black').should('have.length', 3);
      cy.contains('button', 'U').click();
      cy.contains('button', 'A').click();
      cy.contains('button', 'I').click();
    });

    it('should complete phase 10 and save final progress', () => {
      cy.get('img[alt="play"]').click();

      cy.contains('button', 'A').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);
      cy.contains('button', 'U').click();
      cy.contains('button', 'A').click();
      cy.contains('button', 'U').click();
      cy.wait(2500);
      cy.contains('button', 'U').click();
      cy.contains('button', 'A').click();
      cy.contains('button', 'I').click();

      cy.wait('@updateProgress', { timeout: 10000 });
      cy.get('canvas', { timeout: 5000 }).should('exist');
      cy.contains('Parabéns, você concluiu a fase!', { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Audio Playback During Word Completion', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('aluno', JSON.stringify({ ...mockStudent, phase: 8 }));
      });
      cy.visit('/nivel1/animais/jogo');
    });

    it('should play audio when game starts', () => {
      cy.get('img[alt="play"]').click();
      cy.window().then((win) => {
        expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
      });
    });

    it('should allow replaying audio via sound icon', () => {
      cy.get('img[alt="play"]').click();
      cy.get('.anticon-sound').should('be.visible').click();
      cy.window().then((win) => {
        expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
      });
    });
  });

  describe('Navigation After Phase Completion', () => {
    it('should redirect to theme selection page after phase completion', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('aluno', JSON.stringify({ ...mockStudent, phase: 8 }));
      });

      cy.visit('/nivel1/animais/jogo');
      cy.get('img[alt="play"]').click();

      cy.contains('button', 'O').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);
      cy.contains('button', 'U').click();
      cy.contains('button', 'I').click();
      cy.wait(2500);
      cy.contains('button', 'O').click();
      cy.contains('button', 'U').click();

      cy.wait('@updateProgress', { timeout: 10000 });
      cy.url({ timeout: 10000 }).should('include', '/nivel1/animais');
    });
  });
});
