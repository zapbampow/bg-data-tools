import UsernameForm from "~/components/forms/UsernameForm";

export default function BGGStatsHome() {
  return (
    <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 w-fit sm:w-max">
      <h1 className="mb-8 text-6xl font-semibold text-center text-slate-100">
        BGG Play Stats
      </h1>
      <UsernameForm />
    </div>
  );
}
