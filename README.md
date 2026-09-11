# ☁️ DriveApp

A full-stack cloud storage application inspired by Google Drive.  
Users can create an account, log in securely, upload files, view uploaded files, and delete files.

## 🚀 Features

- User Signup
- User Login
- Secure password hashing using bcrypt
- JWT-based authentication
- HTTP-only authentication cookies
- Upload files
- Store files using ImageKit
- Store file information in MongoDB
- View uploaded files
- Delete files
- Logout
- Responsive user interface
- REST API architecture

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cookie Parser
- CORS

### Cloud Storage

- ImageKit

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database
- ImageKit – File Storage

## 📁 Project Structure

```text
DriveApp/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── .gitignore
│
└── server/
    ├── config/
    │   └── imagekit.js
    │
    ├── controllers/
    │   ├── authController.js
    │   └── fileController.js
    │
    ├── database/
    │   └── db.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── user.js
    │   └── File.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── fileRoutes.js
    │
    ├── utils/
    │   └── multer.js
    │
    ├── server.js
    ├── package.json
    └── .gitignore

🏗️ System Architecture

                  ┌───────────────┐
                  │     USER      │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │ React Frontend│
                  │   (Vercel)    │
                  └───────┬───────┘
                          │
                       Axios
                          │
                          ▼
                  ┌───────────────┐
                  │ Node + Express│
                  │   Backend     │
                  │   (Render)    │
                  └───────┬───────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
      ┌───────────────┐       ┌───────────────┐
      │ MongoDB Atlas │       │    ImageKit   │
      │    Database   │       │ File Storage  │
      └───────────────┘       └───────────────┘

🔐 Authentication Flow

┌────────┐
│  User  │
└───┬────┘
    │
    ▼
┌──────────────┐
│ Login /      │
│ Signup       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Express API  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   MongoDB    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ JWT Cookie   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Dashboard   │
└──────────────┘

📤 File Upload Flow

┌──────────────┐
│ Select File  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ React Client │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Express API  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Multer     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   ImageKit   │
│ File Storage │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   MongoDB    │
│ File Details │
└──────────────┘

📂 File Management

                 ┌─────────────┐
                 │  Dashboard  │
                 └──────┬──────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
     ┌─────────┐   ┌─────────┐   ┌─────────┐
     │ Upload  │   │  View   │   │ Delete  │
     └────┬────┘   └────┬────┘   └────┬────┘
          │             │             │
          ▼             ▼             ▼
     ImageKit       File URL      MongoDB
