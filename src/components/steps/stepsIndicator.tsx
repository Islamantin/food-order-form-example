interface StepsIndicatorProps {
  stepTitles: string[];
  currentStepInd: number;
  className?: string;
}

export default function StepsIndicator(props: StepsIndicatorProps) {
  const { stepTitles, currentStepInd, className } = props;
  const styles = className ? className : "";
  return (
    <div
      className={
        "rounded-lg shadow-md bg-white m-auto overflow-hidden grid grid-flow-col mb-8 pointer-events-none " +
        styles
      }
    >
      {stepTitles.map((val, ind) => {
        return (
          <div
            key={"step" + val}
            className={
              "p-2 text-center " +
              (ind < stepTitles.length - 1 ? "border-r-2" : "") +
              " " +
              (ind == currentStepInd ? "_selected" : "")
            }
          >
            {val}
          </div>
        );
      })}
    </div>
  );
}
