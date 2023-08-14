import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "~/router.tsx";

import "./index.css";
import "~/styles/bggStats/username.css";
import { PlayFilterProvider } from "./contexts/playFilterContext.tsx";
import { PlayResultsProvider } from "./contexts/playResultsContext.tsx";
import { UserProvider } from "./contexts/userContext/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <PlayFilterProvider>
        <PlayResultsProvider>
          <RouterProvider router={router} />
        </PlayResultsProvider>
      </PlayFilterProvider>
    </UserProvider>
  </React.StrictMode>
);
