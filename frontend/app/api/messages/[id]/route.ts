import { NextResponse } from "next/server";
import { fakeMessages } from "@/lib/fakeDb";

// GET /api/messages/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const message = fakeMessages.find((msg) => msg.id === id);

  if (!message) {
    return NextResponse.json({ error: "Nie znaleziono wiadomości" }, { status: 404 });
  }

  return NextResponse.json(message);
}

// PATCH /api/messages/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body = await req.json();

  const index = fakeMessages.findIndex((msg) => msg.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Nie znaleziono wiadomości" }, { status: 404 });
  }

  if (!body.content || typeof body.content !== "string") {
    return NextResponse.json({ error: "Nieprawidłowa treść" }, { status: 400 });
  }

  fakeMessages[index].content = body.content;

  return NextResponse.json(fakeMessages[index]);
}

// DELETE /api/messages/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const index = fakeMessages.findIndex((msg) => msg.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Nie znaleziono wiadomości" }, { status: 404 });
  }

  fakeMessages.splice(index, 1);
  return NextResponse.json({ success: true });
}
