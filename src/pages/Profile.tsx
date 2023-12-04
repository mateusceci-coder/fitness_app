import CreateProfileText from "@/layouts/profile/CreateProfileText";
import FormProfile from "@/layouts/profile/FormProfile";
import ProfileInfo from "@/layouts/profile/ProfileInfo";
import { RootReducer } from "@/store/store";
import { useSelector } from "react-redux";


export interface UserProps {
    firstname: string
    lastname: string
    age: number
    height: number
    weight: number
    gender: string
}

export default function Profile() {

    const { updatingProfile, firstProfile } = useSelector((store: RootReducer) => store.profile)

    const renderForm = updatingProfile || firstProfile

    return (
    <div className={`${!renderForm ? "flex justify-center items-center" : "grid lg:grid-cols-2" } my-4 p-1`}>
      {firstProfile ? <CreateProfileText /> : <ProfileInfo />}
      {renderForm && <FormProfile />}
    </div>
  );
}
