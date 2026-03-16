---
name: e2e-tests
description: "Write and run Cypress E2E tests for the LetraMundo app. Use this skill whenever the user wants to create, write, debug, or run end-to-end tests, integration tests, or Cypress tests. Also trigger when the user mentions testing game flows, testing login, testing levels, or wants to verify that a feature works in the browser."
---

# E2E Tests with Cypress

This skill helps write and run Cypress E2E tests for LetraMundo, a Next.js literacy education platform.

## Project Context

LetraMundo has 12 progressive game levels, each with 5 themes (Alimentos, Animais, Cowboy, Dinossauros, Praia). The app uses:
- **Next.js 14** (App Router) at `localhost:3000`
- **Ant Design 5** for UI components
- **JWT auth** stored in localStorage (`"auth"` key)
- **Student data** stored in localStorage (`"aluno"` key)
- **Laravel backend API** at the URL in `src/api/config.ts`

## Running Tests

```bash
# Open Cypress interactive runner
npx cypress open

# Run all tests headlessly
npx cypress run

# Run a specific spec file
npx cypress run --spec "cypress/e2e/game-play.cy.ts"
```

## Writing Tests

### File Location & Naming

Place all test files in `cypress/e2e/`. Use descriptive names with `.cy.ts` extension:
- `cypress/e2e/auth.cy.ts` — Login, registration, logout
- `cypress/e2e/student-management.cy.ts` — CRUD for students
- `cypress/e2e/game-play.cy.ts` — Game mechanics
- `cypress/e2e/level-navigation.cy.ts` — Level/phase selection

### API Mocking Strategy

Always mock API calls with `cy.intercept()` so tests are deterministic and don't depend on the backend. The backend base URL is in `src/api/config.ts`.

```typescript
// Mock login
cy.intercept('POST', '**/api/login', {
  statusCode: 200,
  body: { token: 'fake-jwt-token' }
}).as('login');

// Mock students list
cy.intercept('GET', '**/api/students', {
  statusCode: 200,
  body: [
    { id: 1, name: 'João', year: 1, class: 'A', theme: 'animais', level: 3, phase: 2, theme_id: 2 }
  ]
}).as('getStudents');

// Mock progress update
cy.intercept('PUT', '**/api/students/*/progress', {
  statusCode: 200,
  body: { success: true }
}).as('updateProgress');
```

### Auth Setup

Most pages are protected by the `useAuth()` hook, which checks localStorage for the `"auth"` token. Set it up before visiting protected routes:

```typescript
beforeEach(() => {
  // Set auth token to bypass login redirect
  window.localStorage.setItem('auth', JSON.stringify({ token: 'fake-jwt-token' }));
});
```

### Student Data Setup

Game pages read the current student from localStorage (`"aluno"` key):

```typescript
const mockStudent = {
  id: 1,
  name: 'Maria',
  year: 2,
  class: 'B',
  theme: 'animais',
  level: 3,
  phase: 5,
  theme_id: 2
};

beforeEach(() => {
  window.localStorage.setItem('aluno', JSON.stringify(mockStudent));
});
```

### Selecting Elements

The codebase doesn't have `data-testid` attributes, so use these strategies in order of preference:

1. **Add `data-testid`** to the component when you're also modifying the source code
2. **Text content**: `cy.contains('button', 'Entrar')`, `cy.contains('Nível 1')`
3. **Ant Design selectors**: `cy.get('.ant-btn')`, `cy.get('.ant-form-item')`
4. **Input types**: `cy.get('input[type="email"]')`, `cy.get('input[type="password"]')`
5. **CSS classes** (last resort, Tailwind classes may change)

### Audio Handling

Games use `<audio>` elements for feedback sounds. Stub `HTMLMediaElement.prototype.play` to avoid autoplay errors in tests:

```typescript
beforeEach(() => {
  cy.window().then((win) => {
    cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
  });
});
```

### Game Play Test Patterns

