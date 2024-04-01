"use client";

import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

const MyProfile = ({ params }) => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const searchParams = useSearchParams();

  const userName = searchParams.get("name");

  //console.log(params);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id, params?.id]);

  console.log(posts);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default MyProfile;
