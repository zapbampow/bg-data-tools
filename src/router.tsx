
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  // createHashRouter,
} from "react-router-dom";

import Root from "~/routes/root.tsx";
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
        path="collection"
        lazy={() => import("~/routes/collection.tsx")}
      >
        <Route
          path=":username"
          lazy={() => import("~/routes/collection.$username.tsx")}
        />
      </Route>

      <Route path=":username" lazy={() => import("~/routes/$username.tsx")}>
        <Route
          path="plays"
          lazy={() => import("~/routes/$username.plays.tsx")}
        />
        <Route
          path="tools/first-plays"
          lazy={() => import("~/routes/$username.tools.first-plays.tsx")}
        />
        <Route
          path="tools"
          lazy={() => import("~/routes/$username.tools.tsx")}
        />

      </Route>
      
      {/* <Route path=":username" lazy={() => import("~/routes/$username.tsx")} /> */}
    </Route>
  )
  // { basename: import.meta.env.BASE_URL }
);

export default router;
