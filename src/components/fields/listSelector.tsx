import { useEffect, useState } from "react";
import {
  InputFieldComponentProps,
  ValidationError,
  getValidatedErrorIds,
} from "../multistepFormBase";

interface ListSelectorProps extends InputFieldComponentProps {
  list: string[];
  validationErrors?: ValidationError[];
  labelText?: string;
}

export default function ListSelector(props: ListSelectorProps) {
  const {
    onValueUpdated,
    onValidated,
    getValue,
    list,
    validationErrors,
    labelText,
  } = props;
  const [displayValue, setDisplayValue] = useState(getValue());
  const [errorIds, setErrorIds] = useState([] as string[]);
  const [isTouched, setIsToched] = useState(false);
  const updateDisplayAndValidate = (val: any) => {
    setDisplayValue(val);
    const ids = validationErrors
      ? getValidatedErrorIds(validationErrors, val)
      : [];
    setErrorIds(ids);
    if (onValidated) onValidated(ids.length < 1);
  };
  useEffect(() => {
    updateDisplayAndValidate(displayValue);
    if (errorIds.length < 1) onValueUpdated(displayValue);
  }, [displayValue]);
  return (
    <div className="border-2 p-4 rounded-lg mb-4">
      <div className="flex justify-between mb-3 text-lg">
        {labelText ? <label>{labelText}</label> : <div />}
        {displayValue ? <label>{displayValue}</label> : <div />}
      </div>
      <div
        className={
          " max-h-60 w-full " + (list.length > 5 ? "overflow-y-scroll" : "")
        }
      >
        <ul>
          {list.map((val, ind) => {
            return (
              <li key={"list-option-" + ind}>
                <input
                  type="radio"
                  className="hidden peer"
                  checked={displayValue === val}
                  value={val}
                  onChange={(ev) => {
                    const val = ev.target.value;
                    updateDisplayAndValidate(val);
                  }}
                />
                <label
                  onClick={(ev: any) => {
                    setIsToched(true);
                    const input: HTMLInputElement = ev.target.previousSibling;
                    input.click();
                  }}
                  className={
                    "block bg-white cursor-pointer select-none shadow-md w-full p-4 text-center border-b-2 peer-checked:_selected hover:_highlighted"
                  }
                >
                  {val}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {isTouched &&
        validationErrors &&
        validationErrors.map(
          (err, ind) =>
            errorIds.includes(err.id) && (
              <p
                key={"list-select-err-" + ind}
                className="mt-4 text-red-700 text-right"
              >
                {err.message}
              </p>
            )
        )}
    </div>
  );
}
