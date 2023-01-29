import Head from "next/head";
import { useState } from "react";
import ListPicker from "src/components/fields/listSelector";
import RadioSelector, {
  RadioSelectorOption,
} from "src/components/fields/radioSelector";
import Slider from "src/components/fields/slider";
import MultistepFormBase, { Step } from "src/components/multistepFormBase";
import data from "../../data/dishes.json";

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
  const [payload, setPayload] = useState(defaultPayload());
  const updateData = (fieldName: string, value: any) => {
    console.log(fieldName);
    console.log(value);
    (payload as any)[fieldName] = value;
    setPayload(payload);
  };
  const getCurrentValue = (fieldName: string) => {
    return (payload as any)[fieldName];
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
            onStepChanged={(beforeInd, afterInd) => {
              if (afterInd - beforeInd < 0) {
                const { fields } = steps[beforeInd];
                const def = defaultPayload();
                fields.forEach((f) => {
                  (payload as any)[f] = (def as any)[f];
                });
                setPayload(payload);
              }
              console.log(payload);
            }}
            onSubmit={() => {
              console.log(payload);
            }}
          />
        </div>
      </main>
    </>
  );
}

function defaultPayload() {
  const result: MealOrder = {
    category: "breakfast",
    numberOfPeople: 0,
    dishes: [],
  };
  return result;
}

function getRestaurantListByCategory(category: string) {
  const categoryDishes = data.dishes.filter((x) =>
    x.availableMeals.includes(category)
  );
  const restaurants = categoryDishes.map((x) => x.restaurant);
  return Array.from(new Set(restaurants));
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
          onValueUpdated={(val) => fieldUpdateCallback(fieldName, val)}
          onValidated={(isValid) => validationCallback(fieldName, isValid)}
          getValue={() => getCurrentValue(fieldName)}
          options={mealCategories}
          validationErrors={[
            {
              id: "notCorrectString",
              message: "Value is incorrect",
              condition: (val) => !val || val.length < 1,
            },
          ]}
          labelText="Meal category"
        ></RadioSelector>
      );
    case "numberOfPeople":
      return (
        <Slider
          key={"field-" + fieldName}
          onValueUpdated={(val) => fieldUpdateCallback(fieldName, val)}
          onValidated={(isValid) => validationCallback(fieldName, isValid)}
          getValue={() => getCurrentValue(fieldName)}
          min={1}
          max={10}
          validationErrors={[
            {
              id: "isNaN",
              message: "Value is incorrect",
              condition: (val) => isNaN(val),
            },
            {
              id: "lessThanMin",
              message: "Value can't be less than 1",
              condition: (val, ep) => val < ep.min,
            },
            {
              id: "moreThanMax",
              message: "Value can't be more than 10",
              condition: (val, ep) => val > ep.max,
            },
          ]}
          labelText="Number of people"
        />
      );
    case "restaurant":
      return (
        <ListPicker
          key={"field-" + fieldName}
          onValueUpdated={(val) => fieldUpdateCallback(fieldName, val)}
          onValidated={(isValid) => validationCallback(fieldName, isValid)}
          getValue={() => getCurrentValue(fieldName)}
          list={getRestaurantListByCategory(getCurrentValue("category"))}
          validationErrors={[
            {
              id: "notCorrectString",
              message: "Value is incorrect",
              condition: (val) => {
                console.log(val);
                return !val || val.length < 1;
              },
            },
          ]}
          labelText="Restaurant"
        />
      );
    case "dishes":
      return <div key={"field-" + fieldName} />;
  }
  return <></>;
}
