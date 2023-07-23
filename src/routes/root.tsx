import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";

export default function Root() {
  return (
    <div className="bgg-gradient relative min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
