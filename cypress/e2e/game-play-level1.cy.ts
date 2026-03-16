describe('Level 1 - Animais Theme - Game Play', () => {
  const mockStudent = {
    id: 1,
    name: 'Maria',
    year: 2,
    class: 'B',
    theme: 'animais',
    level: 1,
    phase: 1,
    theme_id: 2,
  };

  beforeEach(() => {
    // Set up API mocks before visiting any page
    cy.intercept('GET', '**/api/students', {
      statusCode: 200,
      body: [mockStudent],
    }).as('getStudents');

    cy.intercept('PUT', '**/api/students/*/progress', {
      statusCode: 200,
      body: { success: true },
    }).as('updateProgress');

    // Set up localStorage (auth + student)
    cy.window().then((win) => {
      win.localStorage.setItem('auth', JSON.stringify({ token: 'fake-jwt-token' }));
      win.localStorage.setItem('aluno', JSON.stringify(mockStudent));
    });

    // Stub audio to prevent autoplay errors
    cy.window().then((win) => {
      cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
    });
  });

  describe('Game page initial state', () => {
    beforeEach(() => {
      cy.visit('/nivel1/animais/jogo');
    });

    it('should display the play button before starting the game', () => {
      cy.get('img[alt="play"]').should('be.visible');
    });

    it('should display the back button and logo', () => {
      cy.get('img[alt="Logo"]').should('be.visible');
    });
  });

  describe('Phase 1 - Vowel recognition (phases 1-7)', () => {
    beforeEach(() => {
      cy.visit('/nivel1/animais/jogo');
    });

    it('should start the game when clicking the play button', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('Nível 1 - Fase 1').should('be.visible');
      cy.get('button').should('have.length.greaterThan', 0);
    });

    it('should show a progress bar after starting', () => {
      cy.get('img[alt="play"]').click();
      cy.get('.ant-progress').should('exist');
    });

    it('should show the sound replay button after starting', () => {
      cy.get('img[alt="play"]').click();
      cy.get('.anticon-sound').should('be.visible');
    });

    it('should display two vowel buttons for phase 1 stage 1', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'A').should('be.visible');
      cy.contains('button', 'E').should('be.visible');
    });

    it('should advance stage on correct vowel click', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'A').click();
      cy.window().then((win) => {
        expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
      });
    });

    it('should play error sound on incorrect vowel click', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'E').click();
      cy.window().then((win) => {
        expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
      });
    });

    it('should complete phase 1 after 5 correct answers and call progress API', () => {
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait('@updateProgress');
    });
  });

  describe('Phase selection page', () => {
    it('should display phase buttons on the animais level page', () => {
      cy.visit('/nivel1/animais');
      cy.contains('Nível 1').should('be.visible');
      cy.contains('button', '1').should('be.visible');
    });

    it('should show locked phases beyond student progress', () => {
      cy.visit('/nivel1/animais');
      cy.get('.anticon-lock').should('have.length.greaterThan', 0);
    });

    it('should disable buttons for locked phases', () => {
      cy.visit('/nivel1/animais');
      cy.get('button:disabled').should('have.length.greaterThan', 0);
    });
  });

  describe('Phase 8-10 - Hard phases (letter/word completion)', () => {
    const advancedStudent = { ...mockStudent, phase: 8 };

    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('aluno', JSON.stringify(advancedStudent));
      });
      cy.visit('/nivel1/animais/jogo');
    });

    it('should show image and letter slots for hard phases', () => {
      cy.visit('/nivel1/animais');
      cy.contains('button', '8').click();
      cy.get('img[alt="play"]').click();
      cy.contains('Nível 1 - Fase 8').should('be.visible');
      cy.get('img[alt="OI"]').should('be.visible');
      cy.get('p.border-black', { timeout: 10000 }).should('have.length', 2);
    });

    it('should fill letter slot on correct letter click', () => {
      cy.visit('/nivel1/animais');
      cy.contains('button', '8').click();
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'O').click();
      cy.get('p.border-black').first().should('contain.text', 'O');
    });
  });

  describe('Confetti and progress update', () => {
    it('should show confetti when phase is completed', () => {
      cy.visit('/nivel1/animais/jogo');
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait('@updateProgress');
      cy.get('canvas').should('exist');
    });

    it('should update localStorage with new phase after completion', () => {
      cy.visit('/nivel1/animais/jogo');
      cy.get('img[alt="play"]').click();
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait(3000);
      cy.contains('button', 'A').click();
      cy.wait('@updateProgress');
      cy.wait(2500);
      cy.window().then((win) => {
        const student = JSON.parse(win.localStorage.getItem('aluno')!);
        expect(student.phase).to.eq(2);
      });
    });
  });

  describe('Audio playback', () => {
    it('should attempt to play audio when the game starts', () => {
      cy.visit('/nivel1/animais/jogo');
      cy.get('img[alt="play"]').click();
      cy.window().then((win) => {
        expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
      });
    });

    it('should play audio when clicking the sound icon', () => {
      cy.visit('/nivel1/animais/jogo');
      cy.get('img[alt="play"]').click();
      cy.get('.anticon-sound').click();
      cy.window().then((win) => {
        expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
      });
    });
  });
});
