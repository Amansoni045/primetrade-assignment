import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getAuthUser } from "@/utils/auth";

export async function POST(req: Request) {
  const user = getAuthUser(req as any);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { title, description } = await req.json();

  const task = await Task.create({
    title,
    description,
    userId: user.id,
  });

  return NextResponse.json(task, { status: 201 });
}
