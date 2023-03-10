import { useEffect, useState } from "react";
import {
  InputFieldComponentProps,
  ValidationError,
  getValidatedErrorIds,
} from "../multistepFormBase";
import utils from "src/utils";

export interface SliderProps extends InputFieldComponentProps {
  min: number;
  max: number;
  validationErrors?: ValidationError[];
  labelText?: string;
}

// input field that controls integer numbers
export default function Slider(props: SliderProps) {
  const {
    onValueUpdated,
    onValidated,
    getValue,
    min,
    max,
    validationErrors,
    labelText,
  } = props;
  const [displayValue, setDisplayValue] = useState(
    utils.clamp(min, max, getValue())
  );
  const [errorIds, setErrorIds] = useState([] as string[]);
  useEffect(() => {
    // data will be updated only if there's no errors at the next render after display update
    if (errorIds.length < 1) onValueUpdated(displayValue);
  }, [displayValue]);
  return (
    <div className="mb-4 border-2 p-4 rounded-lg">
      <div className="flex justify-between mb-3 text-lg">
        {labelText ? <label>{labelText}</label> : <div />}
        <label>{displayValue}</label>
      </div>
      <input
        onChange={(ev) => {
          const val = ev.target.value;
          setDisplayValue(val as any);
          // collecting validation error ids through general function 
          const ids = validationErrors
            ? getValidatedErrorIds(validationErrors, val, { min, max })
            : [];
          setErrorIds(ids);
          // passing validation result back to parent component
          if (onValidated) onValidated(ids.length < 1);
        }}
        step="1"
        type="range"
        min={min}
        max={max}
        value={displayValue}
        className="_slider border-b-2"
      />
      {/* error message output */}
      {validationErrors &&
        validationErrors.map(
          (err, ind) =>
            errorIds.includes(err.id) && (
              <p
                key={"slider-err-" + ind}
                className="mt-4 text-red-700 text-right"
              >
                {err.message}
              </p>
            )
        )}
    </div>
  );
}
