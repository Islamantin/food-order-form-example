import Button from "../button";

interface StepControllsProps {
  nextStep: () => void;
  prevStep: () => void;
  currentStepInd: number;
  maxStepInd: number;
  className?: string;
}

export default function StepControlls(props: StepControllsProps) {
  const { nextStep, prevStep, currentStepInd, maxStepInd, className } = props;
  const styles = className ? className : "";
  return (
    <div className={"flex justify-between bottom " + styles}>
      {currentStepInd > 0 ? (
        <Button
          label={"Back"}
          clickCallBack={prevStep}
          className="hover:_highlighted"
        />
      ) : (
        <div />
      )}
      {currentStepInd < maxStepInd ? (
        <Button
          label={"Next"}
          clickCallBack={nextStep}
          className="hover:_highlighted"
        />
      ) : (
        <div />
      )}
    </div>
  );
}
