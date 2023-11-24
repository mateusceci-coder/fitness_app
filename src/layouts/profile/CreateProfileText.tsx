import { CheckCircle } from "lucide-react";

export default function CreateProfileText() {
  return (
    <div>
      <div className="flex gap-4 mb-20 flex-col p-1">
        <h1 className="head-text infinite-scale">Create Your Profile!</h1>
        <h2 className="subtitle">
          By creating your profile, you will have access to:
        </h2>
      </div>
      <ul className="flex flex-col gap-12 lg:gap-24 text-center items-center p-8 border-2 rounded-2xl max-w-lg m-auto">
        <li>
          <CheckCircle className="inline mr-1" /> Body Index Mass
        </li>
        <li>
          <CheckCircle className="inline mr-1" /> How much calories you must
          consume per day
        </li>
        <li>
          <CheckCircle className="inline mr-1" />
          The relation between your 1 Rep Max and your weight
        </li>
      </ul>
    </div>
  );
}
