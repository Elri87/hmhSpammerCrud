"use client";

import { RiUserHeartLine } from "react-icons/ri";
import { useRouter } from "next/navigation.js";
import API_URL from "@/lib/API-URL.js";
import { useState, useEffect } from "react";

export function Comments({ id }) {
  const [comment, setComment] = useState();
  const router = useRouter();

  async function fetchComments() {
    const res = await fetch(`${API_URL}/api/posts/${id}/comments`);
    const result = await res.json();
    setComment(result.comments);
  }

  useEffect(() => {
    fetchComments();
  });

  return (
    <div className="editComment-container">
      <ul className="comments">
        {comment &&
          comment.map((item) => (
            <li key={item.id}>
              <RiUserHeartLine />
              {item.text}
            </li>
          ))}
      </ul>
    </div>
  );
}
