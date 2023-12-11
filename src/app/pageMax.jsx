"use client";
export default function Home() {
  const API = "https://spammer-theta.vercel.app";

  // CRUD

  // GET - get all the posts from spammer

  async function fetchPosts() {
    const response = await fetch(`${API}/api/posts`);
    const info = await response.json();
  }

  // POST - create a new post
  async function newPostRequest() {
    const response = await fetch(`${API}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "hello from lecture!",
      }),
    });
    const info = await response.json();
  }

  // PUT - update a post
  async function updatePost() {
    const response = await fetch(
      `${API}/api/posts/ce2196e2-3072-404a-b7bf-5b9d46473455`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "hello from lecture - updated!",
        }),
      }
    );
    const info = await response.json();
    console.log(info);
  }

  // add a like
  async function addLike() {
    const response = await fetch(
      `${API}/api/posts/ce2196e2-3072-404a-b7bf-5b9d46473455/likes`,
      {
        method: "POST",
        cache: "no-store",
      }
    );
    const info = await response.json();
    console.log(info);
  }

  addLike();

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}
