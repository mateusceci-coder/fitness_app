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
import { Dumbbell, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkoutCF } from "@/api/workoutCF/useWorkoutCF";
import { exercisesParamsCF, workoutParamsCF } from "@/api/workoutCF/types";
import axios from "axios";

import Loading from "../Loading";

export default function WorkCrossfit() {
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
  const [wodItem, setWodItem] = useState<exercisesParamsCF[]>([]);
  const [equipment, setEquipment] = useState("Barbell");
  const [noSelectingExercise, setNoSelectingExercise] = useState(true);
  const [noNewExercise, setNoNewExercise] = useState(true);
  const [blankNameWod, setBlankNameWod] = useState(false);
  const [blankExercises, setBlankExercises] = useState(false);
  const [blankTypeWod, setBlankTypeWod] = useState(false);
  const [blankTimeCap, setBlankTimeCap] = useState(false);
  const [crossfitWorkouts, setCrossfitWorkouts] = useState<
    workoutParamsCF[] | null
  >(null);
  const [wrongExercise, setWrongExercise] = useState(false);

  const { createWorkoutCF, deleteWorkoutCF } = useWorkoutCF();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://fitness-app-y9fc.onrender.com/api/workouts/crossfit/`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCrossfitWorkouts(response.data);
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
    const newWod = {
      name: nameWod,
      execution_type: typeWod,
      time_cap: timeCap,
      rounds: rounds,
      exercises: wodItem,
    };

    createWorkoutCF(newWod, fetchData);

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
    if (!nameExercise || !repsExercise || !equipment) {
      setWrongExercise(true);
      return;
    }

    const newExerciseItem = {
      name: nameExercise,
      reps: repsExercise,
      weight_for_men: menWeight,
      weight_for_women: womenWeight,
      equipment: equipment,
    };

    setWodItem((currentExercises) => [...currentExercises, newExerciseItem]);

    setEquipment("Barbell");
    setNameExercise("");
    setRepsExercise(0);
    setWomenWeight(0);
    setMenWeight(0);
    setAddingExercise(false);
    setWrongExercise(false);
  };

  const handleDeleteWod = (id: number) => {
    deleteWorkoutCF(id, fetchData);
  };

  const textExercise = noSelectingExercise && noNewExercise;

  const handleTextForm = () => {
    setNoNewExercise(true);
    setNoSelectingExercise(true);
  };

  return crossfitWorkouts ? (
    <section className="flex flex-col items-center p-5 gap-2">
      <header>
        <h1 className="head-text">Crossfit Workouts</h1>
      </header>
      <Button data-test="newWodBtnCF" onClick={handleFormWork}>
        New WOD
      </Button>
      {isFormWorkOpen && (
        <form className="bg-primary p-4 rounded-xl flex flex-col gap-2 w-72 xs:w-112">
          <Label className="text-center text-white text-lg" htmlFor="wod">
            WOD:
          </Label>
          <Input
            data-test="workoutNameCF"
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
              <SelectItem value="AMRAP">AMRAP</SelectItem>
              <SelectItem data-test="forTimeCF" value="FT">
                For Time
              </SelectItem>
            </SelectContent>
          </Select>
          {typeWod !== "AMRAP" && (
            <div>
              <Input
                data-test="roundsCF"
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
              data-test="addExBtnCF"
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
                <div className="flex flex-col items-center mb-4">
                  <Input
                    data-test="repsInputCF"
                    min={1}
                    max={500}
                    type="number"
                    className="w-20 my-2"
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
                        data-test="newExBtnCF"
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
                        data-test="exNameInputCF"
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
                <div className="flex flex-col gap-2 mb-2">
                  <span className="text-center">Weight (kg) (optional):</span>
                  <div className="flex justify-center gap-4">
                    <Input
                      data-test="menWeightCF"
                      type="number"
                      min={0}
                      max={500}
                      className="w-22"
                      placeholder="men"
                      onChange={(e) => setMenWeight(+e.target.value)}
                    />
                    <Input
                      data-test="womenWeightCF"
                      type="number"
                      min={0}
                      max={500}
                      className="w-22"
                      placeholder="women"
                      onChange={(e) => setWomenWeight(+e.target.value)}
                    />
                  </div>
                </div>
                <Select onValueChange={(e) => setEquipment(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem data-test="barbellCF" value="Barbell">
                      Barbell
                    </SelectItem>
                    <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                    <SelectItem value="Kettlebell">Kettlebell</SelectItem>
                    <SelectItem data-test="bodyweightCF" value="Bodyweight">
                      Bodyweight
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {wrongExercise && (
                  <p className="text-sm text-red-500">
                    Exercise need to have a name, reps and equipment
                  </p>
                )}
                <Button
                  data-test="saveExCF"
                  className="bg-mainGreen hover:bg-mainGreen hover:brightness-105 mt-5"
                  type="button"
                  onClick={handleNewExercise}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <ul className="flex gap-1 flex-col my-2 text-white">
            {wodItem.map((exercise) => (
              <li>
                <span>{exercise.reps}</span> {capitalizeText(exercise.name)}{" "}
                <span>
                  {exercise.weight_for_men === 0 &&
                  exercise.weight_for_women === 0
                    ? ""
                    : `(${exercise.weight_for_men}/${exercise.weight_for_women})`}
                </span>
              </li>
            ))}
          </ul>
          <Input
            data-test="timeCapCF"
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
          <Button
            data-test="createWodCF"
            type="button"
            className="bg-secondary text-black hover:bg-muted-foreground"
            onClick={handleNewWod}
          >
            Create WOD
          </Button>
        </form>
      )}
      {crossfitWorkouts.map((workout) => (
        <Collapsible
          className="bg-grayBg p-2 rounded-xl shadow-xl w-72 xs:w-128 relative mb-8"
          data-test={workout.name}
        >
          <X
            data-test="deleteWodCF"
            color="red"
            className="absolute top-3 right-2 cursor-pointer"
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
              <p>
                <b>
                  {workout.execution_type === "AMRAP" ? "AMRAP" : "For Time"}
                </b>
              </p>
              {workout.rounds && workout.rounds > 1 && (
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
                  {workout.exercises.map((ex) => (
                    <TableRow>
                      <TableCell>{ex.reps}</TableCell>
                      <TableCell className="font-medium">
                        {capitalizeText(ex.name)}
                      </TableCell>
                      <TableCell>
                        {ex.weight_for_men === 0 && ex.weight_for_women === 0
                          ? ""
                          : `(${ex.weight_for_men}/${ex.weight_for_women})`}
                      </TableCell>
                      <TableCell className="text-right">
                        {ex.equipment}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {workout.time_cap > 0 && (
              <p>
                <b>Time Cap:</b> {workout.time_cap}'
              </p>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </section>
  ) : (
    <Loading />
  );
}
