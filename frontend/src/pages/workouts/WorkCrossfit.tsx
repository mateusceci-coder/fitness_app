import SelectExCrossfit from "@/components/SelectExCrossfit";
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
import { capitalize } from "@/lib/utils";
import {
  addNewCrossfitWorkout,
  crossfitExercise,
  deleteCrossfitWorkout,
} from "@/store/reducers/workout";
import { RootReducer } from "@/store/store";
import { Dumbbell, Undo2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function WorkCrossfit() {
  const { workoutsCrossfit } = useSelector(
    (store: RootReducer) => store.workout
  );
  const dispatch = useDispatch();
  const [isFormWorkOpen, setIsFormWorkOpen] = useState(false);
  const [addingExercise, setAddingExercise] = useState(false);
  const [nameWod, setNameWod] = useState("");
  const [timeCap, setTimeCap] = useState(0);
  const [typeWod, setTypeWod] = useState("");
  const [rounds, setRounds] = useState(1);
  const [nameExercise, setNameExercise] = useState("");
  const [repsExercise, setRepsExercise] = useState(0);
  const [womenWeight, setWomenWeight] = useState(0);
  const [menWeight, setMenWeight] = useState(0);
  const [wodItem, setWodItem] = useState<crossfitExercise[]>([]);
  const [equipment, setEquipment] = useState("Bar");
  const [noSelectingExercise, setNoSelectingExercise] = useState(true);
  const [noNewExercise, setNoNewExercise] = useState(true);

  const handleFormWork = () => {
    setIsFormWorkOpen((i) => !i);
  };

  const handleSetExercise = () => {
    setAddingExercise((i) => !i);
    setNoNewExercise(true);
    setNoSelectingExercise(true);
  };

  const handleNewWod = () => {
    if (!nameWod || !typeWod || wodItem.length === 0) return;

    dispatch(
      addNewCrossfitWorkout({
        id: crypto.randomUUID(),
        name: nameWod,
        type: typeWod,
        timeCap: timeCap,
        exercise: wodItem,
        rounds: rounds,
      })
    );
    setIsFormWorkOpen(false);
    setNameExercise("");
    setRepsExercise(0);
    setWomenWeight(0);
    setMenWeight(0);
    setAddingExercise(false);
    setWodItem([]);
  };

  const handleNewExercise = () => {
    if (!nameExercise || !repsExercise) return;

    setWodItem((wodItem) => [
      ...wodItem,
      {
        nameExercise: nameExercise,
        repsExercise: repsExercise,
        womensWeight: womenWeight,
        mensWeight: menWeight,
        equipment: equipment,
      },
    ]);
    setEquipment("Bar");
    setNameExercise("");
    setRepsExercise(0);
    setWomenWeight(0);
    setMenWeight(0);
    setAddingExercise(false);
  };

  const handleDeleteWod = (id: string) => {
    dispatch(deleteCrossfitWorkout(id));
  };

  const textExercise = noSelectingExercise && noNewExercise;

  const handleTextForm = () => {
    setNoNewExercise(true)
    setNoSelectingExercise(true)
  }

  return (
    <section className="flex flex-col items-center p-5 gap-2">
      <header>
        <h1 className="head-text">Crossfit Workouts</h1>
      </header>
      <Button onClick={handleFormWork}>New WOD</Button>
      {isFormWorkOpen && (
        <form className="border-2 p-4 rounded-xl flex flex-col gap-2 w-96">
          <Label className="text-center text-lg" htmlFor="wod">
            WOD:
          </Label>
          <Input
            type="text"
            placeholder="Name of the WOD"
            id="wod"
            onChange={(e) => setNameWod(e.target.value)}
          />
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
              min={1}
              max={500}
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
              <div className="mt-4 border-2 rounded-xl p-2">
                <div className="flex gap-2 mb-2">
                  <Input
                    min={0}
                    max={500}
                    type="number"
                    className="w-20"
                    placeholder="Reps"
                    onChange={(e) => setRepsExercise(+e.target.value)}
                  />
                  {textExercise && (
                    <div className="text-sm">
                      <div
                        className="text-mainBlue cursor-divointer hover:underline inline"
                        onClick={() => setNoSelectingExercise(false)}
                      >
                        Select Exercise
                      </div>{" "}
                      or{" "}
                      <div
                        className=" text-mainBlue cursor-pointer hover:underline inline"
                        onClick={() => setNoNewExercise(false)}
                      >
                        Create New Exercise
                      </div>
                    </div>
                  )}
                  {!noSelectingExercise && (
                    <SelectExCrossfit
                      nameExercise={nameExercise}
                      setNameExercise={setNameExercise}
                      setNoNewExercise={setNoNewExercise}
                      setNoSelectingExercise={setNoSelectingExercise}
                      noSelectingExercise={noSelectingExercise}
                    />
                  )}
                  {!noNewExercise && (
                    <>
                      <Input
                        type="text"
                        placeholder="Exercise"
                        onChange={(e) => setNameExercise(e.target.value)}
                      />{" "}
                      <Undo2
                      size={36}
                        className="inline ml-1 cursor-pointer"
                        color="blue"
                        onClick={handleTextForm}
                      />
                    </>
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="text-sm">Weight (optional):</span>
                  <Input
                    type="number"
                    min={0}
                    max={500}
                    className="w-24"
                    placeholder="men"
                    onChange={(e) => setMenWeight(+e.target.value)}
                  />
                  <Input
                    type="number"
                    min={0}
                    max={500}
                    className="w-24"
                    placeholder="women"
                    onChange={(e) => setWomenWeight(+e.target.value)}
                  />
                  (kg)
                </div>
                <Select onValueChange={(e) => setEquipment(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bar">Bar</SelectItem>
                    <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                    <SelectItem value="Kettlebell">Kettlebell</SelectItem>
                    <SelectItem value="Bodyweight">Bodyweight</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="bg-mainGreen hover:bg-mainGreen hover:brightness-105 mt-5"
                  type="button"
                  onClick={handleNewExercise}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <ul className="flex gap-1 flex-col my-2">
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
            min={1}
            max={500}
            type="number"
            placeholder="Time Cap"
            id="timeCap"
            className="w-32"
            onChange={(e) => setTimeCap(+e.target.value)}
          />
          <Button type="button" onClick={handleNewWod}>
            Create WOD
          </Button>
        </form>
      )}
      {workoutsCrossfit.map((workout) => (
        <Collapsible className="border-2 p-2 rounded-xl w-96 relative">
          <X
            color="red"
            className="absolute bottom-3 right-2 cursor-pointer"
            onClick={() => handleDeleteWod(workout.id)}
          />
          <div className="flex justify-center">
            <CollapsibleTrigger>
              <h2 className="text-2xl">{capitalize(workout.name)}</h2>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex gap-2 flex-col">
            <h1 className="text-lg mt-5 mb-2">
              <p>{workout.type === "amrap" ? "AMRAP" : "For Time"}</p>
              {workout.rounds > 1 && (
                <p>
                  {workout.rounds} <span>{workout.rounds && "rounds"}</span>{" "}
                </p>
              )}
            </h1>
            <ul>
              {workout.exercise.map((ex) => (
                <li>
                  <span>{ex.repsExercise}</span> {capitalize(ex.nameExercise)}{" "}
                  <span>
                    {ex.mensWeight === 0 && ex.womensWeight === 0
                      ? ""
                      : `(${ex.mensWeight}/${ex.womensWeight})`}
                  </span>{" "}
                  {ex.equipment === "Bodyweight" ? "" : `- ${ex.equipment}`}
                </li>
              ))}
            </ul>
            {workout.timeCap > 0 && <p>Time Cap: {workout.timeCap}'</p>}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </section>
  );
}
