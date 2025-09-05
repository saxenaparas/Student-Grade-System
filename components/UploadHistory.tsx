'use client'
import { useEffect, useState } from "react";

type Upload = {
  _id: string;
  filename?: string;
  count: number;
  createdAt: string;
};

export default function UploadHistory() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Upload History ({uploads.length})</h2>
        <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
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
