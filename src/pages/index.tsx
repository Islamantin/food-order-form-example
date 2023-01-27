import Head from "next/head";
import { useState } from "react";
import RadioSelector, {
  RadioSelectorOption,
} from "src/components/fields/radioSelector";
import Slider from "src/components/fields/slider";
import MultistepFormBase, { Step } from "src/components/multistepFormBase";

interface MealOrder {
  category: "breakfast" | "lunch" | "dinner";
  numberOfPeople: number;
  restaurant?: string;
  dishes: {
    name: string;
    servings: number;
  }[];
}

const steps: Step[] = [
  { title: "Step 1", fields: ["category", "numberOfPeople"] },
  { title: "Step 2", fields: ["restaurant"] },
  { title: "Step 3", fields: ["dishes"] },
  { title: "Review", fields: [] },
];

const mealCategories: RadioSelectorOption[] = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
];

export default function Home() {
  const [data, setData] = useState(getData());
  const updateData = (fieldName: string, value: any) => {
    console.log(fieldName);
    console.log(value);
    (data as any)[fieldName] = value;
    setData(data);
  };
  const getCurrentValue = (fieldName: string) => {
    return (data as any)[fieldName];
  };
  return (
    <>
      <Head>
        <title>Meal Pre-Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-60">
        <div className="shadow-lg w-full p-10 rounded-lg bg-slate-100 max-w-xl">
          <h1 className=" text-3xl mb-8 text-center">Meal Pre-Order</h1>
          <MultistepFormBase
            steps={steps}
            getInputFieldComponent={(fieldName, validationCallback) =>
              getInputFieldComponent(
                fieldName,
                validationCallback,
                updateData,
                getCurrentValue
              )
            }
            onSubmit={() => {
              console.log(data);
            }}
          />
        </div>
      </main>
    </>
  );
}

function getData() {
  const result: MealOrder = {
    category: "breakfast",
    numberOfPeople: 0,
    dishes: [],
  };
  return result;
}

function getInputFieldComponent(
  fieldName: string,
  validationCallback: (fieldName: string, isValid: boolean) => void,
  fieldUpdateCallback: (fieldName: string, value: any) => void,
  getCurrentValue: (fieldName: string) => any
) {
  switch (fieldName) {
    case "category":
      return (
        <RadioSelector
          key={"field-" + fieldName}
          valueChanged={(val) => fieldUpdateCallback(fieldName, val)}
          getValue={() => getCurrentValue(fieldName)}
          validityChanged={(isValid) => validationCallback(fieldName, isValid)}
          options={mealCategories}
          labelText="Meal category"
          className="mb-4"
        ></RadioSelector>
      );
    case "numberOfPeople":
      return (
        <Slider
          key={"field-" + fieldName}
          valueChanged={(val) => fieldUpdateCallback(fieldName, val)}
          getValue={() => getCurrentValue(fieldName)}
          validityChanged={(isValid) => validationCallback(fieldName, isValid)}
          min={1}
          max={10}
          labelText="Number of people"
        />
      );
    case "restaurant":
      return <div key={"field-" + fieldName} />;
    case "dishes":
      return <div key={"field-" + fieldName} />;
  }
  return <></>;
}
