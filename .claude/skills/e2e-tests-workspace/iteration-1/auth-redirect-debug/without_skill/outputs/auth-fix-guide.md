# Fixing Cypress Auth Redirect in LetraMundo

## The Problem

Your Cypress test visits a protected route (anything under `src/app/(routes)/`), but the page immediately redirects to `/login` before the test can interact with it.

## Root Cause

LetraMundo's auth works like this:

1. **`src/app/(routes)/layout.tsx`** wraps all protected routes and calls `useAuth()`.
2. **`src/hooks/auth/useAuth.ts`** runs a `useEffect` that checks `localStorage.getItem("auth")`. If the key is missing or falsy, it calls `router.push("/login")`.
3. **`src/api/config.ts`** also checks `localStorage.getItem("auth")` on every API request and redirects to `/login` on any 401 response.

So there are **two redirect triggers**:
- The `useAuth()` hook fires if `localStorage` has no `"auth"` key when the page mounts.
- The axios interceptor fires if any API call returns a 401 (e.g., because the token is invalid or missing).

## The Fix

### 1. Set localStorage BEFORE visiting the page

Use `cy.visit()` with `onBeforeLoad`:

```typescript
beforeEach(() => {
  cy.intercept('GET', '**/api/students', { body: [] }).as('getStudents');

  cy.visit('/nivel1/animais/jogo', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth', 'fake-jwt-token');
      win.localStorage.setItem('aluno', JSON.stringify({
        id: 1,
        name: 'Test Student',
        year: 1,
        class: 'A',
        theme: 'animais',
        level: 1,
        phase: 1,
        theme_id: 2,
      }));
    },
  });
});
```

### 2. Store the token as a plain string

```typescript
// CORRECT
win.localStorage.setItem('auth', 'fake-jwt-token');

// WRONG
win.localStorage.setItem('auth', JSON.stringify({ token: 'fake-jwt-token' }));
```

### 3. Mock all API calls to prevent 401 redirects

```typescript
beforeEach(() => {
  cy.intercept('GET', '**/api/students', { body: [] }).as('getStudents');
  cy.intercept('GET', '**/api/themes', { body: [] }).as('getThemes');
  cy.intercept('PUT', '**/api/students/*/progress', { body: { success: true } }).as('updateProgress');

  cy.visit('/your-route', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth', 'fake-jwt-token');
    },
  });
});
```

## Complete Working Example

```typescript
describe('Game Level 1 - Animais', () => {
  const mockStudent = {
    id: 1, name: 'Test Student', year: 1, class: 'A',
    theme: 'animais', level: 1, phase: 1, theme_id: 2,
  };

  beforeEach(() => {
    cy.intercept('GET', '**/api/students', { statusCode: 200, body: [mockStudent] }).as('getStudents');
    cy.intercept('PUT', '**/api/students/*/progress', { statusCode: 200, body: { success: true } }).as('updateProgress');

    cy.visit('/nivel1/animais/jogo', {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth', 'fake-jwt-token');
        win.localStorage.setItem('aluno', JSON.stringify(mockStudent));
        cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
      },
    });

    cy.get('.ant-spin', { timeout: 10000 }).should('not.exist');
  });

  it('should load the game without redirecting to login', () => {
    cy.url().should('include', '/nivel1/animais/jogo');
    cy.url().should('not.include', '/login');
  });
});
```

## Checklist

- [ ] Using `cy.visit()` with `onBeforeLoad` to set `localStorage`
- [ ] Storing the auth token as a plain string
- [ ] Calling `cy.intercept()` for all API endpoints **before** `cy.visit()`
- [ ] Waiting for the Ant Design spinner to disappear before asserting
- [ ] Also setting the `"aluno"` localStorage key if visiting a game page
