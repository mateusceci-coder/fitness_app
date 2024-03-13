import { Button } from "@/components/ui/button";
import { bmiCalculator, calculateAge, caloriesCalculator } from "@/lib/calculators";
import { capitalize } from "@/lib/utils";
import { dataUser } from './FormProfile';
import { useDispatch } from "react-redux";
import { isUpdating } from "@/store/reducers/profile";
import { CheckCircle } from "lucide-react";

export default function ProfileInfo( { dataUser }: { dataUser: dataUser }) {

  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(isUpdating(false));
      };
  const age = calculateAge(dataUser.birthday)
  const bmi = bmiCalculator(dataUser.height, dataUser.weight);
  const calories = caloriesCalculator(dataUser.height, dataUser.weight, age, dataUser.gender);

  return (
    <div className="w-full bg-grayBg">
      <h1 className="head-text">Hello, {dataUser.first_name}!</h1>
      <h2 className="subtitle mb-12">
        Here is your informations. You can update whenever you want!
      </h2>
      <div
        className="flex flex-col gap-4 lg:flex-row pb-12"
      >
        <div className="flex flex-col  text-center items-center p-4 bg-white shadow-xl rounded-2xl w-80 md:w-64 m-auto">
          <CheckCircle className="inline mr-1" /> <span className="text-lg head-text">Body Mass Index (BMI)</span>
          <p className="text-sm mt-2">Quick measure of body weight in relation to height. It categorizes individuals into groups like underweight, normal weight, overweight, or obese, serving as a basic indicator of healthy body weight. However, it doesn't directly assess body fat or distribution.</p>
        </div>
        <ul className="flex flex-col text-center gap-4 p-4 rounded-xl bg-white shadow-xl w-80 xs:w-112 mx-auto">
          <li className="flex flex-col items-center gap-1">
            {dataUser.profile_picture ? (
              <img
                src={dataUser.profile_picture}
                alt="Profile Picture"
                className="rounded-full h-40 w-40 object-cover"
              />
            ) : (
              <img src="src/images/profile-home.jpg" alt="Default Profile" className="rounded-full h-40 w-40 object-cover" />
            )}
            <p>
              <b>
                {capitalize(dataUser.first_name)} {capitalize(dataUser.last_name)}
              </b>
            </p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Age:</b>
            </p>
            <p data-test="age-profile">{age} years old</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Height:</b>
            </p>
            <p data-test="height-profile">{dataUser.height} cm</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Weight:</b>
            </p>
            <p data-test="weight-profile">{dataUser.weight} kg</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Gender:</b>
            </p>
            <p data-test="gender-profile">{dataUser.gender}</p>
          </li>

          <li className="border-b-2 pb-2">
            <p className="text-mainBlue">
              <b>BMI:</b>
            </p>
            <p>
              <span data-test="bmi" className="text-mainBlue">{bmi.bmi}</span> - <span data-test="result">{bmi.result}</span>
            </p>
          </li>
          <li className="pb-2">
            <p className="text-mainBlue">
              <b>Calories:</b>
            </p>
            <p data-test="calories">
              You need <span className="text-mainBlue">{calories}</span> kcal to
              maintain your weight
            </p>
          </li>
          <li>
            <div>
                <Button data-test="update-profile-btn" onClick={() => handleUpdate()}>Update Profile</Button>
            </div>
          </li>
        </ul>
        <div className="flex flex-col text-center items-center p-4 bg-white shadow-xl rounded-2xl w-80 md:w-64 m-auto">
          <CheckCircle className="inline mr-1" /> <span className="text-lg head-text">Basal Metabolic Rate (BMR)</span>
          <p className="text-sm mt-2"> Calculates how much calories your body needs at rest to maintain basic functions. It's the energy required for essential processes like breathing and circulation. BMR varies based on factors like age and body composition.</p>
        </div>
      </div>
    </div>
  );
}
