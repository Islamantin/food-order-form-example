import Head from "next/head";
import { useState } from "react";
import ListPicker from "src/components/fields/listSelector";
import RadioSelector from "src/components/fields/radioSelector";
import Slider from "src/components/fields/slider";
import MultistepFormBase, { Step } from "src/components/multistepFormBase";
import data from "../../data/dishes.json";
import Review from "src/components/fields/review";
import CountedListPicker, {
  CountedValue,
} from "src/components/fields/countedListPicker";
import utils from "src/utils";

// main data type for form
interface MealOrder {
  category: "Breakfast" | "Lunch" | "Dinner";
  numberOfPeople: number;
  restaurant?: string;
  dishes: CountedValue[];
}

// distribution of field ids between form steps
const steps: Step[] = [
  { title: "Step 1", fields: ["category", "numberOfPeople"] },
  { title: "Step 2", fields: ["restaurant"] },
  { title: "Step 3", fields: ["dishes"] },
  { title: "Review", fields: ["review"] },
];

export default function Home() {
  const [payload, setPayload] = useState(defaultPayload());
  const [submited, setSubmited] = useState(false);
  // function for updating fields of form data 
  const updateData = (fieldName: string, value: any) => {
    (payload as any)[fieldName] = value;
    setPayload(payload);
  };
  // specific form data field if fieldName is passed
  // otherwise returns whole data object 
  const getCurrentValue = (fieldName?: string) => {
    return fieldName ? (payload as any)[fieldName] : payload;
  };
  return (
    <>
      <Head>
        <title>Meal Pre-Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-42">
        <div className="shadow-lg w-full p-10 rounded-lg bg-slate-100 max-w-xl">
          <h1 className=" text-3xl mb-8 text-center">Meal Pre-Order</h1>
          {/* form component injection */}
          {!submited ? (
            <MultistepFormBase
              steps={steps}
              getFieldComponent={(fieldName, validationCallback) =>
                getFieldComponent(
                  fieldName,
                  validationCallback,
                  updateData,
                  getCurrentValue
                )
              }
              onStepChanged={(beforeInd, afterInd) => {
                if (afterInd - beforeInd < 0) {
                  let { fields } = steps[beforeInd];
                  fields = fields.filter((x) =>
                    Object.keys(payload).includes(x)
                  );
                  const def = defaultPayload();
                  fields.forEach((k) => {
                    (payload as any)[k] = (def as any)[k];
                  });
                  setPayload(payload);
                }
              }}
              onSubmit={() => {
                setSubmited(true);
                console.log(payload);
              }}
            />
          ) : (
            <div className=" w-full h-40 text-center">
              <h2 className="text-2xl mb-4">Success!</h2>
              <img src="./check.svg" alt="success" className="w-20 m-auto" />
              <p>Thank you for order.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function defaultPayload() {
  const result: MealOrder = {
    category: "Breakfast",
    numberOfPeople: 0,
    restaurant: undefined,
    dishes: [],
  };
  return result;
}

// get restaurants list by category name
function getRestaurants(category: string) {
  const categoryDishes = data.dishes.filter((x) =>
    x.availableMeals.includes(category.toLowerCase())
  );
  const restaurants = categoryDishes.map((x) => x.restaurant);
  return Array.from(new Set(restaurants));
}

// dishes list offered by restaurant
function getDishes(restaurant: string) {
  return data.dishes
    .filter((x) => x.restaurant === restaurant)
    .map((x) => x.name);
}

// function that retrieves specific field component for form depending on fieldName
function getFieldComponent(
  fieldName: string,
  validationCallback: (fieldName: string, isValid: boolean) => void,
  fieldUpdateCallback: (fieldName: string, value: any) => void,
  getCurrentValue: (fieldName?: string) => any
) {
  switch (fieldName) {
    case "category":
      return (
        <RadioSelector
          key={"field-" + fieldName}
          onValueUpdated={(val) => fieldUpdateCallback(fieldName, val)}
          onValidated={(isValid) => validationCallback(fieldName, isValid)}
          getValue={() => getCurrentValue(fieldName)}
          options={["Breakfast", "Lunch", "Dinner"]}
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
          list={getRestaurants(getCurrentValue("category"))}
          validationErrors={[
            {
              id: "notCorrectString",
              message: "Value is incorrect",
              condition: (val) => {
                return !val || val.length < 1;
              },
            },
          ]}
          labelText="Restaurant"
        />
      );
    case "dishes":
      return (
        <CountedListPicker
          key={"field-" + fieldName}
          list={getDishes(getCurrentValue("restaurant"))}
          minTotal={getCurrentValue("numberOfPeople")}
          maxTotal={10}
          onValueUpdated={(val) => fieldUpdateCallback(fieldName, val)}
          onValidated={(isValid) => validationCallback(fieldName, isValid)}
          getValue={() => getCurrentValue(fieldName)}
          validationErrors={[
            {
              id: "countLessThanMinTotal",
              message: "Total count can't be less than number of people",
              condition: (items, ep) => utils.totalCount(items) < ep.minTotal,
            },
            {
              id: "countMoreThanMaxTotal",
              message: "Total count can't be more than 10",
              condition: (items, ep) => utils.totalCount(items) > ep.maxTotal,
            },
          ]}
          labelText="Dishes order"
        />
      );
    case "review":
      return (
        <Review
          key={"field-" + fieldName}
          data={getCurrentValue()}
          labelText={"Review your order"}
          getFieldTitle={(fName) => {
            switch (fName) {
              case "category":
                return "Meal category";
              case "numberOfPeople":
                return "Number of people";
              case "restaurant":
                return "Restaurant";
              case "dishes":
                return "Dishes";
            }
            return "";
          }}
          arrayElementPresentation={(item, key) => {
            return (
              <div key={key} className="flex justify-between p-2">
                <p>{item.value}</p>
                <p>x{item.count}</p>
              </div>
            );
          }}
        />
      );
  }
  return <></>;
}
