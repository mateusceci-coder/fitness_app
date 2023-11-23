import CreateProfileText from "@/layouts/profile/CreateProfileText";
import FormProfile from "@/layouts/profile/FormProfile";


export default function Profile() {
  
    return (
    <div className="grid grid-rows-2 my-4 p-1">
      <CreateProfileText />
      <FormProfile />
    </div>
  );
}
