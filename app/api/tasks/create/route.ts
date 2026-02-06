import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getAuthUser } from "@/utils/auth";
import { createTaskSchema } from "@/lib/validators/task";

export async function POST(req: Request) {
  try {
    const user = getAuthUser(req as any);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const result = createTaskSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, description } = result.data;

    const task = await Task.create({
      title,
      description,
      userId: user.id,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
