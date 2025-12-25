# TaskFlow 📝

A simple and secure task management application built with **Next.js** and **Firebase**.  
Users can create, manage, and track their tasks with real-time updates and Google authentication.

---

## 🚀 Features

- 🔐 Authentication
  - Email & Password
  - Google Sign-In (Popup / Redirect for mobile)

- ✅ Tasks CRUD
  - Create new tasks
  - Read tasks (user-specific)
  - Update tasks (toggle complete / edit)
  - Delete tasks

- 🔄 Realtime updates using Firestore `onSnapshot`

- 🔒 Security
  - Per-user data isolation
  - Firestore Security Rules (owner-only access)

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend / BaaS:** Firebase
  - Firebase Authentication
  - Cloud Firestore
- **Deployment:** Vercel

---

## 📂 Data Model

### Task
```ts
{
  title: string,
  completed: boolean,
  userId: string,
  createdAt: timestamp
}
