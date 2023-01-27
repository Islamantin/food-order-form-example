import { useEffect, useState } from "react";
import { MultistepFormInputFieldComponentProps } from "../multistepFormBase";

interface RadioSelectorProps extends MultistepFormInputFieldComponentProps {
  options: RadioSelectorOption[];
  labelText?: string;
  className?: string;
}

export interface RadioSelectorOption {
  value: string;
  label: string;
}

export default function RadioSelector(props: RadioSelectorProps) {
  const {
    valueChanged,
    getValue,
    validityChanged,
    options,
    labelText,
    className,
  } = props;
  const [value, setValue] = useState(getValue());
  const [errorMessage, setErrorMessage] = useState(null as string | null);
  useEffect(() => {
    if (!errorMessage) valueChanged(value);
  }, [value]);
  const styles = className ? className : "";
  const isValueValid = (val: string) => {
    return !!val && val.length > 0;
  };
  return (
    <div className={"border-2 p-4 rounded-lg " + styles}>
      {labelText && <p className="w-full mb-3 text-lg">{labelText}</p>}
      <div className="flex justify-between">
        {options.map((opt, ind) => (
          <div key={"radio-opt-" + ind}>
            <input
              type="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={(ev) => {
                const val = ev.target.value;
                const valid = isValueValid(val);
                setValue(val);
                if (valid) {
                  setErrorMessage(null);
                } else {
                  setErrorMessage("Value is incorrect");
                }
                if (validityChanged) validityChanged(valid);
              }}
              className="hidden peer"
            />
            <label
              onClick={(ev: any) => {
                const input: HTMLInputElement = ev.target.previousSibling;
                input.click();
              }}
              className={
                "block bg-white cursor-pointer select-none rounded-lg shadow-md w-36 p-4 text-center peer-checked:_selected hover:_highlighted"
              }
            >
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {errorMessage && <p className="mt-4 text-red-700 text-right">{errorMessage}</p>}
    </div>
  );
}
