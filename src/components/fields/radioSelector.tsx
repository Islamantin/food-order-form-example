import { useEffect, useState } from "react";
import {
  InputFieldComponentProps,
  ValidationError,
  getValidatedErrorIds,
} from "../multistepFormBase";

interface RadioSelectorProps extends InputFieldComponentProps {
  options: string[];
  validationErrors?: ValidationError[];
  labelText?: string;
  className?: string;
}

// input component for radio-like selection
export default function RadioSelector(props: RadioSelectorProps) {
  const {
    onValueUpdated,
    onValidated,
    getValue,
    options,
    validationErrors,
    labelText,
    className,
  } = props;
  const [displayValue, setDisplayValue] = useState(getValue());
  const [errorIds, setErrorIds] = useState([] as string[]);
  useEffect(() => {
    if (errorIds.length < 1) onValueUpdated(displayValue);
  }, [displayValue]);
  const styles = className ? className : "";
  return (
    <div className={"mb-4 border-2 p-4 rounded-lg " + styles}>
      {labelText && <p className="w-full mb-3 text-lg">{labelText}</p>}
      <div className="flex justify-between">
        {options.map((val, ind) => (
          <div key={"radio-select-opt-" + ind}>
            <input
              type="radio"
              value={val}
              checked={displayValue === val}
              onChange={(ev) => {
                const val = ev.target.value;
                setDisplayValue(val);
                // collecting validation error ids through general function
                const ids = validationErrors
                  ? getValidatedErrorIds(validationErrors, val)
                  : [];
                setErrorIds(ids);
                // passing validation result back to parent component
                if (onValidated) onValidated(ids.length < 1);
              }}
              className="hidden peer"
            />
            <label
              onClick={(ev: any) => {
                // passing input to radio-button
                const input: HTMLInputElement = ev.target.previousSibling;
                input.click();
              }}
              className={
                "block bg-white cursor-pointer select-none rounded-lg shadow-md w-36 p-4 text-center peer-checked:_selected hover:_highlighted"
              }
            >
              {val}
            </label>
          </div>
        ))}
      </div>
      {/* error message output */}
      {validationErrors &&
        validationErrors.map(
          (err, ind) =>
            errorIds.includes(err.id) && (
              <p
                key={"radio-select-err-" + ind}
                className="mt-4 text-red-700 text-right"
              >
                {err.message}
              </p>
            )
        )}
    </div>
  );
}
