import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Login() {
  return (
   <section className="h-screen bg-loginBg flex flex-col gap-10 justify-center items-center">
    <h1 className="head-text">Welcome to the App!</h1>
    <form className="p-8 rounded-2xl max-w-2xl bg-white shadow-2xl">
        <h2 className="text-2xl text-center mb-10">LOGIN</h2>
        <Label htmlFor="email">Email:</Label>
        <Input className="mb-8" type="text" required />
        <Label htmlFor="password">Password:</Label>
        <Input className="mb-10" type="password" required />
        <Button className="w-full" type="submit">Login</Button>
    </form>
   </section>
  )
}
