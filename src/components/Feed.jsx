/*import { prisma } from "@/lib/prisma.js";
import NewMessage from "./NewMessage.jsx";

export default async function Feed() {
  const feed = await prisma.post.findMany();

  return (
    <div id="feed">
      {feed.map((post) => {
        return <NewMessage key={post.id} post={post} />;
      })}
    </div>
  );
}*/
