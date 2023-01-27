import { useState } from "react";

interface RadioSelectorProps {
  options: RadioSelectorOption[];
  getValue: () => string;
  valueChanged: (value: any) => void;
  labelText?: string;
  className?: string;
}

export interface RadioSelectorOption {
  value: string;
  label: string;
}

export default function RadioSelector(props: RadioSelectorProps) {
  const { options, getValue, valueChanged, labelText, className } = props;
  const [value, setValue] = useState(getValue());
  const styles = className ? className : "";
  const onChange = (val: string) => {
    setValue(val);
    valueChanged(val);
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
              onChange={(ev) => onChange(ev.target.value)}
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
    </div>
  );
}
