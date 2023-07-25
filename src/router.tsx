import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Root from "~/routes/root.tsx";
import BGGStatsHome from "~/routes/index.tsx";
import { action as homeAction } from "~/components/forms/UsernameForm.tsx";
import Username, { loader as usernameLoader } from "~/routes/$username.tsx";
import Tools, { loader as toolsLoader } from "~/routes/$username.tools.tsx";
import FirstPlays from "~/routes/$username.tools.first-plays.tsx";
import PlayDashboard from "~/routes/$username.plays.tsx";
import Settings from "~/routes/settings.tsx";
import Feedback from "~/routes/feedback.tsx";
/**
 * TODO
 * Add routes using same paths as original
 * Add loaders and actions to routes
 * Add Error Elements to routes
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<BGGStatsHome />} action={homeAction} />
      <Route path="/:username/plays" element={<PlayDashboard />} />
      <Route path="/:username/tools/first-plays" element={<FirstPlays />} />
      <Route path="/:username/tools" element={<Tools />} loader={toolsLoader} />
      <Route path="/:username" element={<Username />} loader={usernameLoader} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/feedback" element={<Feedback />} />
    </Route>
  )
);

export default router;
