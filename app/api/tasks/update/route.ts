import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getAuthUser } from "@/utils/auth";
import { updateTaskSchema } from "@/lib/validators/task";

export async function PUT(req: Request) {
    try {
        const user = getAuthUser(req as any);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        const result = updateTaskSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { id, title, description } = result.data;

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: user.id },
            { title, description },
            { new: true }
        );

        if (!task) {
            return NextResponse.json(
                { message: "Task not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        console.error("Update task error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
