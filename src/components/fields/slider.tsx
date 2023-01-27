import { useState } from "react";
import utils from "../../utils";

export interface SliderProps {
  getValue: () => any;
  valueChanged: (val: any) => void;
  min: number;
  max: number;
  labelText?: string;
}

export default function Slider(props: SliderProps) {
  const { valueChanged, getValue, min, max, labelText } = props;
  const [value, setValue] = useState(utils.clamp(min, max, getValue()));
  const updateValue = (val: string) => {
    setValue(val as any);
    valueChanged(val);
  };
  return (
    <div className="mb-4 border-2 p-4 rounded-lg">
      <div className="flex justify-between mb-3 text-lg">
        {labelText ? <label>{labelText}</label> : <div />}
        <label>{value}</label>
      </div>
      <input
        onChange={(ev) => updateValue(ev.target.value)}
        step="1"
        type="range"
        min={min}
        max={max}
        value={value}
        className="_slider border-b-2"
      />
    </div>
  );
}
