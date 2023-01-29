import Button from "../button";

interface StepsControllsProps {
  nextStep: () => void;
  prevStep: () => void;
  currentStepInd: number;
  maxStepInd: number;
  isNextDisabled: boolean;
  className?: string;
}

export default function StepsControlls(props: StepsControllsProps) {
  const {
    nextStep,
    prevStep,
    currentStepInd,
    maxStepInd,
    isNextDisabled,
    className,
  } = props;
  const styles = className ? className : "";
  return (
    <div className={"flex justify-between " + styles}>
      {currentStepInd > 0 ? (
        <Button
          label={"Back"}
          clickCallBack={prevStep}
          className="hover:_highlighted"
          disabled={false}
        />
      ) : (
        <div />
      )}
      {currentStepInd < maxStepInd ? (
        <Button
          label={"Next"}
          clickCallBack={nextStep}
          className={!isNextDisabled ? "hover:_highlighted" : " bg-gray-400"}
          disabled={isNextDisabled}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
