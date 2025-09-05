import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
  await dbConnect();
  const students = await Student.find().sort({ createdAt: -1 });
  return NextResponse.json(students);
}
