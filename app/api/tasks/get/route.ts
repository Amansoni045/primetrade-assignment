import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getAuthUser } from "@/utils/auth";

export async function GET(req: Request) {
  const user = getAuthUser(req as any);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const tasks = await Task.find({ userId: user.id }).sort({ createdAt: -1 });

  return NextResponse.json(tasks);
}
