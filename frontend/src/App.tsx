import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Exercises from "./pages/exercises/Exercises";
import Profile from "./pages/Profile";
import Workouts from "./pages/workouts/Workouts";

import BottomBar from "./layouts/BottomBar";
import Navbar from "./layouts/TopBar";
import ExCrossfit from "./pages/exercises/ExCrossfit";
import ExBodybuilding from "./pages/exercises/ExBodybuilding";
import WorkCrossfit from "./pages/workouts/WorkCrossfit";
import WorkBodybuilding from "./pages/workouts/WorkBodybuilding";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="/exercises/crossfit" element={<ExCrossfit />} />
        <Route path="/exercises/bodybuilding" element={<ExBodybuilding />} />
        <Route path="profile" element={<Profile />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="workouts/crossfit" element={<WorkCrossfit />} />
        <Route path="workouts/bodybuilding" element={<WorkBodybuilding />} />
      </Routes>
      <BottomBar />
    </Router>
  );
}
