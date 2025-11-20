#  User Directory – React + Vite + Tailwind

A clean, responsive **User Directory Web App** built using **React, Vite, Tailwind CSS**, and **ReqRes API**.  
This application displays user data in a table with **search**, **sorting**, **filtering**, and **pagination** features.

---

##  Live Demo
(Your deployed link here)

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

To fix this issue, a proxy is added inside **vite.config.js**.

---

###  `vite.config.js`

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
### Usage in code
Instead of calling :
```bash
https://reqres.in/api/users
```
Use : 
```bash
/api/api/users
```
This bypasses browser CORS + 401 restrictions and allows smooth API communication.

##  How It Works

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
