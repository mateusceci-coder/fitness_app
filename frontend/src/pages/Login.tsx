import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const apiUrl = "https://fitness-app-y9fc.onrender.com/auth/token/login/";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const username = userData.username;
    const password = userData.password;

    try {
      const res = await axios.post(apiUrl, {
        username,
        password,
      });

      sessionStorage.setItem("auth_token", res.data.auth_token);
      sessionStorage.setItem("username", username);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        window.location.href = "/profile/";
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen bg-grayBg flex flex-col gap-10 justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="head-text">Welcome to the App!</h1>
          <form
            onSubmit={handleSubmit}
            className="p-12 rounded-2xl w-96 bg-white shadow-2xl"
          >
            <h2 className="text-2xl text-center mb-10">LOGIN</h2>
            <Label htmlFor="username">Username:</Label>
            <Input
              data-test="username-login"
              className="mb-8"
              name="username"
              type="text"
              onChange={handleInputChange}
              autoComplete="username"
              required
            />
            <Label htmlFor="password">Password:</Label>
            <Input
              data-test="password-login"
              className="mb-10"
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
            <Button className="w-full mb-2" type="submit">
              Login
            </Button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signin" className="text-mainBlue">
                Create now!
              </Link>{" "}
            </p>
          </form>
        </>
      )}
    </section>
  );
}
