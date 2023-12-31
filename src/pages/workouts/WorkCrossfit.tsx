import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewCrossfitWorkout, crossfitExercise } from "@/store/reducers/workout";
import { RootReducer } from "@/store/store";
import { Dumbbell } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function WorkCrossfit() {
  const { workoutsCrossfit } = useSelector((store: RootReducer) => store.workout)
  const dispatch = useDispatch()
  const [isFormWorkOpen, setIsFormWorkOpen] = useState(false);
  const [addingExercise, setAddingExercise] = useState(false);
  const [nameWod, setNameWod] = useState("")
  const [timeCap, setTimeCap] = useState(0)
  const [typeWod, setTypeWod] = useState("")
  const [rounds, setRounds] = useState(1)
  const [nameExercise, setNameExercise] = useState("");
  const [repsExercise, setRepsExercise] = useState(0);
  const [womenWeight, setWomenWeight] = useState(0);
  const [menWeight, setMenWeight] = useState(0);
  const [wodItem, setWodItem] = useState<crossfitExercise[]>([]);

  const handleFormWork = () => {
    setIsFormWorkOpen((i) => !i);
  };

  const handleSetExercise = () => {
    setAddingExercise((i) => !i);
  };

  const handleNewWod = () => {
    dispatch(addNewCrossfitWorkout({
      name: nameWod,
      type: typeWod,
      timeCap: timeCap,
      exercise: wodItem,
      rounds: rounds,
    }))
    setIsFormWorkOpen(false)
  }

  const handleNewExercise = () => {
    if (!nameExercise || !repsExercise) return;

    setWodItem((wodItem) => [
      ...wodItem,
      {
        nameExercise: nameExercise,
        repsExercise: repsExercise,
        womensWeight: womenWeight,
        mensWeight: menWeight,
      },
    ]);
    setNameExercise("");
    setRepsExercise(0);
    setWomenWeight(0);
    setMenWeight(0);
    setAddingExercise(false);
  };

  return (
    <div className="flex flex-col items-center p-5 gap-2">
      <Button onClick={handleFormWork}>New WOD</Button>
      {isFormWorkOpen && (
        <form className="border-2 p-4 rounded-xl flex flex-col gap-2 w-96">
          <Label className="text-center text-lg" htmlFor="wod">
            WOD:
          </Label>
          <Input type="text" placeholder="Name of the WOD" id="wod" onChange={(e) => setNameWod(e.target.value)} />
          <Select onValueChange={(e) => setTypeWod(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="WOD Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amrap">AMRAP</SelectItem>
              <SelectItem value="forTime">For Time</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Input
              type="number"
              placeholder="Rounds"
              className="w-24 inline mr-2"
              onChange={(e) => setRounds(+e.target.value)}
            />
            <span className="text-xs">Optional</span>
          </div>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-36"
              onClick={handleSetExercise}
            >
              {addingExercise ? "Close" : "Add Exercise"}
              <Dumbbell className="inline ml-1" size={16} color="green" />
            </Button>
            {addingExercise && (
              <div className="mt-4 border-b-2 p-2">
                <div className="flex gap-2 mb-2">
                  <Input
                    type="number"
                    className="w-20"
                    placeholder="Reps"
                    onChange={(e) => setRepsExercise(+e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Exercise"
                    onChange={(e) => setNameExercise(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="text-sm">Weight (optional):</span>
                  <Input
                    type="number"
                    className="w-24"
                    placeholder="men"
                    onChange={(e) => setMenWeight(+e.target.value)}
                  />
                  <Input
                    type="number"
                    className="w-24"
                    placeholder="women"
                    onChange={(e) => setWomenWeight(+e.target.value)}
                  />
                  (kg)
                </div>
                <Button
                  className="bg-mainGreen hover:bg-mainGreen hover:brightness-105"
                  type="button"
                  onClick={handleNewExercise}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <ul className="flex gap-1 flex-col my-5">
            {wodItem.map((exercise) => (
              <li>
                <span>{exercise.repsExercise}</span> {exercise.nameExercise}{" "}
                <span>
                  {exercise.mensWeight === 0 && exercise.womensWeight === 0
                    ? ""
                    : `(${exercise.mensWeight}/${exercise.womensWeight})`}
                </span>
              </li>
            ))}
          </ul>
          <Input
            type="number"
            placeholder="Time Cap"
            id="timeCap"
            className="w-32"
            onChange={(e) => setTimeCap(+e.target.value)}
          />
          <Button type="button" onClick={handleNewWod}>Create WOD</Button>
        </form>
      )}
      {workoutsCrossfit.map((workout) =>
            <Collapsible className="border-2 p-2 rounded-xl w-96">
            <div className="flex justify-center">
              <CollapsibleTrigger>
                <h2 className="text-2xl">{workout.name}</h2>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex gap-2 flex-col">
              <h1 className="text-lg mt-5 mb-2">
                <p>{workout.type === "amrap" ? "AMRAP" : "For Time"}</p>
                <p>{workout.rounds}</p> <span>{workout.rounds && "rounds"}</span>
              </h1>
              <ul>
                {workout.exercise.map((ex) =>
                   <li><span>{ex.repsExercise}</span> {ex.nameExercise} <span>{ex.mensWeight === 0 && ex.womensWeight === 0  ? "" : `(${ex.mensWeight}/${ex.womensWeight})`}</span></li>
                )}
              </ul>
              <p>Time Cap: {workout.timeCap}'</p>
            </CollapsibleContent>
            </Collapsible>
        )
      }
    </div>
  );
}
