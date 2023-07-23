import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Root from "~/routes/root.tsx";
import BGGStatsHome from "~/routes/index.tsx";
import { action as homeAction } from "~/components/forms/UsernameForm.tsx";
import Username, { loader as usernameLoader } from "~/routes/$username.tsx";
import PlayDashboard from "~/routes/$username.plays.tsx";
/**
 * TODO
 * Add routes using same paths as original
 * Add loaders and actions to routes
 * Add Error Elements to routes
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<BGGStatsHome />} action={homeAction}></Route>
      <Route path="/:username/plays" element={<PlayDashboard />} />
      <Route
        path="/:username"
        element={<Username />}
        loader={usernameLoader}
        // action={homeAction}
      ></Route>
    </Route>
  )
);

export default router;
