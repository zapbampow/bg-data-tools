import type { LoaderFunction } from "react-router-dom";
import { Outlet, redirect } from "react-router-dom";
import styles from "~/styles/bggStats/username.css";
import url from "url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// Until other features are built, this route simply redirects to $username/plays
export const loader: LoaderFunction = async ({ params, request, context }) => {
  const { username } = params;
  let pathname = url.parse(request.url).pathname;
  let splitPathname = pathname?.split("/").filter((x) => x);
  console.log("splitPathname", splitPathname);

  if (!splitPathname || splitPathname?.length <= 2) {
    // redirect to the PlayDashboard if not directed otherwise
    return redirect(`/bggstats/${username}/plays`);
  }

  return username;
};

export default function Index() {
  return <Outlet />;
}
