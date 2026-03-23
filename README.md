# End-to-End ML Prediction System

This is a full-stack MERN application that integrates with a Python FastAPI ML service to provide role-based predictions.

## Project Structure

- **client/**: React frontend (Vite)
- **server/**: Node.js/Express backend
- **ml_api/**: Python FastAPI machine learning service

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- MongoDB Atlas Account (or local MongoDB)

## Setup Instructions

### 1. ML API Setup

Navigate to the `ml_api` directory and install dependencies (create a virtual environment recommended):

```bash
cd ml_api
pip install -r requirements.txt
```

Run the API:

```bash
python -m uvicorn app:app --reload
```
The ML API will run on `http://localhost:8000`.

### 2. Backend Setup

Navigate to the `server` directory:

```bash
cd server
npm install
```

Create a `.env` file in `server/` with your credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ML_API_URL=http://localhost:8000/predict
```

Run the server:

```bash
npm start
```
The Backend API will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the `client` directory:

```bash
cd client
npm install
```

Run the frontend:

```bash
npm run dev
```
The Frontend will run on `http://localhost:5173`.

## Usage

1. **Register** a new account.
2. **Login** with your credentials.
3. Go to **Predict** page and enter the 11 feature values.
4. Click **Predict** to get the result.
5. View your past predictions in **History**.
6. (Optional) Manually set your role to `admin` in MongoDB to access the **Admin Dashboard**.

## Features

- Role-Based Access Control (User/Admin)
- JWT Authentication
- Secure Password Hashing
- Prediction History Logging
- MERN Stack Architecture
