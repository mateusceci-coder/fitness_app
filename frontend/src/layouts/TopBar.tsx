import { NavLink } from "react-router-dom";


export default function TopBar() {
  return (
    <nav className="invisible sm:visible sticky top-0 z-10 w-full bg-primary text-secondary rounded-b-3xl py-2 px-6 backdrop-blur-lg xs:px-7">
      <div className="flex justify-evenly">
        <NavLink className="nav-button" to="/">Home</NavLink>
        <NavLink className="nav-button" to="exercises">Exercises</NavLink>
        <NavLink className="nav-button" to="workouts">Workouts</NavLink>
        <NavLink className="nav-button" to="profile">Profile</NavLink>
      </div>
    </nav>
  );
}
