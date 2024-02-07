import CreateProfileText from "@/layouts/profile/CreateProfileText";
import FormProfile from "@/layouts/profile/FormProfile";
import ProfileInfo from "@/layouts/profile/ProfileInfo";
import { RootReducer } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { updatingProfile, firstProfile } = useSelector((store: RootReducer) => store.profile);
  const renderForm = updatingProfile || firstProfile;
  const [userData, setUserData] = useState(null); // State to store the fetched profile data

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);
        if (response.status === 200) {
          setUserData(response.data); // Update the state with the fetched data
        } else {
          throw new Error("Profile not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function to handle component unmounting
    return () => {
      // Any cleanup actions go here
    };
  }, [username]); // Dependency array, the effect will run again if `username` changes

  return (
    <div className={`${!renderForm ? "flex justify-center items-center" : "grid lg:grid-cols-2" } p-1 h-screen bg-grayBg`}>
      {firstProfile ? <CreateProfileText /> : <ProfileInfo />}
      {renderForm && userData && <FormProfile dataUser={userData} />}
    </div>
  );
}
