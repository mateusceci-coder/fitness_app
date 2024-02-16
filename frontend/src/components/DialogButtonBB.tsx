import { useExercise } from "@/api/exercise/useExercise";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { capitalizeText } from "@/lib/utils";
import {
  addExerciseBodybuilding,
  addExerciseCrossfit,
} from "@/store/reducers/exercise";
import { RootReducer } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function DialogButton() {
  const [exercise, setExercise] = useState("");
  const [equipment, setEquipment] = useState("Barbell");
  const [maxRep, setMaxRep] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const { weightUser } = useSelector((store: RootReducer) => store.profile);
  const { createExercise } = useExercise()

  const handleNewExercise = () => {

    let relation: number;

    if (!exercise) {
      return;
    }

    if (weightUser) {
      relation = Number((maxRep / weightUser).toFixed(2));
    } else {
      relation = 0;
    }

    const newExercise = {
      name: exercise,
      equipment: equipment,
      rep_max: Number(maxRep.toFixed(2)),
    };

    createExercise(newExercise)

    if (location.pathname === "/exercises/crossfit") {
      dispatch(addExerciseCrossfit(newExercise));
    } else {
      dispatch(addExerciseBodybuilding(newExercise));
    }

    setExercise("");
    setEquipment("Barbell");
    setMaxRep(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
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
              onChange={(e) => setExercise(capitalizeText(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="equipment" className="text-right">
              Equipment
            </Label>
            <RadioGroup className="flex flex-wrap" defaultValue="Barbell">
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="Barbell"
                  id="Barbell"
                  onClick={() => setEquipment("Barbell")}
                />
                <Label htmlFor="Barbell">Barbell</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="Dumbbell"
                  id="dumbbell"
                  onClick={() => setEquipment("Dumbbell")}
                />
                <Label htmlFor="dumbbell">Dumbbell</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="Machine"
                  id="Machine"
                  onClick={() => setEquipment("Machine")}
                />
                <Label htmlFor="Machine">Machine</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="Bodyweight"
                  id="Bodyweight"
                  onClick={() => setEquipment("Bodyweight")}
                />
                <Label htmlFor="Bodyweight">Bodyweight</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="Other"
                  id="Other"
                  onClick={() => setEquipment("Other")}
                />
                <Label htmlFor="Other">Other</Label>
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
