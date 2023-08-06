import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { HomeMeeple } from "../icons";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-2 py-4 lg:px-8">
      <Link to="/" className="flex text-slate-100" aria-label="Home">
        <HomeMeeple width={24} />
      </Link>
      {/* <div className="flex items-center text-xl font-medium text-slate-100">
        {username && `Play data for ${username}`}
      </div> */}

      <div className="relative">
        <NavMenu />
      </div>
    </nav>
  );
}
