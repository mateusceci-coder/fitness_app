import { Button } from "@/components/ui/button"
import { UserProps } from "@/pages/Profile"
import { Dispatch, SetStateAction } from "react"
import { bmiCalculator, caloriesCalculator } from "@/utils/calculators"


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
      <div className="flex gap-16 justify-center">
      <ul className="text-primary">
        <li><span className="text-mainBlue">Name:</span> {firstname} {lastname}</li>
        <li><span className="text-mainBlue">Age:</span> {age} years old</li>
        <li><span className="text-mainBlue">Height:</span> {height} cm</li>
        <li><span className="text-mainBlue">Weight:</span> {weight} kg</li>
        <li><span className="text-mainBlue">Gender:</span> {gender}</li>
      </ul>
      <ul>
        <li>
          <p>BMI</p>
          <span>{bmi.bmi} "{bmi.result}"</span>
        </li>
        <li>
            <p>Calories</p>
            <span>You need {calories} kcal to maintain your weight</span>
        </li>
      </ul>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => handleUpdate()}>Update Profile</Button>
      </div>
    </div>
  )
}
