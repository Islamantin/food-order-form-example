import { useState } from "react";
import StepsControlls from "./steps/stepsControlls";
import StepsIndicator from "./steps/stepsIndicator";
import utils from "src/utils";

interface MultistepFormBaseProps {
  steps: Step[];
  getFieldComponent: (
    fieldName: string,
    validationCallback: (fieldName: string, isValid: boolean) => void
  ) => JSX.Element;
  onStepChanged: (beforeInd: number, afterInd: number) => void;
  onSubmit: () => void;
}

export interface Step {
  title: string;
  fields: string[];
  extraComponents?: string[];
}

export interface InputFieldComponentProps {
  onValueUpdated: (val: any) => void;
  getValue: () => any;
  onValidated?: (isValid: boolean) => void;
}

export interface ValidationError {
  id: string;
  message: string;
  condition: (value: any, extraParams?: any) => boolean;
}

export default function MultistepFormBase(props: MultistepFormBaseProps) {
  const { steps, getFieldComponent, onStepChanged, onSubmit } = props;
  const [currentStepInd, setCurrentStepInd] = useState(0);
  const [invalidFields, setInvalidFields] = useState([] as string[]);
  const nextStep = () => {
    if (currentStepInd + 1 >= steps.length) return;
    setCurrentStepInd(currentStepInd + 1);
    onStepChanged(currentStepInd, currentStepInd + 1);
  };
  const prevStep = () => {
    if (currentStepInd - 1 < 0) return;
    setInvalidFields(
      invalidFields.filter((x) => !steps[currentStepInd].fields.includes(x))
    );
    setCurrentStepInd(currentStepInd - 1);
    onStepChanged(currentStepInd, currentStepInd - 1);
  };
  const validityChanged = (fieldName: string, isValid: boolean) => {
    if (!isValid) {
      setInvalidFields(utils.uniquePush(invalidFields, fieldName));
    } else {
      setInvalidFields(invalidFields.filter((x) => x != fieldName));
    }
  };
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit();
      }}
    >
      <StepsIndicator
        stepTitles={steps.map((x) => x.title)}
        currentStepInd={currentStepInd}
        className="mb-8"
      />
      {steps[currentStepInd].fields.map((val) =>
        getFieldComponent(val, validityChanged)
      )}
      <StepsControlls
        nextStep={nextStep}
        prevStep={prevStep}
        currentStepInd={currentStepInd}
        maxStepInd={steps.length - 1}
        isNextDisabled={invalidFields.length > 0}
      />
    </form>
  );
}

export function getValidatedErrorIds(
  errors: ValidationError[],
  val: any,
  extraParams?: any
) {
  let errorIds: string[] = [];
  errors.forEach((err) => {
    if (err.condition(val, extraParams)) {
      errorIds = utils.uniquePush(errorIds, err.id);
    } else {
      errorIds = errorIds.filter((x) => x != err.id);
    }
  });
  return errorIds;
}
