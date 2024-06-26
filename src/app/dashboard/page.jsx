import { UserButton } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <UserButton />
    </div>
  );
}

export default page;
