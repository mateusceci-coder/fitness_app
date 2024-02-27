import SelectExBodybuilding from "@/components/SelectExBodybuilding";
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
import { calculateWeightReps } from "@/lib/calculators";
import { capitalizeText } from "@/lib/utils";

import {
  addNewBodybuildingWorkout,
  bodybuildingExercise,
  deleteBodybuildingWorkout,
} from "@/store/reducers/workout";
import { RootReducer } from "@/store/store";
import { Dumbbell, Lightbulb, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exerciseBB, workoutParamsBB } from "@/api/workoutBB/types";
import axios from "axios";
import { useWorkoutBB } from "@/api/workoutBB/useWorkoutBB";
import Loading from "../Loading";

export default function WorkBodybuilding() {
  const [isFormWorkOpen, setIsFormWorkOpen] = useState(false);
  const [addingExercise, setAddingExercise] = useState(false);
  const [nameWorkout, setNameWorkout] = useState("");
  const [nameExercise, setNameExercise] = useState("");
  const [repsExercise, setRepsExercise] = useState(1);
  const [seriesExercise, setSeriesExercise] = useState(1);
  const [equipment, setEquipment] = useState("Barbell");
  const [workoutItem, setWorkoutItem] = useState<exerciseBB[]>([]);
  const [noSelectingExercise, setNoSelectingExercise] = useState(true);
  const [noNewExercise, setNoNewExercise] = useState(true);
  const [blankWorkout, setBlankWorkout] = useState(false);
  const [blankExercise, setBlankExercise] = useState(false);
  const [bodybuildingWorkouts, setBodybuildingWorkouts] = useState<
    workoutParamsBB[] | null
  >(null);
  const dispatch = useDispatch();
  const { createWorkoutBB, deleteWorkoutBB } = useWorkoutBB();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/workouts/bodybuilding/`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setBodybuildingWorkouts(response.data);
      } else {
        throw new Error("Profile not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewExercise = () => {
    if (!nameExercise) return;

    const suggestedWeight = calculateSuggestedWeight(
      nameExercise,
      equipment,
      repsExercise
    );

    setWorkoutItem((workoutItem) => [
      ...workoutItem,
      {
        name: nameExercise,
        repetitions: repsExercise,
        series: seriesExercise,
        equipment: equipment,
      },
    ]);
    setAddingExercise(false);
    setNameExercise("");
    setRepsExercise(1);
    setSeriesExercise(1);
    setBlankExercise(false);
  };

  const handleNewWorkout = () => {
    if (!nameWorkout || workoutItem.length === 0) {
      setBlankWorkout(!nameWorkout);
      setBlankExercise(workoutItem.length === 0);
      return;
    }

    createWorkoutBB(bodybuildingWorkouts, fetchData);

    setAddingExercise(false);
    setNameExercise("");
    setRepsExercise(1);
    setSeriesExercise(1);
    setIsFormWorkOpen(false);
    setWorkoutItem([]);
    setBlankExercise(false);
    setBlankWorkout(false);
  };

  const handleDeleteWorkout = (id: number) => {
    deleteWorkoutBB(id, fetchData);
  };

  const calculateSuggestedWeight = (
    exerciseName: string,
    equipment: string,
    numReps: number
  ) => {
    const repMax =
      bodybuildingWorkouts.exercises
        .filter(
          (exercise) =>
            exercise.name.toLowerCase() === exerciseName.toLowerCase() &&
            exercise.equipment === equipment
        )
        .map((exercise) => exercise.rep_max || 0)
        .find(Boolean) || 0;

    return calculateWeightReps(repMax, numReps);
  };

  const textExercise = noNewExercise && noSelectingExercise;

  const handleFormText = () => {
    setNoNewExercise(true);
    setNoSelectingExercise(true);
  };

  return bodybuildingWorkouts ? (
    <section className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center p-5 gap-2">
        <header>
          <h1 className="head-text mb-8 break-words">Bodybuilding Workouts</h1>
        </header>
        <Button onClick={() => setIsFormWorkOpen((i) => !i)}>
          New Workout
        </Button>
        {isFormWorkOpen && (
          <form className="bg-primary p-4 rounded-xl flex flex-col gap-2 w-72 xs:w-96">
            <Label className="text-center text-lg text-white" htmlFor="wod">
              Workout:
            </Label>
            <Input
              type="text"
              placeholder="Name of the Workout"
              id="workout"
              onChange={(e) => setNameWorkout(e.target.value)}
            />
            {blankWorkout && (
              <p className="text-sm text-red-500">Workout needs a title</p>
            )}
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-36"
                onClick={() => setAddingExercise((i) => !i)}
              >
                {addingExercise ? "Close" : "Add Exercise"}
                <Dumbbell className="inline ml-1" size={16} color="green" />
              </Button>
              {blankExercise && (
                <p className="text-sm text-red-500">
                  Workout needs at least one exercise
                </p>
              )}
            </div>
            {addingExercise && (
              <div className="mt-4 bg-white rounded-xl p-3">
                <div>
                  {textExercise && (
                    <div className="text-sm">
                      <div
                        className="text-mainBlue cursor-pointer hover:underline"
                        onClick={() => setNoSelectingExercise(false)}
                      >
                        Select Exercise
                      </div>{" "}
                      or{" "}
                      <div
                        className="text-mainBlue hover:underline cursor-pointer"
                        onClick={() => setNoNewExercise(false)}
                      >
                        Create New Exercise
                      </div>
                    </div>
                  )}
                  {!noNewExercise && (
                    <div className="flex">
                      <Input
                        type="text"
                        placeholder="Exercise"
                        onChange={(e) =>
                          setNameExercise(capitalizeText(e.target.value))
                        }
                      />
                      <Undo2
                        size={36}
                        className="inline ml-1 cursor-pointer"
                        color="green"
                        onClick={handleFormText}
                      />
                    </div>
                  )}
                  {!noSelectingExercise && (
                    <SelectExBodybuilding
                      nameExercise={nameExercise}
                      setNameExercise={setNameExercise}
                      setNoNewExercise={setNoNewExercise}
                      setNoSelectingExercise={setNoSelectingExercise}
                      noSelectingExercise={noSelectingExercise}
                    />
                  )}
                  <div className="flex gap-4 my-2">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Series"
                      onChange={(e) => setSeriesExercise(+e.target.value)}
                      min={1}
                      max={500}
                    />
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Reps"
                      onChange={(e) => setRepsExercise(+e.target.value)}
                      min={1}
                      max={500}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <Select onValueChange={(e) => setEquipment(e)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Barbell">Barbell</SelectItem>
                      <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                      <SelectItem value="Machine">Kettlebell</SelectItem>
                      <SelectItem value="Bodyweight">Bodyweight</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
            <ul className="flex gap-1 flex-col my-5">
              {workoutItem.map((exercise) => (
                <li className="text-white">
                  <span>{exercise.series}</span>x
                  <span>{exercise.repetitions}</span>{" "}
                  {capitalizeText(exercise.name)}{" "}
                  {exercise.equipment !== "Bodyweight" &&
                    `(${exercise.equipment})`}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="bg-secondary text-black hover:bg-muted-foreground"
              onClick={handleNewWorkout}
            >
              Create Workout
            </Button>
          </form>
        )}
        {bodybuildingWorkouts.map((workout) => (
          <Collapsible
            key={workout.id}
            className="flex flex-col bg-grayBg p-2 shadow-xl rounded-xl w-72 xs:w-128 relative mb-5"
          >
            <X
              color="red"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => handleDeleteWorkout(workout.id)}
            />
            <div className="flex justify-center">
              <CollapsibleTrigger>
                <h2 className="text-2xl mb-3">
                  <b>{workout.name}</b>
                </h2>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Exercise</TableHead>
                    <TableHead>Series</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead className="text-right">
                      Suggested Weight
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workout.exercises.map((ex) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {capitalizeText(ex.name)}
                      </TableCell>
                      <TableCell>{ex.series}</TableCell>
                      <TableCell>{ex.repetitions}</TableCell>
                      <TableCell>{ex.equipment}</TableCell>
                      <TableCell className="text-right">
                        {ex.suggestedWeight !== 0 && ex.suggestedWeight}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <article>
        <div className="border-0 p-4 text-center w-72 rounded-full bg-mainGray relative">
          <Lightbulb
            color="yellow"
            strokeWidth={3}
            size={24}
            className="absolute top-2 left-10"
          />
          <h2 className="mb-2">Suggested Weight</h2>
          <p className="text-sm">
            If you add 1 rep max of an exercise and use it in a workout, it will
            automatically give you a suggested weight according to the number of
            repetitions that you are doing
          </p>
        </div>
      </article>
    </section>
  ) : (
    <Loading />
  );
}
