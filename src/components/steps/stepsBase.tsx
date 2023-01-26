import StepIndicator from "./stepIndicator";

export interface StepsBaseProps {
  stepsCount: number;
}

export default function StepsBase(props: StepsBaseProps) {
  const stepNumbers = Array.from({ length: props.stepsCount }, (_, i) => i + 1);
  return (
    <div className="flex justify-center">
      {stepNumbers.map((val) => (
        <StepIndicator key={"step" + val} stepNumber={val} />
      ))}
    </div>
  );
}
