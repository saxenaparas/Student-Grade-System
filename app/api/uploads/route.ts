import dbConnect from "@/lib/mongodb";
import Upload from "@/models/Upload";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const uploads = await Upload.find().sort({ createdAt: -1 });
  return NextResponse.json(uploads);
}
