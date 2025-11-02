# ⚙️ Node.js Backend – Express.js Starter Template

A production-ready **Express.js + MongoDB** backend boilerplate built for **rapid development**, **hackathons**, and **scalable API projects**.  
This template includes **authentication**, **security best practices**, **file uploads**, **email utilities**, and a clean modular structure — so you can focus on building features, not setup.

---

## 🚀 Features

✅ **Express.js (v5)** – Latest version with modern routing  
✅ **MongoDB + Mongoose** – Fast and reliable data modeling  
✅ **Authentication System** – JWT-based user auth  
✅ **Password Hashing** – Secure using `bcryptjs`  
✅ **Environment Config** – Easy `.env` setup with `dotenv`  
✅ **Input Validation** – Using `joi` for clean request validation  
✅ **Security Middleware** – `helmet`, `xss-sanitizer`, `rate-limit`, and `mongo-sanitize`  
✅ **Email Utility** – Ready-to-use `nodemailer` setup  
✅ **File Uploads** – via `multer` and `cloudinary` integration  
✅ **API Logging** – Using `morgan`  
✅ **Cron Jobs** – `node-cron` for background tasks  
✅ **Error Handling** – Centralized response utility  
✅ **Modular Folder Structure** – Scalable and clean  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend Framework | [Express.js](https://expressjs.com) |
| Database | [MongoDB + Mongoose](https://mongoosejs.com) |
| Auth | JWT + bcryptjs |
| Validation | Joi |
| File Uploads | Multer + Cloudinary |
| Emails | Nodemailer |
| Security | Helmet, Express Rate Limit, Mongo Sanitize, XSS Sanitizer |
| Logging | Morgan |
| Scheduling | Node-Cron |

---

## 🧠 Project Structure

```

.
├── config/
│   └── dbConnect.js             # MongoDB connection setup
│
├── controllers/
│   └── user.controller.js       # User logic (register, login, etc.)
│
├── middlewares/
│   └── auth.middleware.js       # JWT auth guard
│
├── models/
│   └── user.model.js            # Mongoose schema for users
│
├── routes/
│   ├── routes.js                # Root router entry
│   └── user.route.js            # User-related routes
│
├── utils/
│   ├── converter.js             # Utility for data formatting or file handling
│   ├── email.js                 # Email sending setup with Nodemailer
│   └── response.js              # Standardized API responses
│
├── template/                    # Email templates or other static assets
│
├── .env                         # Environment variables
├── index.js                     # App entry point
├── package.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/coding-night-backend.git
cd coding-night-backend
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4️⃣ Start the Server

```bash
npm start
```

Server runs by default at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🔑 Example API Routes

| Endpoint              | Method | Description                             |
| --------------------- | ------ | --------------------------------------- |
| `/api/users/register` | `POST` | Register a new user                     |
| `/api/users/login`    | `POST` | Login user and get token                |
| `/api/users/profile`  | `GET`  | Get logged-in user details              |
| `/api/upload`         | `POST` | Upload file to Cloudinary (dummy setup) |

---

## 🧰 Included Middleware

* `helmet()` → Secures HTTP headers
* `express-rate-limit` → Prevents brute-force attacks
* `express-mongo-sanitize` → Prevents NoSQL injection
* `express-xss-sanitizer` → Protects against XSS
* `cors()` → Handles cross-origin requests
* `morgan()` → Logs requests to console

---

## 🧩 Utils Overview

| File           | Purpose                                     |
| -------------- | ------------------------------------------- |
| `email.js`     | Configure & send emails via Nodemailer      |
| `converter.js` | Handles file conversions (if any)           |
| `response.js`  | Consistent success/error response structure |

---

## 🧱 Example Response Structure

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "66ac9d43a...c6",
    "email": "user@example.com"
  }
}
```

Error example:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 🧩 DB Connection

The database connection is initialized in:

```js
// config/dbConnect.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
```

---

## 🧭 Roadmap

* [ ] Add Swagger API documentation
* [ ] Add role-based access control (RBAC)
* [ ] Add Redis caching
* [ ] Add file storage with AWS S3
* [ ] Integrate CI/CD (GitHub Actions + Vercel)

---

## 🧾 License

This project is licensed under the **MIT License**.
You can freely use, modify, and distribute it with attribution.

---

## 👨‍💻 Author

**Saim Malik**
Backend & MERN Stack Developer
💼 [LinkedIn](https://www.linkedin.com/in/msaimmalik/)
🌐 [Portfolio](https://saim-portfolio.vercel.app/)

