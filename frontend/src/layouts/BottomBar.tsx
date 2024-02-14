import { ClipboardList, Dumbbell, Home, LogIn, User } from "lucide-react";


export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 z-10 w-screen xs:w-full bg-primary text-secondary rounded-t-3xl py-4 px-6 backdrop-blur-lg sm:hidden">
      <ul className="flex justify-between">
        <li>
          <a href="/">
            <Home className="hover:cursor-pointer" size={20} />
          </a>
        </li>
        <li>
          <a href="/exercises">
            <Dumbbell className="hover:cursor-pointer" size={20} />
          </a>
        </li>
        <li>
          <a href="/workouts">
            <ClipboardList className="hover:cursor-pointer" size={20} />
          </a>
        </li>
        <li>
          <a href="/profile">
            <User className="hover:cursor-pointer" size={20} />
          </a>
        </li>
        <li>
          <a href="login">
            <LogIn className="hover:cursor-pointer" size={20} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
