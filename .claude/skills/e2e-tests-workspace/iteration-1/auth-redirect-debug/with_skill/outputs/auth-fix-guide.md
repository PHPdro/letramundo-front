# Fixing Cypress Auth Redirect in LetraMundo

## The Problem

Your Cypress test visits a protected route (e.g., `/nivel1/animais/jogo`) but the page immediately redirects to `/login` before any content loads.

## Root Cause

All routes under `src/app/(routes)/` are protected by the `useAuth()` hook in the shared layout at `src/app/(routes)/layout.tsx`:

```typescript
// src/hooks/auth/useAuth.ts
export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(!!auth);
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  return isAuthenticated;
}
```

There are **two redirect triggers**:
1. The `useAuth()` hook redirects if `localStorage` has no `"auth"` key
2. The axios interceptor in `src/api/config.ts` redirects on any 401 response and clears localStorage

## The Fix

### 1. Set localStorage BEFORE visiting the page

Use `cy.visit()` with `onBeforeLoad` to ensure values exist before React hydrates:

```typescript
beforeEach(() => {
  cy.intercept('GET', '**/api/students', { body: [] }).as('getStudents');

  cy.visit('/nivel1/animais/jogo', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth', JSON.stringify('fake-jwt-token'));
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

### 2. Mock all API calls to prevent 401 redirects

```typescript
beforeEach(() => {
  cy.intercept('GET', '**/api/students', { body: [] }).as('getStudents');
  cy.intercept('GET', '**/api/themes', { body: [] }).as('getThemes');
  cy.intercept('PUT', '**/api/students/*/progress', { body: { success: true } }).as('updateProgress');

  cy.visit('/your-route', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth', JSON.stringify('fake-jwt-token'));
    },
  });
});
```

### 3. Don't forget to stub audio

```typescript
cy.visit('/nivel1/animais/jogo', {
  onBeforeLoad(win) {
    win.localStorage.setItem('auth', JSON.stringify('fake-jwt-token'));
    win.localStorage.setItem('aluno', JSON.stringify(mockStudent));
    cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
  },
});
```

## Common Pitfalls

| Cause | Fix |
|---|---|
| `"auth"` key missing from localStorage | Use `onBeforeLoad` to set it before React hydrates |
| Unmocked API returns 401 | Register `cy.intercept()` before `cy.visit()` |
| Intercepts registered after visit | Move all `cy.intercept()` calls before `cy.visit()` |
| Audio autoplay errors | Stub `HTMLMediaElement.prototype.play` |

## Complete Working Example

```typescript
describe('Game Level 1 - Animais', () => {
  const mockStudent = {
    id: 1, name: 'Maria', year: 2, class: 'B',
    theme: 'animais', level: 1, phase: 1, theme_id: 2,
  };

  beforeEach(() => {
    cy.intercept('GET', '**/api/students', { statusCode: 200, body: [mockStudent] }).as('getStudents');
    cy.intercept('PUT', '**/api/students/*/progress', { statusCode: 200, body: { success: true } }).as('updateProgress');

    cy.visit('/nivel1/animais/jogo', {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth', JSON.stringify('fake-jwt-token'));
        win.localStorage.setItem('aluno', JSON.stringify(mockStudent));
        cy.stub(win.HTMLMediaElement.prototype, 'play').resolves();
      },
    });
  });

  it('should load the game without redirecting to login', () => {
    cy.url().should('include', '/nivel1/animais/jogo');
    cy.url().should('not.include', '/login');
  });
});
```
