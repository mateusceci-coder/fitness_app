
import { DialogLogout } from "@/components/DialogLogout";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


export default function TopBar() {
  const [isLogged, setIsLogged] = useState(false);
  const token = sessionStorage.getItem("auth_token");

  useEffect(() => {
    setIsLogged(!!token);
  }, [token]);

  return (
    <nav className="hidden sm:inline-block top-0 z-10 w-full bg-primary text-secondary rounded-b-3xl py-2 px-6 backdrop-blur-lg xs:px-7 relative">
      <div className="flex justify-evenly">
        <NavLink className="nav-button" to="/">Home</NavLink>
        <NavLink className="nav-button" to="exercises">Exercises</NavLink>
        <NavLink className="nav-button" to="workouts">Workouts</NavLink>
        <NavLink className="nav-button" to="profile">Profile</NavLink>
      </div>
      {
        isLogged ?
          <DialogLogout /> :
          <NavLink className="nav-button absolute top-1 right-5 underline" to="login">Login</NavLink>
      }
    </nav>
  );
}

