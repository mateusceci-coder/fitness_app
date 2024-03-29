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
  const apiUrl = "https://fitness-app-y9fc.onrender.com/auth/token/logout/";

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
        (window.location.href = "/login");
      sessionStorage.removeItem("auth_token");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          data-test="logout"
          className="hover:bg-white hover:text-black absolute top-2 right-3 underline"
        >
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
          <Button data-test="confirm-logout" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
