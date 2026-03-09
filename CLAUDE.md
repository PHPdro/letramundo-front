# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Next.js development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Tech Stack

- **Next.js 14** (App Router) with TypeScript (strict mode)
- **Ant Design 5** for UI components, **Tailwind CSS** for utility styling
- **Axios** for HTTP requests, **TanStack React Query** for server state
- **React Context** for local game state
- Path alias: `@/*` → `./src/*`

## Architecture

LetraMundo is a literacy education platform with 12 progressive levels, each containing 5 themed game variants (Alimentos, Animais, Cowboy, Dinossauros, Praia). It connects to a Laravel backend API.

### Route Groups

- `src/app/(auth)/` — Login, registration, password recovery (public)
- `src/app/(routes)/` — Protected routes, guarded by `useAuth()` hook
- `src/app/(routes)/nivel{1-12}/` — Game levels, each with theme subfolders and a `jogo/` (game) page
- `src/app/(routes)/niveis/` — Level/theme selection UI

### Key Directories

- `src/api/` — API client layer (config with axios interceptor, student/progress/user/themes endpoints)
- `src/contexts/` — `GameContext` (levels 1, 3-12) and `LevelTwoContext` (level 2 specific game logic)
- `src/hooks/` — `useFetchStudents`, `useGetThemes`, `useAuth`
- `src/utils/` — React Query client setup, theme image mappers (`getAlimentosImage`, etc.)
- `public/audios/` — Audio pronunciation files for letters, syllables, words, and phrases

### Game Structure

Each level defines phases in a `phases.ts` file. Phases 1-7 cover vowel/letter recognition; phases 8-10 cover word/phrase completion with images. Students unlock phases progressively. Game contexts manage audio playback, phase progression, and success/failure feedback (confetti).

### Data Flow

- **Auth:** JWT token stored in localStorage (`"auth"`), auto-attached via axios interceptor. 401 responses redirect to login.
- **Student:** Current student stored in localStorage (`"aluno"`). CRUD via `src/api/student.ts`.
- **Progress:** Tracked per-student with level and phase numbers.
- **Server state:** Cached with React Query, key `"students"` for student list.

### API

Backend base URL configured in `src/api/config.ts`. All requests use Bearer token auth with 7-second timeout.

### Styling

Custom Tailwind colors: primary `#f4a460`, secondary `#ffd3a0`, purple `#983f94`. Theme-specific background classes defined in `globals.css` (e.g., `.bgAlimentosJogo`). Ant Design primary color overridden to `#f4a460`.
