import { useState } from "react";
import StepControlls from "./steps/stepControlls";
import StepsBase from "./steps/stepsBase";

interface FormBaseProps {
  steps: Step[];
  getInputComponent: (fieldName: string) => JSX.Element;
  validateField: (value: any, fieldName: string) => boolean;
}

export interface Step {
  title: string;
  fields: string[];
}

export default function MultistepFormBase(props: FormBaseProps) {
  const { steps, getInputComponent } = props;
  const [currentStepInd, setCurrentStepInd] = useState(0);
  const nextStep = () => {
    if (currentStepInd + 1 >= steps.length) return;
    setCurrentStepInd(currentStepInd + 1);
  };
  const prevStep = () => {
    if (currentStepInd - 1 < 0) return;
    setCurrentStepInd(currentStepInd - 1);
  };
  return (
    <form className="form-base shadow-lg w-full p-10 rounded-lg bg-slate-100 max-w-xl">
      <h1 className=" text-3xl mb-8 text-center">Meal Pre-Order</h1>
      <StepsBase
        stepTitles={steps.map((x) => x.title)}
        currentStepInd={currentStepInd}
        className="mb-8"
      />
      {steps[currentStepInd].fields.map((val) => getInputComponent(val))}
      <StepControlls
        nextStep={nextStep}
        prevStep={prevStep}
        currentStepInd={currentStepInd}
        maxStepInd={steps.length - 1}
      />
    </form>
  );
}
