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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [refreshFlag]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this student?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (res.ok) await load();
      else {
        const err = await res.json();
        alert(err?.error || "Delete failed");
      }
    } catch (e: any) {
      alert(e?.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleSave(id: string) {
    setActionLoading(id);
    try {
      const payload = {
        student_name: editForm.student_name,
        total_marks: Number(editForm.total_marks),
        marks_obtained: Number(editForm.marks_obtained),
      };
      const res = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEditingId(null);
        await load();
      } else if (res.ok && data.student) {
        setEditingId(null);
        await load();
      } else {
        alert(data?.error || "Update failed");
      }
    } catch (e: any) {
      alert(e?.message || "Update failed");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Students ({students.length})</h2>
        <div className="flex items-center gap-2">
          <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
        </div>
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
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td className="p-2 border">{s.student_id}</td>
                  <td className="p-2 border">
                    {editingId === s._id ? (
                      <input
                        value={editForm.student_name ?? ""}
                        onChange={(e) => setEditForm({ ...editForm, student_name: e.target.value })}
                        className="border p-1"
                      />
                    ) : (
                      s.student_name
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === s._id ? (
                      <input
                        type="number"
                        value={editForm.marks_obtained ?? 0}
                        onChange={(e) => setEditForm({ ...editForm, marks_obtained: Number(e.target.value) })}
                        className="border p-1 w-20"
                      />
                    ) : (
                      s.marks_obtained
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === s._id ? (
                      <input
                        type="number"
                        value={editForm.total_marks ?? 100}
                        onChange={(e) => setEditForm({ ...editForm, total_marks: Number(e.target.value) })}
                        className="border p-1 w-20"
                      />
                    ) : (
                      s.total_marks
                    )}
                  </td>
                  <td className="p-2 border">{Number(s.percentage).toFixed(2)}%</td>
                  <td className="p-2 border space-x-2">
                    {editingId === s._id ? (
                      <>
                        <button
                          onClick={() => handleSave(s._id)}
                          disabled={actionLoading === s._id}
                          className="px-2 py-1 bg-green-600 text-white rounded"
                        >
                          {actionLoading === s._id ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2 py-1 bg-gray-300 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { setEditingId(s._id); setEditForm({ ...s }); }}
                          className="px-2 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          disabled={actionLoading === s._id}
                          className="px-2 py-1 bg-red-600 text-white rounded"
                        >
                          {actionLoading === s._id ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
