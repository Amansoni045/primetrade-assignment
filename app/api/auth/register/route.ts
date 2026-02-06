import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed });

  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
