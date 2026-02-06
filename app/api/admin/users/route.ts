import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getAuthUser } from "@/utils/auth";

export async function GET(req: Request) {
    const authUser = getAuthUser(req as any);

    if (!authUser) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    if (authUser.role !== "admin") {
        return NextResponse.json(
            { message: "Forbidden: Admins only" },
            { status: 403 }
        );
    }

    await connectDB();
    const users = await User.find().select("-password");

    return NextResponse.json(users);
}

export async function DELETE(req: Request) {
    try {
        const authUser = getAuthUser(req as any);
        if (!authUser || authUser.role !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "User ID required" }, { status: 400 });
        }

        if (id === authUser.id) {
            return NextResponse.json({ message: "Cannot delete yourself" }, { status: 400 });
        }

        await connectDB();
        await User.findByIdAndDelete(id);

        return NextResponse.json({ message: "User deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const authUser = getAuthUser(req as any);
        if (!authUser || authUser.role !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { id, role } = await req.json();
        if (!id || !role || !["user", "admin"].includes(role)) {
            return NextResponse.json({ message: "Valid ID and role required" }, { status: 400 });
        }

        if (id === authUser.id) {
            return NextResponse.json({ message: "Cannot change your own role" }, { status: 400 });
        }

        await connectDB();
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}
