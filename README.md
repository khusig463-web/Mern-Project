# 📊 Project Management Tool (MERN Stack)

A lightweight, robust, and highly efficient **Project Management Tool** built using the MERN stack. This application features secure user authentication, interactive multi-project dashboards, dynamic frictionless team collaboration (without requiring secondary registrations), and a full-fledged visual **Kanban Board** for tracking task progress from inception to completion.

---

## 🚀 Key Features

* **Secure User Authentication:** Account registration and secure login utilizing JSON Web Tokens (JWT) with persistent session management via `localStorage`.
* **Dynamic Dashboards:** Personalized space for users to instantly create, list, and safely delete individual projects.
* **Frictionless Collaboration:** Unique ability to create ad-hoc agile teams simply by appending **Member Names** directly into the project workspace—no tedious validation loops or secondary logins required.
* **Automated Task Assignment:** Dynamic contextual dropdown lists populated seamlessly using active team member rosters for swift task delegation.
* **Visual Kanban Tracking System:** Live tracking interface categorizing tasks dynamically across standard production columns: `To-Do`, `In Progress`, and `Done`.

---

## 🛠️ Tech Stack & Architecture

### Frontend
* **React 19 & Vite:** Next-gen ultra-fast frontend build tooling and framework components.
* **React Router v7:** Client-side routing management.
* **Axios:** Promise-based HTTP client managing token-intercepted API handshakes.

### Backend & Database
* **Node.js & Express.js:** Scalable environment handling secure endpoints.
* **MongoDB & Mongoose:** NoSQL flexible data layer utilizing referenced relational document architectures.
* **JWT & Cryptography:** Session tokens ensuring safe endpoint blockades.

---

## 📁 Repository Structure

```text
project-management-tool/
├── backend/
│   ├── config/
│   ├── models/          # User, Project, and Task Mongoose Schemas
│   ├── routes/          # auth, projects, and tasks router controllers
│   ├── middleware/      # JWT route guard validation locks
│   ├── server.js        # Main API engine entry point
│   └── .env             # Port configuration and Mongo connection URI
└── frontend/
    ├── src/
    │   ├── components/  # Core structural UI modules
    │   ├── pages/       # Auth, Dashboard, and ProjectWorkspace views
    │   ├── api.js       # Base Axios wrapper with request interceptors
    │   ├── App.jsx      # Route switches and main mapping
    │   └── main.jsx     # App injection root bootstrap
    └── package.json     # Declarative manifest dependencies (React 19, Axios, Router v7)
