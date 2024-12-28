"use client";

import Image from "next/image";
import Wrapper from "./components/Wrapper";

export default function Home() {
  return (
    <main className="App">
      <div className="container">
        <svg
          className="globe-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <h1>Chat With Your Website</h1>
        <Wrapper />
      </div>
    </main>
  );
}
