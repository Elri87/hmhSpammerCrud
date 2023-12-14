import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

//GET it first
export async function GET() {
  const likes = await prisma.like.findMany();
  return NextResponse.json({ success: true, likes });
}

//PUT /api/posts/{postId}/likes
export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No Post with ID found.",
      });
    }

    const updatedLike = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { likes: { increment: 1 } },
    });
    return NextResponse.json({ success: true, post: updatedLike });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
