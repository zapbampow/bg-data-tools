import { PlayFilterProvider } from "~/contexts/playFilterContext";
import { PlayResultsProvider } from "~/contexts/playResultsContext";
import PlaysDashboard from "~/components/pages/PlaysDashboard";
// import { addUsageData } from "~/services/prismaService/bggStats";

// export const loader: LoaderFunction = ({ params }) => {
//   let username = params.username;
//   invariant(username, "Expects a username");

//   if (username) {
//     addUsageData({ username: username as string, page: "dashboard" });
//   }

//   return username;
// };

// export const meta: V2_MetaFunction = ({ data }) => [
//   {
//     title: `BGG Stats for ${data}`,
//   },
// ];

// export const links: LinksFunction = () => {
//   return [
//     { rel: "stylesheet", href: styles },
//     { rel: "stylesheet", href: datePickerStyles },
//     { rel: "preconnect", href: "https://fonts.googleapis.com" },
//     {
//       rel: "preconnect",
//       href: "https://fonts.gstatic.com",
//       crossOrigin: "anonymous",
//     },
//     {
//       rel: "stylesheet",
//       href: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
//     },
//   ];
// };

export function Component() {
  return (
    <PlayFilterProvider>
      <PlayResultsProvider>
        <PlaysDashboard />
      </PlayResultsProvider>
    </PlayFilterProvider>
  );
}
