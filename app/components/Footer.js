"use client";
import React from "react";
import { useRouter } from "next/navigation";
function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-gray-200 p-4 mt-8">
      <div
        className="container mx-auto text-center text-black"
        onClick={() => {
          router.push("/recipes");
        }}
      >
        <p>&copy; 2024 Recipe Finder. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
