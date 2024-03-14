import FormProfile from "@/layouts/profile/FormProfile";
import {  isUpdating, userUpdate } from "@/store/reducers/profile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataUser } from './../layouts/profile/FormProfile';
import ProfileInfo from "@/layouts/profile/ProfileInfo";
import { RootReducer } from "@/store/store";


export default function Profile() {
  const [userData, setUserData] = useState({} as dataUser); // State to store the fetched profile data
  const username = sessionStorage.getItem("username");
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);
        if (response.status === 200) {
          setUserData(response.data);
          dispatch(userUpdate(response.data))
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

  const { updatingProfile } = useSelector((state: RootReducer) => state.profile);

  const loggedUser = sessionStorage.getItem("auth_token");

  if (!loggedUser) {
    return window.location.href = "/login";
  }

  useEffect(() => {
    if (userData.birthday) {
      dispatch(isUpdating(true));
    } else {
      dispatch(isUpdating(false));
    }
  }, [userData]);

  const handleUpdate = () => {
    if (updatingProfile && userData) {
      return <ProfileInfo dataUser={userData}/>
    }
    return <FormProfile dataUser={userData} />
  }

  return (
    <div className="h-screen bg-grayBg" >
      {handleUpdate()}
    </div>
  );
}
