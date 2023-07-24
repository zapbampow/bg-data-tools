import type { LoaderFunction } from "react-router-dom";
import { Outlet, redirect } from "react-router-dom";
import "~/styles/bggStats/username.css";
import "~/styles/bggStats/datePickerStyles.css";

// Until other features are built, this route simply redirects to $username/plays
export const loader: LoaderFunction = async ({ params }) => {
  const { username } = params;
  console.log("username in $username", username);
  // redirect to the PlayDashboard if not directed otherwise
  return redirect(`/${username}/plays`);
};

export default function Index() {
  return <Outlet />;
}
