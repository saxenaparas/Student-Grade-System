'use client'
import { useEffect, useState } from "react";

type Student = {
  _id: string;
  student_id: string;
  student_name: string;
  total_marks: number;
  marks_obtained: number;
  percentage: number;
  createdAt: string;
};

export default function StudentsTable({ refreshFlag }: { refreshFlag?: number }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [refreshFlag]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Students ({students.length})</h2>
        <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Marks</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">%</th>
                <th className="p-2 border">Created</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td className="p-2 border">{s.student_id}</td>
                  <td className="p-2 border">{s.student_name}</td>
                  <td className="p-2 border">{s.marks_obtained}</td>
                  <td className="p-2 border">{s.total_marks}</td>
                  <td className="p-2 border">{s.percentage.toFixed(2)}%</td>
                  <td className="p-2 border">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
