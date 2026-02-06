import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getAuthUser } from "@/utils/auth";

export async function PUT(req: Request) {
    try {
        const user = getAuthUser(req as any);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id, title } = await req.json();

        if (!id || !title) {
            return NextResponse.json({ message: "Task ID and title required" }, { status: 400 });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: user.id },
            { title },
            { new: true }
        );

        if (!task) {
            return NextResponse.json({ message: "Task not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        console.error("Update task error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
