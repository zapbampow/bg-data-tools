import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import "~/styles/bggStats/username.css";
import "~/styles/bggStats/datePickerStyles.css";
import { useBggUser } from "~/hooks/bgg/useBggUser.tsx";
import { useEffect } from "react";
import { usePlayResultsContext } from "~/contexts/playResultsContext.tsx";

export function Component() {
  const { getUser, loading } = useBggUser();
  const { setFilteredResults } = usePlayResultsContext();
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const preventRedirect = location.pathname.split("/").length >= 3;

  const getCurrentUser = async () => {
    if (loading) return;
    if (!username) return;

    await getUser(username);

    if (preventRedirect) return;
    redirect();
  };

  const redirect = () => navigate(`/${username}/plays`);

  useEffect(() => {
    setFilteredResults([]);

    if (!username) return;
    getCurrentUser();
  }, [username, location.pathname]);

  return <Outlet />;
}
