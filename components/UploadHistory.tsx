'use client'
import { useEffect, useState } from "react";

type Upload = {
  _id: string;
  filename?: string;
  count: number;
  createdAt: string;
};

export default function UploadHistory({ onCleared }: { onCleared?: () => void }) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/uploads");
      const data = await res.json();
      setUploads(data || []);
    } catch (e) {
      setUploads([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function clearUploads() {
    if (!confirm("Are you sure you want to clear upload history? This cannot be undone.")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/uploads/clear", { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Cleared ${data.deletedCount} upload records`);
        await load();
      } else {
        alert(data?.error || "Failed to clear upload history");
      }
    } catch (e: any) {
      alert(e?.message || "Failed to clear upload history");
    } finally {
      setBusy(false);
    }
  }

  async function clearStudents() {
    if (!confirm("Are you sure you want to DELETE ALL students? This cannot be undone.")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/students/clear", { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Deleted ${data.deletedCount} students`);
        onCleared && onCleared();
        await load();
      } else {
        alert(data?.error || "Failed to delete students");
      }
    } catch (e: any) {
      alert(e?.message || "Failed to delete students");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Upload History ({uploads.length})</h2>
        <div className="flex gap-2">
          <button onClick={load} className="px-3 py-1 border rounded" disabled={loading || busy}>Refresh</button>
          <button
            onClick={clearUploads}
            className="px-3 py-1 bg-red-500 text-white rounded"
            disabled={busy}
            title="Clear upload history"
          >
            {busy ? "Working..." : "Clear History"}
          </button>
          <button
            onClick={clearStudents}
            className="px-3 py-1 bg-red-700 text-white rounded"
            disabled={busy}
            title="Delete all students"
          >
            {busy ? "Working..." : "Delete All Students"}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : uploads.length === 0 ? (
        <p className="text-sm text-slate-600">No uploads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Filename</th>
                <th className="p-2 border">Count</th>
                <th className="p-2 border">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((u, i) => (
                <tr key={u._id}>
                  <td className="p-2 border text-center">{i + 1}</td>
                  <td className="p-2 border">{u.filename ?? "unknown"}</td>
                  <td className="p-2 border text-center">{u.count}</td>
                  <td className="p-2 border">{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
