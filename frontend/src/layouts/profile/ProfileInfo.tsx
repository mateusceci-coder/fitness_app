import { Button } from "@/components/ui/button";
import { bmiCalculator, calculateAge, caloriesCalculator } from "@/lib/calculators";
import { capitalize } from "@/lib/utils";
import { dataUser } from './FormProfile';
import { useDispatch } from "react-redux";
import { isUpdating } from "@/store/reducers/profile";

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
        className={`flex flex-col gap-4 lg:flex-row`}
      >
        <ul className="flex flex-col text-center gap-4 p-4 rounded-xl bg-white shadow-xl w-80 xs:w-112 mx-auto">
          <li className="flex flex-col items-center gap-1">
            {dataUser.profile_picture ? (
              <img
                src={dataUser.profile_picture || 'src/images/profile-home.jpg'}
                alt="Profile Photo"
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
            <p>{age} years old</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Height:</b>
            </p>
            <p>{dataUser.height} cm</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Weight:</b>
            </p>
            <p>{dataUser.weight} kg</p>
          </li>
          <li className="border-b-2 p-2">
            <p className="text-mainBlue">
              <b>Gender:</b>
            </p>
            <p>{dataUser.gender}</p>
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
                <Button onClick={() => handleUpdate()}>Update Profile</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
