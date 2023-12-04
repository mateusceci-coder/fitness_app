import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { exercisesProps } from "@/constants/exercises";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";

interface Params {
  setNewCrossfitList: Dispatch<SetStateAction<exercisesProps[]>>;
  setNewBodybuildingList: Dispatch<SetStateAction<exercisesProps[]>>;
}

export default function DialogButton({
  setNewBodybuildingList,
  setNewCrossfitList,
}: Params) {
  const [exercise, setExercise] = useState("");
  const [equipment, setEquipment] = useState("");
  const [maxRep, setMaxRep] = useState(0);
  const location = useLocation();

  const handleNewExercise = () => {
    if (location.pathname === "/exercises/crossfit") {
      setNewCrossfitList((list) => [
        ...list,
        {
          id: crypto.randomUUID(),
          exercise: exercise,
          equipment: equipment,
          weight: Number(maxRep.toFixed(2)),
        },
      ]);
    } else {
      setNewBodybuildingList((list) => [
        ...list,
        {
          id: crypto.randomUUID(),
          exercise: exercise,
          equipment: equipment,
          weight: Number(maxRep.toFixed(2)),
        },
      ]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
          <DialogDescription>
            Add the name of the exercise, the equipament that is used and (if
            you want) your 1 rep max
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 mb-1">
            <Label htmlFor="exercise" className="text-right">
              Exercise
            </Label>
            <Input
              id="exercise"
              defaultValue=""
              onChange={(e) => setExercise(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="equipment" className="text-right">
              Equipment
            </Label>
            <RadioGroup defaultValue="bar" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Bar"
                  id="bar"
                  onClick={() => setEquipment("Bar")}
                />
                <Label htmlFor="bar">Bar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Dumbbell"
                  id="dumbbell"
                  onClick={() => setEquipment("Dumbbell")}
                />
                <Label htmlFor="dumbbell">Dumbbell</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Kettlebell"
                  id="kettlebell"
                  onClick={() => setEquipment("Kettlebell")}
                />
                <Label htmlFor="kettlebell">Kettlebell</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="one-rep-max" className="text-right">
            1 Rep Max (optional)
          </Label>
          <Input
            id="one-rep-max"
            defaultValue=""
            onChange={(e) => setMaxRep(+e.target.value)}
            className="col-span-3"
            type="number"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleNewExercise}>Add Exercise</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
