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
├── .next/                       # Next.js build output (auto-generated)
├── .git/                        # Git repo metadata
├── app/                         # Next.js App Router pages & API routes
│   ├── api/                     # API endpoints
│   │   ├── students/            # student CRUD API
│   │   │   └── [id]/route.ts    # PUT / DELETE for a specific student
│   │   ├── upload/              # file upload API
│   │   │   └── route.ts         # POST /api/upload
│   │   └── uploads/             # upload history API
│   │       └── route.ts         # GET /api/uploads
│   ├── favicon.ico              # app favicon
│   ├── globals.css              # Tailwind + global styles
│   ├── layout.tsx               # Root layout (imports globals.css)
│   └── page.tsx                 # Main UI page (Upload + Students + History)
│
├── components/                  # React client components
│   ├── UploadForm.tsx           # file input, sends base64 to /api/upload
│   ├── StudentsTable.tsx        # displays students, edit & delete UI
│   └── UploadHistory.tsx        # shows past uploads (filename, count, time)
│
├── lib/                         # helper libraries
│   └── mongodb.ts               # mongoose connection helper
│
├── models/                      # Mongoose models
│   ├── Student.ts               # Student schema/model
│   └── Upload.ts                # Upload history schema/model
│
├── public/                      # static assets served by Next.js
│   └── (images, icons, etc.)
│
├── scripts/                     # utility scripts
│   └── create-sample.js         # generates sample_data.xlsx (optional)
│
├── styles/                      # optional extra CSS files
│   └── (if any)
│
├── node_modules/                # installed packages (auto-generated)
│
├── .env.local                   # local environment variables (MONGODB_URI)
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md                    # project README (what to include)
├── sample_data.xlsx             # sample Excel for assignment/testing
├── tailwind.config.cjs
├── tsconfig.json
└── README.md                    # README file

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
👉 [Live Demo](https://student-grade-system-nu.vercel.app/)  

---

## 📁 Sample Data
Use the included [`sample_data.xlsx`](./sample_data.xlsx) file to test uploading functionality.

