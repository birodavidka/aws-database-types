// app/api/users/route.ts
import { NextResponse } from "next/server";
import { executeSQL } from "@/lib/rdsClient";

export async function GET() {
  const users = await executeSQL<{ id: number; name: string }>(
    "SELECT id, name FROM users;",
  );
  return NextResponse.json(users);
}
