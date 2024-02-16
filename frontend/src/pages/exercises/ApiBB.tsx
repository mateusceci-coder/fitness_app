import { useState, useEffect } from "react";
import axios from "axios";
import ExBodybuilding from "./ExBodybuilding";




export default function ApiBB() {

    const [dataBodybuilding, setDataBodybuilding] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/exercises/`, {
                headers : {Authorization: `Token ${sessionStorage.getItem("auth_token")}`}
            })
            if (response.status === 200) {
              setDataBodybuilding(response.data)
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
      }, []);

  return (
    <>
        {dataBodybuilding && <ExBodybuilding exercisesData={dataBodybuilding} />}
    </>
  )
}
