import { useState } from "react";
import StepControlls from "./steps/stepControlls";
import StepsBase from "./steps/stepsBase";

interface MultistepFormBaseProps {
  steps: Step[];
  getInputFieldComponent: (
    fieldName: string,
    validationCallback: (fieldName: string, isValid: boolean) => void
  ) => JSX.Element;
  onSubmit: () => void;
}

export interface Step {
  title: string;
  fields: string[];
}

export interface MultistepFormInputFieldComponentProps {
  valueChanged: (val: any) => void;
  getValue: () => any;
  validityChanged?: (isValid: boolean) => void;
}

export default function MultistepFormBase(props: MultistepFormBaseProps) {
  const { steps, getInputFieldComponent, onSubmit } = props;
  const [currentStepInd, setCurrentStepInd] = useState(0);
  const [invalidFields, setInvalidFields] = useState([] as string[]);
  const nextStep = () => {
    if (currentStepInd + 1 >= steps.length) return;
    setCurrentStepInd(currentStepInd + 1);
    onSubmit();
  };
  const prevStep = () => {
    if (currentStepInd - 1 < 0) return;
    setCurrentStepInd(currentStepInd - 1);
  };
  const validityChanged = (fieldName: string, isValid: boolean) => {
    const newList = [...invalidFields];
    if (!isValid) {
      if (!invalidFields.includes(fieldName)) {
        newList.push(fieldName);
        setInvalidFields(newList);
      }
    } else if (invalidFields.includes(fieldName)) {
      setInvalidFields(newList.filter((x) => x != fieldName));
    }
  };
  return (
    <form>
      <StepsBase
        stepTitles={steps.map((x) => x.title)}
        currentStepInd={currentStepInd}
        className="mb-8"
      />
      {steps[currentStepInd].fields.map((val) =>
        getInputFieldComponent(val, validityChanged)
      )}
      <StepControlls
        nextStep={nextStep}
        prevStep={prevStep}
        currentStepInd={currentStepInd}
        maxStepInd={steps.length - 1}
        isNextDisabled={invalidFields.length > 0}
      />
    </form>
  );
}
