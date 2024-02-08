import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-mainBlue text-white px-2 pt-8 pb-16 md:pb-2 w-screen">
      <div className="flex flex-col items-center md:flex-row md:justify-between lg:justify-evenly">
        <ul>
        <h1 className="text-2xl lg:text-3xl mb-2">Contact Us</h1>
            <li className="mb-1">
                <p className="text-xl">Email: <span className="text-base">fitnessapp@email.com</span></p>
            </li>
            <li className="mb-8">
                <p className="text-xl">Telephone: <span className="text-base">+55 (51) 1234-7891</span></p>
            </li>
        </ul>
        <div className="mb-8 md:my-auto flex flex-col items-center">
            <p className="text-lg lg:text-xl">Subscribe to receive our Newsletter!</p>
            <Button>Subscribe</Button>
        </div>
        <div className="md:my-auto">
            <p className="text-lg lg:text-xl">Follow us on social media!</p>
            <div className="flex gap-4">
                <Youtube className="hover:cursor-pointer" />
                <Instagram className="hover:cursor-pointer"  />
                <Twitter className="hover:cursor-pointer"  />
            </div>
        </div>
      </div>
    </footer>
  );
}