#### Phases 1-7 (Vowel/Syllable Recognition)

The game shows vowel/syllable buttons. The player must click the correct one matching the audio prompt.

```typescript
it('should advance stage on correct vowel click', () => {
  // Start the game by clicking the play button
  cy.get('img[alt*="play"]').click(); // or cy.contains('button', 'Iniciar')

  // Wait for audio to "play"
  cy.wait(500);

  // Click the correct vowel button
  cy.contains('button', 'A').click();

  // Verify progress bar updated
  cy.get('[role="progressbar"]').should('exist');
});
```

#### Phases 8-10 (Word/Phrase Completion)

An image appears and the player clicks letters in order to spell the word.

```typescript
it('should fill letter slots on correct letter click', () => {
  cy.get('img[alt*="play"]').click();

  // Image should be visible
  cy.get('img[src*="/animais/"]').should('be.visible');

  // Click letters in correct order
  cy.contains('button', 'G').click();
  cy.contains('button', 'A').click();
  cy.contains('button', 'T').click();
  cy.contains('button', 'O').click();

  // Verify completion (confetti or redirect)
});
```

### Confetti & Phase Completion

When a phase is completed, a confetti animation plays and the student's progress is updated via API. Test this by verifying:

```typescript
it('should show confetti and update progress on phase completion', () => {
  // ... complete all stages ...

  // Confetti canvas should appear
  cy.get('canvas').should('exist'); // react-confetti renders to canvas

  // Progress API should have been called
  cy.wait('@updateProgress').its('request.body').should('deep.include', {
    level: 3,
    phase: 6
  });
});
```

### Common Assertions

```typescript
// Verify navigation
cy.url().should('include', '/nivel1/animais/jogo');

// Verify localStorage was updated
cy.window().then((win) => {
  const student = JSON.parse(win.localStorage.getItem('aluno')!);
  expect(student.phase).to.eq(6);
});

// Verify sound played
cy.window().then((win) => {
  expect(win.HTMLMediaElement.prototype.play).to.have.been.called;
});
```

## Debugging Failing Tests

### Common Issues

1. **Auth redirect loop**: Ensure `localStorage` has `"auth"` token set before `cy.visit()`
2. **Element not found**: Ant Design renders async — use `cy.get(..., { timeout: 10000 })` for slow renders
3. **Audio autoplay blocked**: Stub `HTMLMediaElement.prototype.play` (see Audio Handling above)
4. **API calls not intercepted**: Ensure `cy.intercept()` is called BEFORE `cy.visit()`
5. **React hydration timing**: Add `cy.wait()` or use `cy.get().should('be.visible')` to wait for hydration

### Debugging Commands

```bash
# Run with browser visible
npx cypress run --headed

# Run specific test with Chrome
npx cypress run --spec "cypress/e2e/game-play.cy.ts" --browser chrome

# Open interactive runner for debugging
npx cypress open
```

### Reading Screenshots & Videos

Cypress saves screenshots on failure in `cypress/screenshots/` and videos in `cypress/videos/`. Check these to understand what the page looked like when the test failed.

## Cypress Config

The Cypress config file is at `cypress.config.ts` in the project root. Key settings:

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
  },
});
```

## Test Structure Template

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // 1. Set up API mocks
    cy.intercept('GET', '**/api/students', { body: [] }).as('getStudents');

    // 2. Set up localStorage (auth + student)
    cy.window().then((win) => {
      win.localStorage.setItem('auth', JSON.stringify({ token: 'fake-jwt' }));
      win.localStorage.setItem('aluno', JSON.stringify(mockStudent));
    });

    // 3. Stub audio
    cy.window().then((win) => {
      cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
    });

    // 4. Visit page
    cy.visit('/nivel1/animais/jogo');
  });

  it('should do the thing being tested', () => {
    // Arrange - set up specific state
    // Act - interact with the page
    // Assert - verify outcomes
  });
});
```
