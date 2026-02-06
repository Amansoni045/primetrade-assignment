import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getAuthUser } from "@/utils/auth";

export async function DELETE(req: Request) {
    try {
        const user = getAuthUser(req as any);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Task ID required" }, { status: 400 });
        }

        const task = await Task.findOneAndDelete({ _id: id, userId: user.id });

        if (!task) {
            return NextResponse.json({ message: "Task not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error("Delete task error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
