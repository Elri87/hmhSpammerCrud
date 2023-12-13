import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

export async function GET(request, response) {
  try {
    const { userId } = response.params;

    //check if your user exists
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "No user with that id found. No Posts available",
      });
    }

    const posts = await prisma.posts.findMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
