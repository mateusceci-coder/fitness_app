import { Button } from "@/components/ui/button"
import { UserProps } from "@/pages/Profile"
import { Dispatch, SetStateAction } from "react"
import { bmiCalculator, caloriesCalculator } from "@/lib/calculators"
import { capitalize } from "@/lib/utils"



interface ProfileProps {
  userInfo: UserProps
  setIsUpdating: Dispatch<SetStateAction<boolean>>
}

export default function ProfileInfo({userInfo, setIsUpdating}: ProfileProps) {
  const { firstname, lastname, age, height, weight, gender } = userInfo

  const handleUpdate = () => {
    setIsUpdating(true)
  }

  const bmi = bmiCalculator(height,weight)
  const calories = caloriesCalculator(height, weight, age, gender)


  return (
    <div className="mx-auto">
      <h1 className="head-text">Hello, {firstname}!</h1>
      <h2 className="subtitle">Here is your informations. You can update whenever you want!</h2>
      <div className="flex flex-col md:flex-row gap-16">
      <ul className="flex flex-col items-center md:items-start justify-center gap-8 mt-16">
        <li><span className="text-mainBlue underline mr-1">Name:</span> {capitalize(firstname)} {capitalize(lastname)}</li>
        <li><span className="text-mainBlue underline mr-1">Age:</span> {age} years old</li>
        <li><span className="text-mainBlue underline mr-1">Height:</span> {height} cm</li>
        <li><span className="text-mainBlue underline mr-1">Weight:</span> {weight} kg</li>
        <li><span className="text-mainBlue underline mr-1">Gender:</span> {capitalize(gender)}</li>
      </ul>
      <ul className="flex flex-col gap-8 mt-16 border-2 p-4 rounded-xl text-center justify-center">
        <li className="border-b pb-2">
          <p className="text-mainBlue underline">BMI</p>
          <p><span className="text-mainBlue">{bmi.bmi}</span> - {bmi.result}</p>
        </li>
        <li className="border-b pb-2">
            <p className="text-mainBlue underline">Calories</p>
            <p>You need <span className="text-mainBlue">{calories}</span> kcal to maintain your weight</p>
        </li>
        <li className="border-b pb-2">
            <p className="text-mainBlue underline">1 Rep Max</p>
            <p>Bench Press: 132kg </p>
        </li>
      </ul>
      </div>
      <div className="flex justify-center mt-16">
        <Button onClick={() => handleUpdate()}>Update Profile</Button>
      </div>
    </div>
  )
}
