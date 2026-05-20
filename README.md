# Calculator App

A simple calculator built with React, TypeScript, and Tailwind CSS, scaffolded as a UiPath Coded Web App.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Percentage and sign toggle (+/-)
- Chained operations
- Decimal input
- Active operator highlight
- Display auto-scales for long numbers
- iOS-inspired dark theme

## Project Structure

```
src/
  App.tsx                   # Auth gate and root component
  components/
    CalculatorPage.tsx       # Calculator UI and logic
  hooks/
    useAuth.tsx              # UiPath OAuth (PKCE) provider
```

## Getting Started

Dependencies are pre-installed. The dev server is managed by the platform — do not start it manually.

To type-check the project:

```bash
npx tsc --noEmit
```

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [UiPath TypeScript SDK](https://www.npmjs.com/package/@uipath/uipath-typescript)