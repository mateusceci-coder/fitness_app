import { NavLink } from "react-router-dom";


export default function TopBar() {
  return (
    <nav className="invisible sm:visible top-0 z-10 w-full bg-primary text-secondary rounded-b-3xl py-2 px-6 backdrop-blur-lg xs:px-7 relative">
      <div className="flex justify-evenly">
        <NavLink className="nav-button" to="/">Home</NavLink>
        <NavLink className="nav-button" to="exercises">Exercises</NavLink>
        <NavLink className="nav-button" to="workouts">Workouts</NavLink>
        <NavLink className="nav-button" to="profile">Profile</NavLink>
      </div>
        <NavLink className="nav-button absolute top-1 right-5 text-lg underline" to="login" >Login</NavLink>
    </nav>
  );
}
