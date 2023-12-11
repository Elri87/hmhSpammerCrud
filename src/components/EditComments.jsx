"use client";
import API_URL from "@/lib/API-URL.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditComments({ id, setCommentVisible }) {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  //this is to check if comment is in edit box
  async function handleComment() {
    if (commentText.length == 0) {
      alert("enter text to submit");
      return;
    }
    const response = await fetch(`${API_URL}/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
      }),
      cache: "no-store",
    });
    if (response.ok) {
      setCommentVisible(""); //make comment box disapear
      setCommentText(""); //reset the comment text
      router.refresh();
    }
  }

  const handleCancel = () => {
    setCommentVisible(false);
    //setCommentVisible("");
    setCommentText("");
  };

  return (
    <div className="editComment-container">
      <input
        type="text"
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
      />
      <button onClick={handleComment} className="editComment-button">
        Comment
      </button>
      <button onClick={handleCancel} className="editComment-button">
        Cancel
      </button>
    </div>
  );
}
