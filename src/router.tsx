import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  // createHashRouter,
} from "react-router-dom";

import Root from "~/routes/root.tsx";
// import BGGStatsHome from "~/routes/index.tsx";
// import { action as homeAction } from "~/components/forms/UsernameForm.tsx";
// import Username, { loader as usernameLoader } from "~/routes/$username.tsx";
// import Tools, { loader as toolsLoader } from "~/routes/$username.tools.tsx";
// import FirstPlays from "~/routes/$username.tools.first-plays.tsx";
// import PlayDashboard from "~/routes/$username.plays.tsx";
// import Settings from "~/routes/settings.tsx";
// import Feedback from "~/routes/feedback.tsx";
// import About from "~/routes/about.tsx";
// import HowToUse from "~/routes/how-to-use.tsx";

/**
 * TODO
 * Add Error Elements to routes
 * FINISH: you added aggregator context. And you added MINUS symbol to # Days Played card. Add that to the other cards
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index lazy={() => import("~/routes/index.tsx")} />
      <Route path="settings" lazy={() => import("~/routes/settings.tsx")} />
      <Route path="feedback" lazy={() => import("~/routes/feedback.tsx")} />
      <Route path="about" lazy={() => import("~/routes/about.tsx")} />
      <Route path="how-to-use" lazy={() => import("~/routes/how-to-use.tsx")} />
      <Route
        path=":username/plays"
        lazy={() => import("~/routes/$username.plays.tsx")}
      />
      <Route
        path=":username/tools/first-plays"
        lazy={() => import("~/routes/$username.tools.first-plays.tsx")}
      />
      <Route
        path=":username/tools"
        lazy={() => import("~/routes/$username.tools.tsx")}
      />
      <Route path=":username" lazy={() => import("~/routes/$username.tsx")} />
    </Route>
  )
  // { basename: import.meta.env.BASE_URL }
);

export default router;
