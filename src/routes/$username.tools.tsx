import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "~/components/pages/layout";

export default function tools() {
  return (
    <Container>
      {/* <ToolSelector /> */}
      <Outlet />
    </Container>
  );
}
