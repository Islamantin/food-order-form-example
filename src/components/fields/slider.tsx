import { useEffect, useState } from "react";
import utils from "../../utils";
import { MultistepFormInputFieldComponentProps } from "../multistepFormBase";

export interface SliderProps extends MultistepFormInputFieldComponentProps {
  min: number;
  max: number;
  labelText?: string;
}

export default function Slider(props: SliderProps) {
  const { valueChanged, getValue, validityChanged, min, max, labelText } =
    props;
  const [value, setValue] = useState(utils.clamp(min, max, getValue()));
  const [errorMessage, setErrorMessage] = useState(null as string | null);
  useEffect(() => {
    if (!errorMessage) valueChanged(value);
  }, [value]);
  const isValueValid = (val: any) => {
    return val - 0 == val && val >= min && val <= max;
  };
  return (
    <div className="mb-4 border-2 p-4 rounded-lg">
      <div className="flex justify-between mb-3 text-lg">
        {labelText ? <label>{labelText}</label> : <div />}
        <label>{value}</label>
      </div>
      <input
        onChange={(ev) => {
          const val = ev.target.value;
          const valid = isValueValid(val);
          setValue(val as any);
          if (valid) {
            setErrorMessage(null);
          } else {
            setErrorMessage("Value is incorrect");
          }
          if (validityChanged) validityChanged(valid);
        }}
        step="1"
        type="range"
        min={min}
        max={max}
        value={value}
        className="_slider border-b-2"
      />
      {errorMessage && (
        <p className="mt-4 text-red-700 text-right">{errorMessage}</p>
      )}
    </div>
  );
}
