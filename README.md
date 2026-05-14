# Drive App

A cloud storage web application built using the MERN Stack. It allows users to register, login, upload files, view uploaded files, and delete their own files securely.

## Features

- User Register and Login
- JWT Authentication
- Cookie-based Auth System
- Upload Files
- View Uploaded Files
- Delete Files
- User-specific File Access
- Protected Routes
- ImageKit File Storage
- Responsive UI

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Multer
- ImageKit

## Folder Structure

CreateX/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
└── README.md

## Installation

### Clone the repository

git clone https://github.com/your-username/CreateX.git

### Backend Setup

cd Backend
npm install

Create a `.env` file inside Backend folder:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Run backend:

npm run dev

### Frontend Setup

cd Frontend
npm install
npm run dev

## Authentication Flow

1. User registers or logs in.
2. Backend creates a JWT token.
3. Token is stored inside browser cookies.
4. Protected routes check the token.
5. Logged-in user can access files.

## File Upload Flow

1. User selects a file.
2. Frontend sends file using FormData.
3. Multer receives the file in backend memory.
4. File is uploaded to ImageKit.
5. File URL and details are saved in MongoDB.
6. User can view and delete their files.

## API Endpoints

### Auth APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get logged-in user profile |
| POST | /api/auth/logout | Logout user |

### File APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/files/upload | Upload file |
| GET | /api/files | Get logged-in user's files |
| DELETE | /api/files/:id | Delete file |

## Security

- Password hashing
- JWT token verification
- Cookie-based authentication
- Protected backend routes
- User ownership checking
- Environment variables for secret keys

## Future Improvements

- Folder creation
- File search
- File sharing
- Trash and restore option
- Favorite files
- File preview
- Download option
- Storage limit per user

## Author

Vishal S Kalawad

Aspiring Full Stack MERN Developer.

## License

This project is licensed under the MIT License.
