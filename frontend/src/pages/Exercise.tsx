import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const FormExercises = () => {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [rep_max, setRep_max] = useState("");

  const token = sessionStorage.getItem("auth_token");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/exercises/create/", {
        name, equipment, rep_max
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      toast.success("Logged in successfully!");
      setTimeout(() => {
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Exercises</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Equipment"
          onChange={(e) => setEquipment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Rep_max"
          onChange={(e) => setRep_max(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default FormExercises;
