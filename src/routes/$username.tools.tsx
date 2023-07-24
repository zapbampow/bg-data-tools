import React from "react";
import { Outlet, redirect } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import { Container } from "~/components/pages/layout";

export const loader: LoaderFunction = async ({ params }) => {
  const { username } = params;
  console.log("username in $username", username);
  // redirect to the PlayDashboard if not directed otherwise
  return redirect(`/${username}/tools/first-plays`);
};

export default function tools() {
  return (
    <Container>
      {/* <ToolSelector /> */}
      <Outlet />
    </Container>
  );
}
