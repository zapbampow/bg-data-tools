import UsernameForm from "~/components/forms/UsernameForm";
import { redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import db from "~/services/usageService";
import { useEffect } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username");
  console.log("username", username);
  return redirect(`${username}`);
}

export function Component() {
  // const getData = async () => {
  //   const all = await db.users.getAll();
  //   const byUsername = await db.users.getByUsername("fakeuser2");
  //   const byId = await db.users.getByUserId(3423381);
  //   const byDate = await db.users.getByCreatedDate("2023-08-08");

  //   if (!byUsername) {
  //     const added = await db.users.add({
  //       bggUserId: 99999,
  //       username: "fakeuser2",
  //     });
  //     console.log("added", added);
  //   }

  //   console.log({ all, byUsername, byId, byDate });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 w-fit sm:w-max">
      <h1 className="mb-8 text-6xl font-semibold text-center text-slate-100">
        BGG Play Stats
      </h1>
      <UsernameForm />
    </div>
  );
}
