import { Button } from "@/components/ui/button";
import { bmiCalculator, calculateAge, caloriesCalculator } from "@/lib/calculators";
import { capitalize } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/store/store";
import { CheckCircle } from "lucide-react";
import { isUpdating } from "@/store/reducers/profile";

export default function ProfileInfo() {
  const {
    firstname,
    lastname,
    birthday,
    height,
    weightUser,
    gender,
    image,
    updatingProfile,
    firstProfile,
  } = useSelector((store: RootReducer) => store.profile);
  const dispatch = useDispatch();

  const renderForm = updatingProfile || firstProfile;

  const handleUpdate = () => {
    dispatch(isUpdating(true));
  };

  const age = calculateAge(birthday)
  const bmi = bmiCalculator(height, weightUser);
  const calories = caloriesCalculator(height, weightUser, age, gender);

  return (
    <div className="w-full">
      <h1 className="head-text">Hello, {firstname}!</h1>
      <h2 className="subtitle">
        Here is your informations. You can update whenever you want!
      </h2>
      <div
        className={`flex flex-col lg:flex-row ${
          renderForm ? "justify-center" : "lg:justify-between"
        }`}
      >
        {!renderForm && (
          <div className="flex flex-col gap-12 lg:gap-24 text-center items-center p-8 bg-white shadow-xl rounded-2xl max-w-xs m-auto">
            <div>
              <CheckCircle className="inline mr-1" />{" "}
              <span className="text-lg head-text">Body Mass Index (BMI)</span>
              <p className="text-sm mt-2">
                Quick measure of body weight in relation to height. It
                categorizes individuals into groups like underweight, normal
                weight, overweight, or obese, serving as a basic indicator of
                healthy body weight. However, it doesn't directly assess body
                fat or distribution.
              </p>
            </div>
          </div>
        )}
        <ul className="flex flex-col text-center gap-4 mt-16 p-4 rounded-xl bg-white shadow-xl w-80 xs:w-112 mx-auto">
          <li className="flex flex-col items-center gap-1">
            {image ? (
              <img
                src={image}
                alt="Profile Photo"
                className="rounded-full h-40 w-40 object-cover"
              />
            ) : (
              <img src="src/images/profile-home.jpg" alt="Default Profile" className="rounded-full h-40 w-40 object-cover" />
            )}
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
            <p className="text-mainBlue">
              <b>BMI:</b>
            </p>
            <p>
              <span className="text-mainBlue">{bmi.bmi}</span> - {bmi.result}
            </p>
          </li>
          <li className="pb-2">
            <p className="text-mainBlue">
              <b>Calories:</b>
            </p>
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

        {!renderForm && (
          <div className="flex flex-col gap-12 lg:gap-24 text-center items-center p-8 bg-white shadow-xl rounded-2xl max-w-xs m-auto">
            <div>
              <CheckCircle className="inline mr-1" />{" "}
              <span className="text-lg head-text">
                Basal Metabolic Rate (BMR)
              </span>
              <p className="text-sm mt-2">
                {" "}
                Calculates how much calories your body needs at rest to maintain
                basic functions. It's the energy required for essential
                processes like breathing and circulation. BMR varies based on
                factors like age and body composition.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
