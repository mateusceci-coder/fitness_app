import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Workouts from "./pages/Workouts";

import BottomBar from "./layouts/BottomBar";

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="exercises" element={<Exercises />} />
      <Route path="profile" element={<Profile />} />
      <Route path="workouts" element={<Workouts />} />
    </Routes>
    <BottomBar />
  </Router>
  )
}


