import { Button } from "@/components/ui/button";
import { bmiCalculator, caloriesCalculator } from "@/lib/calculators";
import { capitalize } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/store/store";
import { isUpdating } from "@/store/reducers/profile";

export default function ProfileInfo() {
  const {
    firstname,
    lastname,
    age,
    height,
    weightUser,
    gender,
    updatingProfile,
  } = useSelector((store: RootReducer) => store.profile);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(isUpdating(true));
  };

  const bmi = bmiCalculator(height, weightUser);
  const calories = caloriesCalculator(height, weightUser, age, gender);

  return (
    <div className="mx-auto h-screen">
      <h1 className="head-text">Hello, {firstname}!</h1>
      <h2 className="subtitle">
        Here is your informations. You can update whenever you want!
      </h2>
      <div className="flex flex-col md:flex-row gap-16">
        <ul className="flex flex-col text-center gap-4 mt-16 p-4 rounded-xl bg-white shadow-xl w-112">
          <li className="flex flex-col items-center gap-1">
            <img
              src="https://via.placeholder.com/150"
              alt="Imagem de teste"
              className="rounded-full"
            />
            <p>
              <b>
                {capitalize(firstname)} {capitalize(lastname)}
              </b>
            </p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Age:</b>
            </p>
            <p>{age} years old</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Height:</b>
            </p>
            <p>{height} cm</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Weight:</b>
            </p>
            <p>{weightUser} kg</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Gender:</b>
            </p>
            <p>{capitalize(gender)}</p>
          </li>

          <li className="border-b-2 pb-2">
            <p className="text-mainBlue"><b>BMI:</b></p>
            <p>
              <span className="text-mainBlue">{bmi.bmi}</span> - {bmi.result}
            </p>
          </li>
          <li className="pb-2">
            <p className="text-mainBlue"><b>Calories:</b></p>
            <p>
              You need <span className="text-mainBlue">{calories}</span> kcal to
              maintain your weight
            </p>
          </li>
          <li>
            <div>
              {!updatingProfile && (
                <Button onClick={() => handleUpdate()}>Update Profile</Button>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
