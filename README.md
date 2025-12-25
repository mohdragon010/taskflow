# TaskFlow 📝

A simple and secure task management application built with Next.js and Firebase.
Users can create, manage, and track their tasks with real-time updates and Google authentication.

---

## 🚀 Features

- Authentication
  - Email & Password
  - Google Sign-In (Popup on desktop / Redirect on mobile)
- Tasks CRUD
  - Create new tasks
  - Read tasks (user-specific)
  - Update tasks (toggle complete / edit)
  - Delete tasks
- Realtime updates using Firestore onSnapshot
- Security
  - Per-user data isolation
  - Firestore Security Rules (owner-only access)

---

## 🛠 Tech Stack

- Frontend: Next.js (App Router)
- Backend / BaaS: Firebase
  - Firebase Authentication
  - Cloud Firestore
- Deployment: Vercel

---

## 📂 Data Model

Task:
- title: string
- completed: boolean
- userId: string
- createdAt: timestamp

---

## 🔐 Firestore Security Rules (Overview)

- Only authenticated users can access data
- Users can read, update, and delete only their own tasks
- Ownership is enforced using userId

---

## 🧪 How to Run Locally

1. Clone the repository  
git clone https://github.com/mohdragon010/taskflow.git  
cd taskflow  

2. Install dependencies  
npm install  

3. Add Firebase config  
Create src/lib/firebase.js and add your Firebase credentials.

4. Run the development server  
npm run dev  

---

## 🌍 Live Demo

https://moh-tasks.vercel.app

---

## 📌 What I Learned

- Building secure CRUD applications with Firebase
- Handling authentication with multiple providers
- Implementing real-time data with Firestore
- Enforcing backend security using Firestore Rules
- Structuring a production-ready Next.js app

---

## 🙌 Author

Mohamed  
Frontend Developer

GitHub: https://github.com/mohdragon010 
Portfolio: https://mohamed-crafts.vercel.app

---

## 📝 License

This project is for learning and portfolio purposes.
