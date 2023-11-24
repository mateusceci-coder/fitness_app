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
      <ul className="my-20 text-primary">
        <li>Name: {firstname} {lastname}</li>
        <li>Age: {age} years old</li>
        <li>Height {height} cm</li>
        <li>Weight: {weight} kg</li>
        <li>Gender: {gender}</li>
      </ul>

      <ul className="my-5">
        <li>
          <p>BMI</p>
          <span>{bmi.bmi} "{bmi.result}"</span>
        </li>
        <li>
            <p>Calories</p>
            <span>You need {calories} kcal to maintain your weight</span>
        </li>
      </ul>
      <Button onClick={() => handleUpdate()}>Update Profile</Button>
    </div>
  )
}
