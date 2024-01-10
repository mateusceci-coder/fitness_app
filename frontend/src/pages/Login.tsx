import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const apiUrl = "http://127.0.0.1:8000/auth/token/login/";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      const data = await res.json();
      sessionStorage.setItem("auth_token", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="h-screen bg-loginBg flex flex-col gap-10 justify-center items-center">
      <h1 className="head-text">Welcome to the App!</h1>
      <form
        onSubmit={handleSubmit}
        className="p-12 rounded-2xl w-96 bg-white shadow-2xl"
      >
        <h2 className="text-2xl text-center mb-10">LOGIN</h2>
        <Label htmlFor="username">Username:</Label>
        <Input
          className="mb-8"
          name="username"
          type="text"
          value={userData.username}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          className="mb-10"
          type="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </section>
  );
}
