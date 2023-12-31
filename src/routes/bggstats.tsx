import { Outlet } from "react-router-dom";
import "~/styles/bggStats/username.css";

import Navbar from "~/components/navbar";
import { Suspense } from "react";

export default function BggStats() {
  // Disable console.log in production
  if (process.env.NODE_ENV === "production") {
    console.log("BGG Stats App - Production mode");
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  } else if (process.env.NODE_ENV === "development") {
    console.log("BGG Stats App - Development mode");
  }

  return (
    <Suspense fallback={<Fallback />}>
      <div className="relative min-h-screen bgg-gradient bg-slate-200">
        <Navbar />
        <Outlet />
      </div>
    </Suspense>
  );
}

const Fallback = () => <div />;
