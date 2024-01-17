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
import { capitalize, capitalizeText } from "@/lib/utils";
import {
  addNewCrossfitWorkout,
  crossfitExercise,
  deleteCrossfitWorkout,
} from "@/store/reducers/workout";
import { RootReducer } from "@/store/store";
import { Dumbbell, Undo2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [repsExercise, setRepsExercise] = useState(1);
  const [womenWeight, setWomenWeight] = useState(0);
  const [menWeight, setMenWeight] = useState(0);
  const [wodItem, setWodItem] = useState<crossfitExercise[]>([]);
  const [equipment, setEquipment] = useState("Bar");
  const [noSelectingExercise, setNoSelectingExercise] = useState(true);
  const [noNewExercise, setNoNewExercise] = useState(true);
  const [blankNameWod, setBlankNameWod] = useState(false);
  const [blankExercises, setBlankExercises] = useState(false);
  const [blankTypeWod, setBlankTypeWod] = useState(false);
  const [blankTimeCap, setBlankTimeCap] = useState(false);

  const handleFormWork = () => {
    setIsFormWorkOpen((i) => !i);
  };

  const handleSetExercise = () => {
    setAddingExercise((i) => !i);
    setNoNewExercise(true);
    setNoSelectingExercise(true);
  };

  const handleNewWod = () => {
    if (!nameWod || !typeWod || wodItem.length === 0 || timeCap === 0) {
      setBlankNameWod(!nameWod);
      setBlankTypeWod(!typeWod);
      setBlankExercises(wodItem.length === 0);
      setBlankTimeCap(true);

      return;
    }

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
    setBlankExercises(false);
    setBlankNameWod(false);
    setBlankTimeCap(false);
    setBlankTypeWod(false);
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
    setNoNewExercise(true);
    setNoSelectingExercise(true);
  };

  return (
    <section className="flex flex-col items-center p-5 gap-2">
      <header>
        <h1 className="head-text">Crossfit Workouts</h1>
      </header>
      <Button onClick={handleFormWork}>New WOD</Button>
      {isFormWorkOpen && (
        <form className="bg-primary p-4 rounded-xl flex flex-col gap-2 w-72 xs:w-112">
          <Label className="text-center text-white text-lg" htmlFor="wod">
            WOD:
          </Label>
          <Input
            type="text"
            placeholder="Name of the WOD"
            id="wod"
            onChange={(e) => setNameWod(e.target.value)}
          />
          {blankNameWod && (
            <p className="text-sm text-red-500">WOD need to have a name</p>
          )}
          <Select onValueChange={(e) => setTypeWod(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="WOD Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amrap">AMRAP</SelectItem>
              <SelectItem value="forTime">For Time</SelectItem>
            </SelectContent>
          </Select>
          {typeWod !== "amrap" && (
            <div>
              <Input
                type="number"
                min={1}
                max={500}
                placeholder="Rounds"
                className="w-24 inline mr-2"
                onChange={(e) => setRounds(+e.target.value)}
              />
              <span className="text-xs text-white">Optional</span>
              {blankTypeWod && (
                <p className="text-sm text-red-500">Select a workout type</p>
              )}
            </div>
          )}
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
            {blankExercises && (
              <p className="text-sm text-red-500">
                WOD need at least one exercise
              </p>
            )}
            {addingExercise && (
              <div className="mt-4 bg-white rounded-xl p-2">
                <div className="flex gap-2 mb-2">
                  <Input
                    min={1}
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
                        color="green"
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
                    className="w-20"
                    placeholder="men"
                    onChange={(e) => setMenWeight(+e.target.value)}
                  />
                  <Input
                    type="number"
                    min={0}
                    max={500}
                    className="w-20"
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
                <span>{exercise.repsExercise}</span> {capitalizeText(exercise.nameExercise)}{" "}
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
          {blankTimeCap && (
            <p className="text-sm text-red-500">WOD need to have a time cap</p>
          )}
          <Button type="button" className="bg-secondary text-black hover:bg-muted-foreground" onClick={handleNewWod}>
            Create WOD
          </Button>
        </form>
      )}
      {workoutsCrossfit.map((workout) => (
        <Collapsible className="bg-grayBg p-2 rounded-xl shadow-xl w-72 xs:w-128 relative mb-8">
          <X
            color="red"
            className="absolute bottom-3 right-2 cursor-pointer"
            onClick={() => handleDeleteWod(workout.id)}
          />
          <div className="flex justify-center">
            <CollapsibleTrigger>
              <h2 className="text-2xl">
                <b>{capitalize(workout.name)}</b>
              </h2>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex gap-2 flex-col">
            <h1 className="text-lg mt-5 mb-2">
              <p><b>{workout.type === "amrap" ? "AMRAP" : "For Time"}</b></p>
              {workout.rounds > 1 && (
                <p className="text-center">
                  {workout.rounds} <span>{workout.rounds && "rounds"}</span>{" "}
                </p>
              )}
            </h1>
            <div className="mb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Reps</TableHead>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Weight (M/F)</TableHead>
                    <TableHead className="text-right">Equipment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workout.exercise.map((ex) => (
                    <TableRow>
                    <TableCell>{ex.repsExercise}</TableCell>
                    <TableCell className="font-medium">{capitalizeText(ex.nameExercise)}</TableCell>
                    <TableCell>{ex.mensWeight === 0 && ex.womensWeight === 0
                      ? ""
                      : `(${ex.mensWeight}/${ex.womensWeight})`}</TableCell>
                    <TableCell className="text-right">{ex.equipment}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {workout.timeCap > 0 && <p><b>Time Cap:</b> {workout.timeCap}'</p>}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </section>
  );
}
