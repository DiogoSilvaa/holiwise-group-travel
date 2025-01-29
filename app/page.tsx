"use client";

import { signIn, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  if (!session) {
    // signIn("google");
  }
  return <div>asd</div>;
};

export default Home;
