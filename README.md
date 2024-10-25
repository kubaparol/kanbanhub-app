# KanbanHub

  <div align="center">
    <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat" alt="react" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat" alt="typescript" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff&style=flat" alt="reactquery" />
  </div>

&nbsp;

<div align="center">
  <a href="https://github.com/kubaparol/cookly-app">
    <img src="public/assets/images/logo-white.png" alt="Logo" width="254" height="52">
  </a>
</div>

&nbsp;

Click to see live version: [KanbanHub](https://kanbanhub-app.vercel.app/)!

## Table of Contents

  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
        <li><a href="#getting-started">Getting Started</a></li>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## Overview

![KanbanHub home page](/public/assets/images/hero.png)

**KanbanHub** is a kanban-style task management application that allows users to create, edit, and manage project boards with full control over columns and tasks. It provides an intuitive drag-and-drop interface for organizing tasks within and across columns.

### Features

- **Board Management**: Create, edit, and delete boards to organize different projects.
- **Column Management**: Customize each board by adding, editing, and deleting columns.
- **Task Management**: Add, edit, and delete tasks within columns.
- **Drag and Drop**: Rearrange tasks and move them between columns using a smooth drag-and-drop interface.
- **Dedicated Backend**: This application is supported by a custom backend. See the backend repository here: [KanbanHub API](https://github.com/kubaparol/kanbanhub-api).

### Tech Stack

**KanbanHub** is built with a robust and efficient tech stack:

- [React](https://reactjs.dev/) for building the user interface
- [TypeScript](https://www.typescriptlang.org/) for static typing
- [Vite](https://vite.dev/) for fast development and optimized builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query/latest) for data fetching and caching
- [React DnD](https://react-dnd.github.io/react-dnd/about) for drag-and-drop functionality
- [Zod](https://zod.dev/) for data validation
- [React Hook Form](https://www.react-hook-form.com/) for form management
- [Axios](https://axios-http.com/docs/intro) for HTTP requests
- [Day.js](https://day.js.org/) for date manipulation
- [shadcn/ui](https://ui.shadcn.com/) for reusable UI components
- [Lucide](https://lucide.dev/) for customizable icons
- [ESLint](https://eslint.org/) for code lintinh
- [npm](https://www.npmjs.com/) as the package manager

## Getting Started

To run **KanbanHub** locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/kubaparol/kanbanhub-app.git
```

2. Install the dependencies:

```bash
npm i
```

3. Copy the `.env.example` file, rename it to `.env` and fill required credentials:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

5. App is ready to go:

```
http://localhost:3000/
```

## Contact

Feel free to contact me! You can find me here:

- [LinkedIn](https://www.linkedin.com/in/jakub-parol/)
- [GitHub](https://github.com/kubaparol)
