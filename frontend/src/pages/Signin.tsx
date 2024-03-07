import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { useRegister } from "@/api/register/useRegister";
import { RegisterData } from "@/api/register/types";

export default function Signin() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  
  const [samePassword, setSamePassword] = useState(true);

  const { registerUser } = useRegister()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password !== confirmPassword) {
      setSamePassword(false);
      return;
    }
    try {
      registerUser(userData as RegisterData);
      window.location.href = "/login";

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-screen bg-grayBg flex flex-col gap-10 justify-center items-center">
      <h1 className="head-text">Welcome to the App!</h1>
      <form
        onSubmit={handleSubmit}
        className="p-12 rounded-2xl w-96 bg-white shadow-2xl"
      >
        <h2 className="text-2xl text-center mb-10">Sign in</h2>
        <Label htmlFor="email">Email:</Label>
        <Input
          className="mb-8"
          name="email"
          type="email"
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="username">First Name:</Label>
        <Input
          className="mb-8"
          name="first_name"
          type="text"
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="lastname">Last Name:</Label>
        <Input
          className="mb-8"
          name="last_name"
          type="text"
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="username">Username:</Label>
        <Input
          className="mb-8"
          name="username"
          type="text"
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          className="mb-10"
          type="password"
          name="password"
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="confirmPassword">Confirm Password:</Label>
        <Input
          className="mb-10"
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {!samePassword && (
          <p className="text-sm text-red-500 pb-1">Passwords does not match</p>
        )}
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </section>
  );
}
