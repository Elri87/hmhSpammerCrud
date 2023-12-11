"use client";
import { useRouter } from "next/navigation.js";
import API_URL from "@/lib/API-URL.js";
import { useState } from "react";

export default function EditBox({
  text,
  id,
  setId,
  setCommentVisible,
  setCommentText,
}) {
  const [editedText, setEditedText] = useState(text);
  //const [cancelEdit, setCancelEdit] = useState(false);

  //Cancel
  //const [showComment, setShowComment] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setEditedText(e.target.value);
  }

  async function handleEdit() {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: editedText,
      }),
      cache: "no-store",
    });
    setId(""); //clears the input after submit
    router.refresh();
  }

  function handleCancel() {
    //setShowComment(false);
    //setCancelEdit(true);
    //setEditedText("");
    setCommentVisible(false);
    //setCommentVisible("");
    setCommentText("");
  }

  return (
    <div>
      <input type="text" onChange={handleChange} value={editedText} />
      <button onClick={handleEdit}>Edit Post</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

//editedText what the user have typed
