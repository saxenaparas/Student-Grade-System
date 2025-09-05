"use client"

import UploadForm from "@/components/UploadForm";
import StudentsTable from "@/components/StudentsTable";
import UploadHistory from "@/components/UploadHistory";
import { useState } from "react";

export default function Home() {
  const [tick, setTick] = useState(0);

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Student Grade Management</h1>
          <UploadForm onUploaded={() => setTick((t) => t + 1)} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 bg-white rounded shadow">
            <StudentsTable refreshFlag={tick} />
          </div>

          <div className="p-6 bg-white rounded shadow">
            <UploadHistory />
          </div>
        </div>
      </div>
    </main>
  );
}
