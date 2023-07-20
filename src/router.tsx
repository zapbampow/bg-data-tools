import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Root from "~/routes/root.tsx";
import BGGStatsHome, { action as homeAction } from "~/routes/index.tsx";

/**
 * TODO
 * Add routes using same paths as original
 * Add loaders and actions to routes
 * Add Error Elements to routes
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} action={homeAction}>
      <Route path="/" element={<BGGStatsHome />} action={homeAction}></Route>
      <Route
        path="/:username"
        element={<BGGStatsHome />}
        action={homeAction}
      ></Route>
    </Route>
  )
);

export default router;
