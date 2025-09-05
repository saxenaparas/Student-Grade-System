// app/api/upload/route.ts
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import Upload from "@/models/Upload";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

function normalizeKey(k: any) {
  if (k === null || k === undefined) return "";
  return String(k).toLowerCase().replace(/[\s_]+/g, "");
}
function toNum(v: any, fallback = 0) {
  const n = Number(String(v ?? "").replace(/[, ]+/g, ""));
  return isNaN(n) ? fallback : n;
}

export async function POST(req: Request, context: any) {
  await dbConnect();
  try {
    const { filename, data } = await req.json();
    if (!data) return NextResponse.json({ success: false, error: "No file data" }, { status: 400 });

    const buffer = Buffer.from(data, "base64");
    // detect CSV by filename extension or by simple sniff
    const isCSVByName = typeof filename === "string" && filename.toLowerCase().endsWith(".csv");
    let workbook;
    if (isCSVByName) {
      const text = buffer.toString("utf8");
      workbook = XLSX.read(text, { type: "string", raw: false });
    } else {
      // Try read as workbook; if fails and looks like CSV, fallback to string
      try {
        workbook = XLSX.read(buffer, { type: "buffer" });
      } catch (e) {
        const text = buffer.toString("utf8");
        workbook = XLSX.read(text, { type: "string", raw: false });
      }
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    // Build normalized rows: map normalizedKey -> value
    const normalizedRows = rawRows.map((r) => {
      const mapped: Record<string, any> = {};
      for (const key of Object.keys(r)) {
        const nk = normalizeKey(key);
        mapped[nk] = r[key];
      }
      return mapped;
    });

    // Map commonly used normalized keys to proper fields
    const docs = normalizedRows
      .map((nr) => {
        const id = String(nr.studentid ?? nr.student_id ?? nr.id ?? nr.roll ?? nr.s ?? "").trim();
        const name = String(nr.studentname ?? nr.student_name ?? nr.name ?? nr.fullname ?? "").trim();

        const total = toNum(nr.totalmarks ?? nr.total_marks ?? nr.total ?? nr.totalmark ?? 100, 100);
        const marks = toNum(nr.marksobtained ?? nr.marks_obtained ?? nr.marks ?? nr.obtained ?? 0, 0);

        if (!id || !name) return null;

        return {
          student_id: id,
          student_name: name,
          total_marks: total,
          marks_obtained: marks,
          percentage: Number(((marks) / (total || 100)) * 100),
        };
      })
      .filter(Boolean);

    if (!docs.length) {
      return NextResponse.json(
        { success: false, error: "No valid rows found in file", parsedCount: rawRows.length, sampleNormalized: normalizedRows.slice(0, 10) },
        { status: 400 }
      );
    }

    const inserted = await Student.insertMany(docs);
    const upload = await Upload.create({ filename: filename ?? "unknown", count: inserted.length });

    return NextResponse.json({ success: true, count: inserted.length, uploadId: upload._id, parsedCount: rawRows.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
