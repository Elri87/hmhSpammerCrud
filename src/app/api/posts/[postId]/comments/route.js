import { prisma } from "@/lib/prisma.js";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server.js";

export async function GET() {
  const comments = await prisma.comment.findMany();
  return NextResponse.json({ success: true, comments });
}

/*export async function GET() {
  try {
    const { postId } = response.params;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found",
      });
    }
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
    });
    if (comments.length == 0) {
      return NextResponse.json({
        success: false,
        error: "This post has no comments",
      });
    }
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}*/

//POST Request
//http://localhost:3000/api/posts/{id}/comments
export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const { text, createdAt } = await request.json();

    const comments = await prisma.comment.findUnique({
      where: { id: postId },
    });

    if (!comments) {
      /*return NextResponse.json({
        success: false,
        error: "You must provide text to for your comment.",
      });*/
      const newComment = await prisma.comment.create({
        data: { id: postId, text, createdAt, postId },
      });
      return NextResponse.json({ success: true, comment: newComment });
    }
    const updatedComment = await prisma.comment.update({
      where: { id: postId },
      data: { text, createdAt, postId },
    });
    return NextResponse.json({ success: true, comment: updatedComment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
