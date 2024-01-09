import { Button } from "@/components/ui/button";
import { bmiCalculator, caloriesCalculator } from "@/lib/calculators";
import { capitalize } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/store/store";
import { isUpdating } from "@/store/reducers/profile";

export default function ProfileInfo() {
  const { firstname, lastname, age, height, weightUser, gender, updatingProfile } = useSelector(
    (store: RootReducer) => store.profile
  );
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(isUpdating(true));
  };

  const bmi = bmiCalculator(height, weightUser);
  const calories = caloriesCalculator(height, weightUser, age, gender);
  console.log(bmi)

  return (
    <div className="mx-auto">
      <h1 className="head-text">Hello, {firstname}!</h1>
      <h2 className="subtitle">
        Here is your informations. You can update whenever you want!
      </h2>
      <div className="flex flex-col md:flex-row gap-16">
        <ul className="flex flex-col items-center md:items-start justify-center gap-8 mt-16 border-2 p-4 rounded-xl">
          <li className="text-center">
            <p className="text-mainBlue">Name:</p>
            <p>{capitalize(firstname)} {capitalize(lastname)}</p>
          </li>
          <li className="text-center">
            <p className="text-mainBlue ">Age:</p>
            <p>{age} years old</p>
          </li>
          <li className="text-center">
            <p className="text-mainBlue">Height:</p>
            {height} cm
          </li>
          <li className="text-center">
            <p className="text-mainBlue text-center">Weight:</p>
            <p>{weightUser} kg</p>
          </li>
          <li className="text-center">
            <p className="text-mainBlue">Gender:</p>
            <p>{capitalize(gender)}</p>
          </li>
        </ul>
        <ul className="flex flex-col gap-8 mt-16 border-2 p-4 rounded-xl text-center justify-center">
          <li className="border-b pb-2">
            <p className="text-mainBlue underline">BMI</p>
            <p>
              <span className="text-mainBlue">{bmi.bmi}</span> - {bmi.result}
            </p>
          </li>
          <li className="border-b pb-2">
            <p className="text-mainBlue underline">Calories</p>
            <p>
              You need <span className="text-mainBlue">{calories}</span> kcal to
              maintain your weight
            </p>
          </li>
        </ul>
      </div>
      <div className="flex justify-center mt-16">
       {!updatingProfile && <Button onClick={() => handleUpdate()}>Update Profile</Button>}
      </div>
    </div>
  );
}
