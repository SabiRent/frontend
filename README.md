# MyCompound Web Application

MyCompound is a web app for landlords to manage properties, units, tenants, and rent in one place. It helps track who has paid, who is due soon, and who is overdue, with a clear payment history for every tenant.

## Overview

Many landlords still track rent with notebooks, memory, spreadsheets, or scattered messages. That makes it easy to miss due dates, forget payments, and lose track of tenant history.

MyCompound solves that by giving landlords a simple dashboard to:

- Organize properties and units
- Add tenants with rent details and contact information
- Track rent status at a glance
- Mark rent as paid and move the next due date forward
- Keep a payment history for every tenant

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- React Router
- Axios
- Lucide React
- Sonner

## Getting Started

### Prerequisites

- Node.js 22 or later recommended
- npm

### Setup

1. Clone the repository.

   ```sh
   git clone https://github.com/SabiRent/frontend.git
   cd frontend
   ```

2. Install dependencies.

   ```sh
   npm install
   ```

3. Run the development server.

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

4. If your environment requires local variables, add them to your own `.env.local` file or follow the project convention for environment setup.

## Available Scripts

| Script             | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `npm run dev`      | Starts the Vite development server.                        |
| `npm run build`    | Runs the TypeScript build and creates a production bundle. |
| `npm run lint`     | Runs ESLint to check for code quality issues.              |
| `npm run lint:fix` | Runs ESLint and automatically fixes issues where possible. |
| `npm run format`   | Runs Prettier to format the codebase.                      |
| `npm run preview`  | Serves the production build locally for previewing.        |
| `npm run prepare`  | Installs Husky Git hooks.                                  |
| `npm run test`     | Runs TypeScript type checking with `tsc --noEmit`.         |

## Project Notes

- The project uses TypeScript for type safety.
- ESLint and Prettier are available for code quality and formatting.
- Husky is configured for Git hooks.
- The `@` import alias points to the `src/` directory.

Example:

```ts
import Dashboard from "@/pages/Dashboard";
import { formatCurrency } from "@/utils/formatCurrency";
```

## Design

- Figma design file: [View the design file](https://www.figma.com/design/ALUH23GpLjoVNv1J1Wfvx7/Build-SZN-3?node-id=0-1&t=O9ylsssCFDQzUIAE-1)
