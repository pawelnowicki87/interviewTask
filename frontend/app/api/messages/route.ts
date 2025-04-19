import { NextResponse } from "next/server";
import { fakeMessages } from "@/lib/fakeDb";

// GET /api/messages
export async function GET() {
  return NextResponse.json(fakeMessages);
}

// POST /api/messages
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.content || typeof body.content !== "string") {
    return NextResponse.json({ error: "Brak treści wiadomości" }, { status: 400 });
  }

  const newMessage = {
    id: fakeMessages.length > 0 ? fakeMessages[fakeMessages.length - 1].id + 1 : 1,
    content: body.content,
  };

  fakeMessages.push(newMessage);

  return NextResponse.json(newMessage, { status: 201 });
}
