import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

//http://localhost:3000/api/posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!posts) {
      return NextResponse.json({ success: false, error: "No Posts exist" });
    }
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

//http://localhost:3000/api/posts
export async function POST(request, response) {
  // we need a message from the client
  // how can i access the json they sent in the body of their request?

  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide text to for your post.",
      });
    }
    const post = await prisma.post.create({ data: { text } });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
