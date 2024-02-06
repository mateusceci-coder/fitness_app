import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

export function DialogLogout() {
  const apiUrl = "http://127.0.0.1:8000/auth/token/logout/";

  const handleLogout = async () => {
    try {
      await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
          },
        }
      ),
      window.location.href = "/login"
        sessionStorage.removeItem("auth_token");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-white hover:text-black absolute top-2 right-3 underline">
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure that you want do logout?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-evenly gap-4 py-4">
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
