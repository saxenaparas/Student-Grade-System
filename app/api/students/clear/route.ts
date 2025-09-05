// app/api/students/clear/route.ts
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function DELETE() {
  await dbConnect();
  try {
    const res = await Student.deleteMany({});
    return NextResponse.json({ success: true, deletedCount: res.deletedCount ?? 0 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
