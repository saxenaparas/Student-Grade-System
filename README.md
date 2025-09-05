# 📊 Student Grade Management System

A full-stack application to manage student grades, built with **Next.js 15**, **TailwindCSS**, and **MongoDB Atlas**, and deployed on **Vercel**.  

---

## 🚀 Features
- Upload **Excel (.xlsx)** or **CSV (.csv)** files with student records  
- Automatic parsing & normalization of headers  
- Calculate percentage for each student  
- View all students in a table  
- **Edit** / **Delete** student records  
- Track **upload history** (file name, record count, timestamp)  
- REST API endpoints for students & uploads  

---

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), TailwindCSS  
- **Backend:** Next.js API Routes, Mongoose, MongoDB Atlas  
- **Database:** MongoDB Atlas (cloud)  
- **Deployment:** Vercel  

---

## 📂 File Structure
```
student-grade-system/
│
├── app/                 # Next.js App Router pages & API routes
│   ├── api/             # API endpoints (upload, students, uploads)
│   └── page.tsx         # Main UI
│
├── components/          # React components (form, tables, history)
├── lib/                 # MongoDB connection helper
├── models/              # Mongoose models (Student, Upload)
├── scripts/             # Utility scripts (sample data generator)
├── sample_data.xlsx     # Sample file for testing
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/Student-Grade-System.git
cd Student-Grade-System
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```
MONGODB_URI="your-mongodb-atlas-uri"
```

### 4. Run Locally
```bash
npm run dev
```
Visit 👉 `http://localhost:3000`

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📊 Usage
1. Upload an **Excel** or **CSV** file with headers:
   - `student_id`
   - `student_name`
   - `marks_obtained`
   - `total_marks`
2. Records are saved to MongoDB Atlas.
3. View students in a table with calculated percentages.
4. Edit or delete student records.
5. View upload history (file name, record count, upload time).

---

## 🌐 Deployment
This project is deployed on **Vercel**.  
👉 [Live Demo](https://<your-vercel-app>.vercel.app)  

---

## 📁 Sample Data
Use the included [`sample_data.xlsx`](./sample_data.xlsx) file to test uploading functionality.

---

## 📜 License
This project is licensed under the **MIT License**.
