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
import { capitalize } from "@/lib/utils";

import {
  addNewBodybuildingWorkout,
  bodybuildingExercise,
  deleteBodybuildingWorkout,
} from "@/store/reducers/workout";
import { RootReducer } from "@/store/store";
import { Dumbbell, Lightbulb, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function WorkBodybuilding() {
  const [isFormWorkOpen, setIsFormWorkOpen] = useState(false);
  const [addingExercise, setAddingExercise] = useState(false);
  const [nameWorkout, setNameWorkout] = useState("");
  const [nameExercise, setNameExercise] = useState("");
  const [repsExercise, setRepsExercise] = useState(1);
  const [seriesExercise, setSeriesExercise] = useState(1);
  const [equipment, setEquipment] = useState("Bar");
  const [workoutItem, setWorkoutItem] = useState<bodybuildingExercise[]>([]);
  const { workoutsBodybuilding } = useSelector(
    (store: RootReducer) => store.workout
  );
  const { bodybuildingList } = useSelector(
    (store: RootReducer) => store.exercise
  );
  const dispatch = useDispatch();

  const handleNewExercise = () => {
    const suggestedWeight = calculateSuggestedWeight(
      nameExercise,
      equipment,
      repsExercise
    );

    setWorkoutItem((workoutItem) => [
      ...workoutItem,
      {
        nameExercise: nameExercise,
        repsExercise: repsExercise,
        seriesExercise: seriesExercise,
        equipment: equipment,
        suggestedWeight: suggestedWeight,
      },
    ]);
    setAddingExercise(false);
    setNameExercise("");
    setRepsExercise(1);
    setSeriesExercise(1);

  };

  const handleNewWorkout = () => {
    if (!nameWorkout || workoutItem.length === 0) return;

    dispatch(
      addNewBodybuildingWorkout({
        id: crypto.randomUUID(),
        name: nameWorkout,
        exercise: workoutItem,
      })
    );
    setAddingExercise(false);
    setNameExercise("");
    setRepsExercise(1);
    setSeriesExercise(1);
    setIsFormWorkOpen(false);
    setWorkoutItem([])
  };

  const handleDeleteWorkout = (id: string) => {
    dispatch(deleteBodybuildingWorkout(id));
  };

  const calculateSuggestedWeight = (
    exerciseName: string,
    equipment: string,
    numReps: number
  ) => {
    const repMax =
      bodybuildingList
        .filter(
          (exercise) =>
            exercise.exercise.toLowerCase() === exerciseName.toLowerCase() &&
            exercise.equipment === equipment
        )
        .map((exercise) => exercise.weight || 0)
        .find(Boolean) || 0;


    return calculateWeightReps(repMax, numReps);
  };


  return (
    <section className="flex lg:justify-between lg:flex-row flex-col items-center p-4">
      <article>
        <div className="border-0 p-4 text-center w-96 rounded-full bg-mainGray relative">
        <Lightbulb color="yellow" strokeWidth={3} size={24} className="absolute top-2 left-10" />
          <h2 className="mb-2">Suggested Weight</h2>
          <p className="text-sm">
            If you add 1 rep max of an exercise and use it in a workout, it will
            automatically give you a suggested weight according to the number of
            repetitions that you are doing
          </p>
        </div>
      </article>
      <div className="flex flex-col items-center p-5 gap-2">
      <header>
        <h1 className="head-text mb-8">Bodybuilding Workouts</h1>
      </header>
      <Button onClick={() => setIsFormWorkOpen((i) => !i)}>New Workout</Button>
      {isFormWorkOpen && (
        <form className="border-2 p-4 rounded-xl flex flex-col gap-2 w-96">
          <Label className="text-center text-lg" htmlFor="wod">
            Workout:
          </Label>
          <Input
            type="text"
            placeholder="Name of the Workout"
            id="workout"
            onChange={(e) => setNameWorkout(e.target.value)}
          />
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
          </div>
          {addingExercise && (
            <div className="mt-4 border-b-2 p-2">
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  placeholder="Exercise"
                  onChange={(e) => setNameExercise(e.target.value)}
                />
                <Input
                  type="number"
                  className="w-20"
                  placeholder="Series"
                  onChange={(e) => setSeriesExercise(+e.target.value)}
                />
                <Input
                  type="number"
                  className="w-20"
                  placeholder="Reps"
                  onChange={(e) => setRepsExercise(+e.target.value)}
                />
              </div>
              <div className="mb-2">
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
              <li>
                <span>{exercise.seriesExercise}</span>x
                <span>{exercise.repsExercise}</span>{" "}
                {capitalize(exercise.nameExercise)}{" "}
                {exercise.equipment !== "Bodyweight" &&
                  `(${exercise.equipment})`}
              </li>
            ))}
          </ul>
          <Button type="button" onClick={handleNewWorkout}>
            Create Workout
          </Button>
        </form>
      )}
      {workoutsBodybuilding.map((workout) => (
        <Collapsible
          key={workout.id}
          className="flex flex-col border-2 p-4 rounded-xl w-96 relative"
        >
          <X
            color="red"
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => handleDeleteWorkout(workout.id)}
          />
          <div className="flex justify-center">
            <CollapsibleTrigger>
              <h2 className="text-2xl mb-3">{workout.name}</h2>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex gap-2 flex-col">
            <p className="text-right text-sm text-mainGray">
              Suggested Weight:
            </p>
            <ul>
              {workout.exercise.map((ex) => (
                <li className="flex justify-between border-b-2 p-1">
                  <div>
                    <span>{ex.seriesExercise}</span>x{ex.repsExercise}
                    <span>
                      {" "}
                      {ex.nameExercise} ({ex.equipment})
                    </span>
                  </div>
                  <div>
                    {ex.suggestedWeight !== 0 && (
                      <p className="text-sm text-mainGray">
                        {Math.round(ex.suggestedWeight)} kg
                      </p>
                    )}{" "}
                  </div>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
      </div>


      <div className="w-80"></div>
    </section>
  );
}
