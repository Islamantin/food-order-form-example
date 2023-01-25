import StepsBase from "./steps/stepsBase";

export default function FormBase(props: any) {
  return (
    <div
      className="shadow-lg w-full p-10 rounded-lg bg-slate-100"
    >
      <StepsBase stepsCount={4} />
    </div>
  );
}
