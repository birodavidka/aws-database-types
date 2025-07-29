import { NextResponse } from "next/server";
import { executeSQL } from "@/lib/rdsClient";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    await executeSQL(
      "UPDATE users SET name = :name WHERE id = :id;",
      [
        { name: 'name', value: { stringValue: name } },
        { name: 'id', value: { longValue: id } }
      ]
    );
    return NextResponse.json({ id, name });
  } catch (error: any) {
    console.error('PUT /api/users/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await executeSQL(
      "DELETE FROM users WHERE id = :id;",
      [{ name: 'id', value: { longValue: id } }]
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/users/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}