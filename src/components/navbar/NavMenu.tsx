import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import {
  // GithubIcon,
  Info,
  Meeple,
  Menu as MenuIcon,
  Settings,
  Send,
  SignRight,
  Refresh,
} from "../icons";
import { useParams, Link, useLocation } from "react-router-dom";
import usePlayData from "~/hooks/bgg/usePlayData.tsx";

const resourceLinks = [
  {
    href: "/about",
    label: "About",
    icon: <Info width={16} />,
  },
  {
    href: "/how-to-use",
    label: "How to Use",
    icon: <SignRight width={16} />,
  },
  {
    href: "/feedback",
    label: "Feedback",
    icon: <Send width={16} />,
  },
  // {
  //   href: "https://github.com/zapbampow/bggStats",
  //   label: "See the code",
  //   external: true,
  //   icon: <GithubIcon />,
  // },
];

const toolLinks = (username: string | undefined, pathname: string) => {
  let links = [
    {
      href: `/${username}/plays`,
      label: "Plays Dashboard",
      icon: <Meeple width={16} />,
      onlyWithUsername: true,
    },
    {
      href: `/${username}/tools/first-plays`,
      label: "First Recorded Plays Tool",
      icon: <Meeple width={16} />,
      onlyWithUsername: true,
    },
    {
      href: "/settings",
      label: "Manage your data",
      icon: <Settings width={16} />,
    },
  ];

  return links.filter((link) => {
    // if no username, only show links that don't require a username
    if (!username) return !link?.onlyWithUsername;

    // don't show the current page
    const endOfPath = pathname.split("/").pop();
    const endOfLink = link.href.split("/").pop();
    if (endOfPath === endOfLink) return false;

    return true;
  });
};

const h3Styles = "text-sm font-semibold uppercase opacity-60";

export default function NavMenu() {
  const { username } = useParams();
  const { pathname } = useLocation();

  const tools = toolLinks(username, pathname);

  const { manuallyUpdate, loading } = usePlayData();

  async function forceUpdate(e: any, close: () => void) {
    await manuallyUpdate(e);

    close();
  }

  return (
    <Menu>
      <Menu.Button className="text-slate-100" aria-label="Open navigation menu">
        <MenuIcon />
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-10 flex flex-col gap-4 p-4 text-white rounded-md top-8 w-max bg-slate-900">
        <h3 className={h3Styles}>Tools</h3>

        {tools?.map((link) => (
          <Menu.Item key={link.href} as={Fragment}>
            <Link to={link.href}>
              <div className="flex items-center gap-2">
                {link.icon} {link.label}
              </div>
            </Link>
          </Menu.Item>
        ))}

        {username && (
          <Menu.Item as={Fragment}>
            {({ close }) => (
              <button onClick={(e) => forceUpdate(e, close)}>
                <div className="flex items-center gap-2">
                  <Refresh
                    width={16}
                    className={`${loading ? "animate-spin" : ""}`}
                  />
                  {`Get ${username}'${
                    username[username.length - 1] !== "s" ? "s" : ""
                  } newest data`}
                </div>
              </button>
            )}
          </Menu.Item>
        )}

        <h3 className={h3Styles}>Resources</h3>
        {resourceLinks?.map((link) => (
          <Menu.Item key={link.href} as={Fragment}>
            {/* {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1"
              >
                <div className="flex items-center gap-2">
                  {link.icon} {link.label}
                </div>
              </a>
            ) : ( */}
            <Link to={link.href}>
              <div className="flex items-center gap-2">
                {link.icon} {link.label}
              </div>
            </Link>
            {/* )} */}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
