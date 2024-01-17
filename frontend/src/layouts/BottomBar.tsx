import { ClipboardList, Dumbbell, Home, LogIn, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 z-10 w-screen xs:w-full bg-primary text-secondary rounded-t-3xl py-4 px-6 backdrop-blur-lg sm:hidden">
      <ul className="flex justify-between">
        <li>
          <NavLink to="/">
            <Home className="hover:cursor-pointer" size={20} />
          </NavLink>
        </li>
        <li>
          <NavLink to="exercises">
            <Dumbbell className="hover:cursor-pointer" size={20} />
          </NavLink>
        </li>
        <li>
          <NavLink to="workouts">
            <ClipboardList className="hover:cursor-pointer" size={20} />
          </NavLink>
        </li>
        <li>
          <NavLink to="profile">
            <User className="hover:cursor-pointer" size={20} />
          </NavLink>
        </li>
        <li>
          <NavLink to="login">
            <LogIn className="hover:cursor-pointer" size={20} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
