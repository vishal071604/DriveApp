# ☁️ DriveApp

### A Secure Cloud Storage Web Application

DriveApp is a cloud storage web application built using the **MERN Stack**. It allows users to securely register, log in, upload files, view their uploaded files, and delete files.

The application uses **JWT authentication, cookies, MongoDB, and ImageKit** to provide secure user authentication and cloud-based file storage.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Cookie-Based Authentication
- Protected Routes
- User Profile
- Secure Logout

### 📁 File Management

- Upload Files
- View Uploaded Files
- Delete Files
- User-Specific File Access
- File Ownership Verification
- Cloud File Storage

### ☁️ Cloud Storage

- ImageKit Integration
- Secure File Upload
- File URLs stored in MongoDB
- Multer File Handling
- User-specific file management

### 🎨 Frontend

- Responsive UI
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios API Integration

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| Vite | Development & Build Tool |
| Tailwind CSS | Styling |
| Axios | API Requests |
| React Router DOM | Client-side Routing |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Cookie Parser | Cookie Management |
| Multer | File Upload Handling |
| ImageKit | Cloud File Storage |

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React Frontend  │
                    │      Vite       │
                    └────────┬────────┘
                             │
                        Axios API
                             │
                             ▼
                    ┌─────────────────┐
                    │ Express Backend │
                    │    Node.js      │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │    MongoDB    │         │    ImageKit   │
        │ Users + Files │         │ Cloud Storage │
        └───────────────┘         └───────────────┘
