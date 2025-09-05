import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function PUT(req: Request, context: any) {
  await dbConnect();
  try {
    const { id } = context.params;
    const body = await req.json();

    const updated = await Student.findByIdAndUpdate(
      id,
      {
        student_name: body.student_name,
        total_marks: body.total_marks,
        marks_obtained: body.marks_obtained,
        percentage:
          (Number(body.marks_obtained) / Number(body.total_marks || 100)) * 100,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, student: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  await dbConnect();
  try {
    const { id } = context.params;

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
