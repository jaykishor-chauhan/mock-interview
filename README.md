# AI Powered Mock Interview

Welcome to the AI Powered Mock Interview project! This repository contains a full-stack application designed to help users practice and prepare for interviews using AI-driven questions and feedback.

## Project Structure

```
mock-interview-backend/   # Node.js/Express backend API
mock-interview-frontend/  # Modern frontend (React + Vite + Tailwind CSS)
```

### Backend (`mock-interview-backend`)
- **index.js**: Entry point for the Express server
- **config/db.js**: Database configuration
- **controllers/**: Route logic for users, courses, and password reset
- **middleware/**: Custom middleware (e.g., email for password reset)
- **models/**: Mongoose models for User, Course, Questions, Token
- **routes/apiRoutes.js**: Main API routes
- **Hosted on**: rander.com
  
### Frontend (`mock-interview-frontend`)
- **src/**: Main source code
  - **components/**: Reusable UI components
  - **pages/**: Main pages (Login, Register, Interview, Profile, etc.)
  - **hooks/**: Custom React hooks
  - **lib/**: Utility functions
  - **assets/**: Images and static files
- **public/**: Static assets
- **Hosted on**: netlify.com

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (for backend)

### Setup Instructions

#### 1. Clone the repository
```sh
git clone <repo-url>
cd AI-Powered Mock Interview
```

#### 2. Install dependencies
##### Backend
```sh
cd mock-interview-backend
npm install
```
##### Frontend
```sh
cd ../mock-interview-frontend
npm install
```

#### 3. Configure Environment Variables
- Copy `.env.example` to `.env` in the backend folder and update values as needed (MongoDB URI, JWT secret, etc.)

#### 4. Run the Application
##### Start Backend
```sh
cd mock-interview-backend
npm start
```
##### Start Frontend
```sh
cd ../mock-interview-frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000` (or as configured).

## Features
- User authentication (register, login, password reset)
- AI-powered interview question generation
- Multiple interview categories/courses
- User profile management
- Responsive and modern UI

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.

---
Feel free to update this README as the project evolves.
