import CreateProfileText from "@/layouts/profile/CreateProfileText";
import FormProfile from "@/layouts/profile/FormProfile";
import ProfileInfo from "@/layouts/profile/ProfileInfo";
import { useState } from "react";


export interface UserProps {
    firstname: string
    lastname: string
    age: number
    height: number
    weight: number
    gender: string
}

export default function Profile() {
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [firstProfile, setFirstProfile] = useState<boolean>(true)
    const [userInfo, setUserInfo] = useState<UserProps>({
      firstname: "",
      lastname: "",
      age: 0,
      height: 0,
      weight: 0,
      gender: "",
    })
    const renderForm = isUpdating || firstProfile
    return (
    <div className={`${!renderForm ? "flex justify-center items-center" : "grid lg:grid-cols-2" } my-4 p-1`}>
      {firstProfile ? <CreateProfileText /> : <ProfileInfo userInfo={userInfo} setIsUpdating={setIsUpdating} />}
      {renderForm && <FormProfile setUserInfo={setUserInfo} setFirstProfile={setFirstProfile} setIsUpdating={setIsUpdating} />}
    </div>
  );
}
