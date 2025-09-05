'use client'
import { useState } from "react";

export default function UploadForm({ onUploaded }: { onUploaded?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [lastResponse, setLastResponse] = useState<any>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, data: base64 }),
      });

      const data = await res.json();
      console.log("/api/upload response:", data);
      setLastResponse(data);

      if (res.ok && (data.count || data.count === 0)) {
        setMessage(`Uploaded ${data.count} records`);
        onUploaded && onUploaded();
      } else if (res.ok && data.success) {
        setMessage(`Success (no count)`);
        onUploaded && onUploaded();
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleChange}
        disabled={loading}
        className="border p-1"
      />
      <div className="text-sm text-slate-700">{loading ? "Uploading..." : message}</div>

      {lastResponse && (
        <div className="mt-3">
          <div className="text-xs font-medium mb-1">Raw response (JSON):</div>
          <pre className="max-h-48 overflow-auto p-2 bg-gray-100 border rounded text-xs">
            {JSON.stringify(lastResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
