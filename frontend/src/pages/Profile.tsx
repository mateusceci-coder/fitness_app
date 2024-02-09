import FormProfile from "@/layouts/profile/FormProfile";
import {  userUpdate } from "@/store/reducers/profile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Profile() {
  const [userData, setUserData] = useState(null); // State to store the fetched profile data
  const username = sessionStorage.getItem("username");
  const dispatch = useDispatch()
  console.log(userData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);
        if (response.status === 200) {
          setUserData(response.data);
          dispatch(userUpdate(response.data))
          console.log(response.data)
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
    <div className="h-screen bg-grayBg" >
      {userData && <FormProfile dataUser={userData} />}
    </div>
  );
}
