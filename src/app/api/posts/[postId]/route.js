import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

//http://localhost:3000/api/posts/{id}
export async function GET(request, response) {
  try {
    const { postId } = response.params;

    const posts = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!posts) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    } else {
      return NextResponse.json({ success: true, posts });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

//DELETE Request Redo
export async function DELETE(request, response) {
  try {
    const { postId } = response.params;
    //delete id in db
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found",
      });
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json({
      success: true,
      deletePost,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

//http://localhost:3000/api/posts/{id}
/*export async function DELETE(request, response) {
  try {
    const { postId } = response.params;
    //delete id in db
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found",
      });
    }
    return NextResponse.json({
      success: true,
      message: post,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}*/

//PUT Rounte - http://localhost:3000/api/posts/{id}
export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();

    const postIndex = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!postIndex) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found.",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { text },
    });
    return NextResponse.json({ success: true, posts: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
