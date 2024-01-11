import { CheckCircle } from "lucide-react";

export default function CreateProfileText() {
  return (
    <div>
      <div className="flex gap-4 mb-20 flex-col p-10">
        <h1 className="head-text infinite-scale">Create Your Profile!</h1>
        <h2 className="subtitle">
          By creating your profile, you will have access to:
        </h2>
      </div>
      <ul className="flex flex-col gap-12 lg:gap-24 text-center items-center p-8 bg-white shadow-xl rounded-2xl max-w-lg m-auto">
        <li>
          <CheckCircle className="inline mr-1" /> <span className="text-lg head-text">Body Mass Index (BMI)</span>
          <p className="text-sm mt-2">Quick measure of body weight in relation to height. It categorizes individuals into groups like underweight, normal weight, overweight, or obese, serving as a basic indicator of healthy body weight. However, it doesn't directly assess body fat or distribution.</p>
        </li>
        <li>
          <CheckCircle className="inline mr-1" /> <span className="text-lg head-text">Basal Metabolic Rate (BMR)</span>
          <p className="text-sm mt-2"> Calculates how much calories your body needs at rest to maintain basic functions. It's the energy required for essential processes like breathing and circulation. BMR varies based on factors like age and body composition.</p>
        </li>
      </ul>
    </div>
  );
}
