import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export async function GET(req: Request) {
  const user = getAuthUser(req as any);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}
