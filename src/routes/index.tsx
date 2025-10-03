import UsernameForm from "~/components/forms/UsernameForm";
import { redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import useLastUsername from "~/hooks/useLastUsername";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username");
  return redirect(`${username}`);
}

export function Component() {
  const navigate = useNavigate();
  const { lastUsername, hasAutoRedirected, setHasAutoRedirected } = useLastUsername();

  useEffect(() => {
    console.log({ lastUsername, hasAutoRedirected });
    if (!lastUsername || hasAutoRedirected) return;
    setHasAutoRedirected(true);
    navigate(`/${lastUsername}`);
  }, [lastUsername, setHasAutoRedirected, hasAutoRedirected, navigate]);

  return (
    <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 w-fit sm:w-max">
      <h1 className="mb-8 text-6xl font-semibold text-center text-slate-100">
        BGG Play Stats
      </h1>
      <UsernameForm />
    </div>
  );
}
