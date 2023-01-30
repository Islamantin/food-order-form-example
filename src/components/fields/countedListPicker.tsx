import { useEffect, useState } from "react";
import {
  InputFieldComponentProps,
  ValidationError,
  getValidatedErrorIds,
} from "../multistepFormBase";
import utils from "src/utils";

interface ListSelectorProps extends InputFieldComponentProps {
  list: string[];
  minTotal: number;
  maxTotal: number;
  validationErrors?: ValidationError[];
  labelText?: string;
}

interface StateOfPick {
  fromList: string[];
  toList: CountedValue[];
}

export interface CountedValue {
  value: string;
  count: number;
}

// input field component that provides picking of multiple items from array in a defined quantity
export default function CountedListPicker(props: ListSelectorProps) {
  const {
    onValueUpdated,
    onValidated,
    getValue,
    list,
    minTotal,
    maxTotal,
    validationErrors,
    labelText,
  } = props;
  const initialValue: CountedValue[] = getValue();
  const [pick, setPick] = useState({
    // initial list to pick from is populated with values that are not already in a final list
    fromList: list.filter((x) => !initialValue.some((y) => y.value === x)),
    toList: initialValue,
  } as StateOfPick);
  const count = utils.totalCount(initialValue);
  // error messages will be shown only after minimal total amount of items being picked for the first time
  const [isTouched, setIsToched] = useState(count > minTotal);
  const [totalCount, setTotalCount] = useState(count);
  const getErrorIds = (val: any) => {
    return validationErrors
      ? getValidatedErrorIds(validationErrors, val, {
          minTotal,
          maxTotal,
        })
      : [];
  };
  const [errorIds, setErrorIds] = useState(getErrorIds(initialValue));

  useEffect(() => {
    if (totalCount >= minTotal) setIsToched(true);

    const errIds = getErrorIds(pick.toList);
    setErrorIds(errIds);
    if (onValidated) onValidated(errIds.length < 1);

    if (errIds.length < 1) onValueUpdated(pick.toList);
  }, [pick]);

  const listElementStyles =
    "bg-white cursor-pointer select-none shadow-md w-full p-4 text-center border-b-2 peer-checked:_selected hover:_highlighted";
  return (
    <div className="mb-4 border-2 p-4 rounded-lg ">
      <div className="flex justify-between mb-3 text-lg">
        {labelText ? <label>{labelText}</label> : <div />}
        {/* addditional informational messages */}
        {totalCount == maxTotal ? (
          <label>You can only add up to {maxTotal} items</label>
        ) : totalCount < minTotal ? (
          <label>{minTotal - totalCount} more to go</label>
        ) : (
          <div />
        )}
      </div>
      <div
        className={
          " " + (pick.fromList.length > 4 ? "overflow-y-scroll max-h-60" : "")
        }
      >
        {pick.fromList.length > 0 ? (
          <ul>
            {pick.fromList.map((val, ind) => {
              return (
                <li key={"pick-from-list-option-" + ind}>
                  <input
                    type="button"
                    disabled={totalCount >= maxTotal}
                    onClick={(ev: any) => {
                      if (totalCount >= maxTotal) return;
                      // selecting an element from the first list and placing it in the second one in the amount of 1
                      const val = ev.target.value;
                      const newFromList = pick.fromList.filter((x) => x != val);
                      const newToList = [
                        ...pick.toList,
                        { value: val, count: 1 },
                      ];
                      const newPick = {
                        fromList: newFromList,
                        toList: newToList,
                      };
                      setPick(newPick);
                      setTotalCount(totalCount + 1);
                    }}
                    value={val}
                    className={
                      listElementStyles +
                      " " +
                      (totalCount >= maxTotal &&
                        " bg-gray-400 hover:bg-gray-400 cursor-default")
                    }
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className=" w-full text-center bg-slate-50 rounded-lg p-4">
            No more items to add
          </div>
        )}
      </div>

      <div
        className={
          "  max-h-60 mt-8 " +
          (pick.toList.length > 4 ? "overflow-y-scroll " : "")
        }
      >
        {pick.toList.length > 0 ? (
          <ul>
            {pick.toList.map((item, ind) => {
              return (
                <li
                  key={"pick-to-list-option-" + ind}
                  className={
                    " inline-grid grid-flow-col place-items-center grid-cols-8 cursor-default hover:bg-white " +
                    listElementStyles
                  }
                >
                  <button
                    type="button"
                    className=" bg-slate-300 text-white rounded-2xl p-1 w-6 h-6 hover:bg-orange-400"
                    onClick={() => {
                      let newPick = pick;
                      // decrease amount of item by 1 in a final list
                      if (item.count >= 2) {
                        const newToList = [...pick.toList];
                        newToList[ind] = {
                          value: item.value,
                          count: item.count - 1,
                        };
                        newPick = {
                          fromList: pick.fromList,
                          toList: newToList,
                        };
                      } else {
                        // if the count is only 1, then item returns to original list
                        const newToList = [...pick.toList].filter(
                          (x) => x.value !== item.value
                        );
                        const newFromList = [...pick.fromList, item.value];
                        newPick = {
                          fromList: list.filter((x) => newFromList.includes(x)),
                          toList: newToList,
                        };
                      }
                      setPick(newPick);
                      setTotalCount(totalCount - 1);
                    }}
                  >
                    <img src="./minus.svg" alt="substract" />
                  </button>

                  <div style={{ gridColumnStart: 2, gridColumnEnd: 7 }}>
                    {item.value}
                  </div>
                  <div>x{item.count}</div>
                  {totalCount < maxTotal ? (
                    <button
                      type="button"
                      className=" bg-slate-300 text-white rounded-2xl p-1 w-6 h-6 hover:_selected"
                      onClick={() => {
                        if (totalCount >= maxTotal) return;
                        // add to quantity of item by 1
                        const newToList = [...pick.toList];
                        newToList[ind] = {
                          value: item.value,
                          count: item.count + 1,
                        };
                        const newPick = {
                          fromList: pick.fromList,
                          toList: newToList,
                        };
                        setPick(newPick);
                        setTotalCount(totalCount + 1);
                      }}
                    >
                      <img src="./plus.svg" alt="add" />
                    </button>
                  ) : (
                    <div />
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className=" w-full text-center bg-slate-50 rounded-lg p-4">
            Start adding items
          </div>
        )}
      </div>
      {isTouched &&
        validationErrors &&
        validationErrors.map(
          (err, ind) =>
            errorIds.includes(err.id) && (
              <p
                key={"list-picker-err-" + ind}
                className="mt-4 text-red-700 text-right"
              >
                {err.message}
              </p>
            )
        )}
    </div>
  );
}
