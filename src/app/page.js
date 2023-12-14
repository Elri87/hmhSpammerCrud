import NewMessage from "@/components/NewMessage.jsx";
import Messages from "@/components/Messages.jsx";
import { prisma } from "@/lib/prisma.js";

//import API_URL from "@/lib/API-URL.js";

export const dynamic = "force-dynamic";

export default async function Home() {
  //GET messages
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  //const res = await fetch(`/api/posts`, { cache: "no-store" });
  //const info = await res.json();
  //const posts = info.posts;
  //console.log(info);
  console.log(posts);

  return (
    <div className="body-container">
      <h1>Spammer</h1>
      <NewMessage />
      <Messages posts={posts} />
    </div>
  );
}
