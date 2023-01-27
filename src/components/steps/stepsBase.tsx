import StepIndicator from "./stepIndicator";

interface StepsBaseProps {
  stepTitles: string[];
  currentStepInd: number;
  className?: string;
}

export default function StepsBase(props: StepsBaseProps) {
  const { stepTitles, currentStepInd, className } = props;
  const styles = className ? className : "";
  return (
    <div
      className={
        "top rounded-lg shadow-md bg-white m-auto overflow-hidden grid grid-flow-col mb-8 pointer-events-none " +
        styles
      }
    >
      {stepTitles.map((val, ind) => (
        <StepIndicator
          key={"step" + val}
          title={val}
          className={
            (ind < stepTitles.length - 1 ? "border-r-2" : "") +
            " " +
            (ind == currentStepInd ? "_selected" : "")
          }
        />
      ))}
    </div>
  );
}
