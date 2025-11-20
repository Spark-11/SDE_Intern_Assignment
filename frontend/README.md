#  User Directory – React + Vite + Tailwind

A clean, responsive **User Directory Web App** built using **React, Vite, Tailwind CSS**, and **ReqRes API**.  
This application displays user data in a table with **search**, **sorting**, **filtering**, and **pagination** features.

---

##  Live Demo
https://frontend-task-three-umber.vercel.app/

---

## 📌 Features

###  **Core Features**
- Fetch all users from ReqRes API  
- Display users in a clean responsive table  
- Search users by **name or email**  
- Sort users by:
  - First Name  
  - Email  
- Filter users by email domain  
- Pagination applied on filtered results  

###  **Bonus Features**
- Loading spinner  
- Fully mobile responsive  
- Deployed on Vercel/Netlify  
- Global search (search works from any page)  
- Total user data fetched only once (optimized)

---

##  Tech Stack

| Technology | Purpose |
|-----------|----------|
| **React.js** | UI framework |
| **Vite** | Fast build tool |
| **TailwindCSS** | Styling |
| **Reqres API** | User data |
| **Vercel / Netlify** | Deployment |


---

##  Setup Instructions

Follow these steps to run the project locally:

### 1️ Clone the repository
```bash
git clone https://github.com/your-username/user-directory.git
cd user-directory
```
### Install dependencies
```bash
npm install
```
### Run dev server
```bash
npm run dev
```
##  ReqRes API Fix (IMPORTANT)

The ReqRes API blocks direct browser-origin requests, which results in:
```bash
401 Unauthorized
```

To solve this, two different solutions are used:

---
## 1. Local Development (Vite Proxy)
In local environment, Vite’s proxy bypasses the CORS issue.
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://reqres.in",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})

```

### Usage in local code
```bash
/api/api/users
```
Vite converts it to:
```bash
https://reqres.in/api/users
```
---
## 2. Production (Vercel) – Serverless API Route
Vite proxy does NOT work on Vercel. So production uses a backend API route:
### Create /api/users.js (Vercel Serverless Function)
```js
export default async function handler(req, res) {
  const page = req.query.page || 1;

  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message || "Something went wrong" });
  }
}
```
### Usage in Production
```bash
/api/users?page=1
```
This bypasses CORS completely because
server → ReqRes calls are always allowed.

## 📌 How It Works

###  1. App.jsx

- Fetches **all pages** of users from the ReqRes API  
- Stores the complete data inside the **`allUsers`** state  
- Passes the entire user list to the `UserTable` component for further processing  

---

###  2. UserTable.jsx

Responsible for handling:

-  **Search**  
-  **Sorting**  
-  **Filtering**  
-  **Pagination**  
-  **Table UI Rendering**

The search functionality works **globally across all pages**,  
not just on the currently visible page.  
This ensures that users get correct results even if the matching user exists on another page.
