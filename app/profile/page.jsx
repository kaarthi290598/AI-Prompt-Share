"use client";

import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { useQueryClient } from "@tanstack/react-query";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id, queryClient]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        queryClient.invalidateQueries({
          queryKey: "prompt",
        });
      } catch {
        alert("Something went wrong");
      }
    }
    const filteredPosts = posts.filter((p) => p._id !== post._id);

    setPosts(filteredPosts);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
