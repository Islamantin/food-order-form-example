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

interface ValidationError {
  message: string;
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
  const getValue = (fieldName: string) => {
    return (data as any)[fieldName];
  };
  return (
    <>
      <Head>
        <title>Meal Pre-Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-60">
        <MultistepFormBase
          steps={steps}
          getInputComponent={(fieldName) =>
            getInputComponent(fieldName, updateData, getValue)
          }
          validateField={function (value: any, fieldName: string): boolean {
            throw new Error("Function not implemented.");
          }}
        />
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

function getInputComponent(
  fieldName: string,
  fieldUpdateCallback: (fieldName: string, value: any) => void,
  getValue: (fieldName: string) => any
) {
  switch (fieldName) {
    case "category":
      return (
        <RadioSelector
          key={"field-" + fieldName}
          options={mealCategories}
          valueChanged={(val) => fieldUpdateCallback(fieldName, val)}
          getValue={() => getValue(fieldName)}
          labelText="Meal category"
          className="mb-4"
        ></RadioSelector>
      );
    case "numberOfPeople":
      return (
        <Slider
          key={"field-" + fieldName}
          valueChanged={(val) => fieldUpdateCallback(fieldName, val)}
          getValue={() => getValue(fieldName)}
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

function validateField(fieldName: string, value: any): ValidationError | null {
  switch (fieldName) {
    case "category":
      break;
    case "numberOfPeople":
      break;
    case "restaurant":
      break;
    case "dishes":
      break;
  }
  return null;
}
