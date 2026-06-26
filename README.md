# 📆 Habit Tracker

![Status](https://img.shields.io/badge/status-WIP-orange)

> **⚠️ Work In Progress (WIP):** This project is currently under active development. Features are being added, and things might change or break frequently.

A full-stack habit tracking web app built with a Node.js / Express backend and a React / Vite frontend, organized as a monorepo.

<p align="center">
  <img src="https://i.imgur.com/0AaUyK8.png" alt="Habit Tracker Template" width="700">
  <br>
  App template
</p>

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, CSS |
| **Backend** | Node.js, Express |
| **Utilities** | date-fns |
| **Code quality** | ESLint, Prettier |

## 📁 Project Structure

```text
habit-tracker/
├── backend/          # Node.js / Express server
│   ├── server.js     # Backend entry point
│   └── ...
├── frontend/         # React / Vite app
│   ├── src/
│   └── ...
├── .gitignore
├── .prettierrc
├── eslint.config.js
└── package.json      # Root scripts (monorepo)

```

## 🚀 Getting Started

### Prerequisites

* **Node.js** v18 or higher
* **npm** v9 or higher

### Installation

Clone the repository and install all dependencies in one command:

```bash
git clone [https://github.com/AVER7777/habit-tracker.git](https://github.com/AVER7777/habit-tracker.git)
cd habit-tracker
npm run install:all

```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env

```

> **⚠️ Note:** Never commit the `.env` file. It is already excluded by `.gitignore`.

### Run in Development

```bash
npm run dev

```

This starts both the backend and frontend in parallel:

* **Frontend** → `http://localhost:5173`
* **Backend** → `http://localhost:3000` (or the `PORT` value set in your `.env`)

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start backend + frontend in parallel |
| `npm run start:backend` | Start the backend server only |
| `npm run start:frontend` | Start the Vite frontend only |
| `npm run install:all` | Install root, backend, and frontend dependencies |
| `npm run build` | Install frontend dependencies and generate production build |
| `npm run lint` | Run ESLint across the entire project |

## 🧹 Code Quality

The project uses ESLint and Prettier to enforce a consistent code style.

**Lint:**

```bash
npm run lint

```

**Format:**

```bash
npx prettier --write .

```

Prettier is configured with single quotes, semicolons, trailing commas, a 100-character line width, and 4-space indentation.

## ⚖️ License

This project is **not** open-source. The source code is published for portfolio and demonstration purposes only.

You are not authorized to copy, modify, distribute, or use this code for personal or commercial purposes without explicit permission.

All rights reserved © 2026 AVER7777.
