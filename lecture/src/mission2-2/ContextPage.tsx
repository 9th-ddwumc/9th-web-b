import React from "react";
import Nav from "./Navbar";
import ThemeContent from "./ThemeContent";

export default function Context() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Nav />
        <main className="flex-1 w-full ">
          <ThemeContent />
        </main>
      </div>
    </>
  );
}
