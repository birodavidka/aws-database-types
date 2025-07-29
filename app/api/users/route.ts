import { NextResponse } from "next/server";
import { executeSQL } from "@/lib/rdsClient";

export async function GET() {
  const users = await executeSQL<{ id: number; name: string }>(
    "SELECT id, name FROM users;"
  );
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const result = await executeSQL<any>(
      "INSERT INTO users (name) VALUES (:name);",
      [{ name: 'name', value: { stringValue: name } }]
    );
    const insertId = result[0]?.generatedFields?.[0]?.longValue;
    return NextResponse.json({ id: insertId, name }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}