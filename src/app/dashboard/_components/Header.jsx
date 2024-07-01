"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Link href={"/"}>
        <h1
          className="font-bold text-2xl text-primary"
          style={{
            fontFamily: "Lexend, sans-serif",
          }}
        >
          PrepMind
        </h1>
      </Link>
      <ul className="hidden md:flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all ease-in-out duration-300 cursor-pointer
          ${path === "/dashboard" ? "text-primary font-bold" : ""}
          `}
          >
            Dashboard
          </li>
        </Link>
        <li
          className={`hover:text-primary hover:font-bold transition-all ease-in-out duration-300 cursor-pointer
          ${path === "/dashboard/questions" ? "text-primary font-bold" : ""}
          `}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all ease-in-out duration-300 cursor-pointer
          ${path === "/dashboard/upgrade" ? "text-primary font-bold" : ""}
          `}
        >
          Upgrade
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all ease-in-out duration-300 cursor-pointer
          ${path === "/dashboard/how" ? "text-primary font-bold" : ""}
          `}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
