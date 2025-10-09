import { Form, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username") as string;
  return redirect(username);
}

export default function UsernameForm() {
  return (
    <Form method="post" className="flex flex-col gap-4 md:flex-row">
      <input
        className="px-4 py-2 rounded-md bg-slate-100 invalid:border-red-500 drop-shadow-lg"
        name="username"
        type="text"
        placeholder="BGG Username"
        required
        pattern="[a-zA-Z0-9]+"
        title="Only letters and numbers are allowed"
      />
      <button
        className="px-4 py-2 text-3xl font-semibold rounded-md bg-slate-100 drop-shadow-lg"
        type="submit"
      >
        <span className="text-gradient">Submit</span>
      </button>
    </Form>
  );
}
