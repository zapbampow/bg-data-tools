import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";
import useLastUsername from "~/hooks/useLastUsername.tsx";

export default function Root() {
  // useLastUsername here is only used to store the username in localStorage
  useLastUsername();
  return (
    <div className="relative min-h-screen bgg-gradient">
      <Navbar />
      <Outlet />
    </div>
  );
}
