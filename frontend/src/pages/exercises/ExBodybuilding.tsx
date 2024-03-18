import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "@/lib/utils";
import { editingExerciseId } from "@/store/reducers/exercise";
import { RootReducer } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Lightbulb } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogButtonBB from "@/components/DialogButtonBB";
import { getExerciseList } from "@/api/exerciseBB/types";
import axios from "axios";
import Loading from "../Loading";
import { useExerciseBB } from "@/api/exerciseBB/useExerciseBB";

export default function ExBodybuilding() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const [exercisesData, setExercisesData] = useState<getExerciseList[] | null>(
    null
  );
  const [listExercises, setListExercises] = useState<getExerciseList[] | null>(
    exercisesData
  );

  const [userWeight, setUserWeight] = useState<number | null>(null);

  const dispatch = useDispatch();

  const { updateExerciseBB, deleteExerciseBB } = useExerciseBB();

  const { id } = useSelector((store: RootReducer) => store.exercise);

  const fetchProfile = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/profile/${username}/`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUserWeight(response.data.weight);
      } else {
        throw new Error("Profile not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/exercises/bodybuilding`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setExercisesData(response.data);
        setListExercises(response.data);
      } else {
        throw new Error("Profile not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProfile();

    // Cleanup function to handle component unmounting
    return () => {
      // Any cleanup actions go here
    };
  }, []);

  const handleInputRM = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const newWeight = Number((+event.target.value).toFixed(2));
    setListExercises(
      listExercises &&
        listExercises.map((exercise) => {
          if (exercise.id === id) {
            exercise.rep_max = newWeight;
          }
          return exercise;
        })
    );
  };

  const handleUpdateRM = (id: number) => {
    dispatch(editingExerciseId(id));
  };

  const handleFinishEditing = (id: number) => {
    const findExercise =
      listExercises && listExercises.find((exercise) => exercise.id === id);
    const newRepMax = findExercise ? findExercise.rep_max : 0;

    updateExerciseBB(newRepMax, id);

    dispatch(editingExerciseId(0));
  };

  const handleDelExerciseBodybuilding = (id: number) => {
    deleteExerciseBB(id, fetchData);
  };

  const handleSelect = (e: string | null) => {
    if (e === "All") {
      setSelectedEquipment(null);
    } else {
      setSelectedEquipment(e);
    }
  };

  const loggedUser = sessionStorage.getItem("auth_token");

  if (!loggedUser) {
    return (window.location.href = "/login");
  }

  return exercisesData ? (
    <section className="relative">
      <header className="my-16">
        <h1 className="head-text">Bodybuilding Exercises</h1>
      </header>
      <div className="flex flex-col sm:flex-row items-center md:justify-evenly max-w-5xl mx-auto pb-5 gap-2">
        <div className="flex gap-2">
          <span className="text-sm mt-2">Select Equipment</span>
          <Select defaultValue="All" onValueChange={(e) => handleSelect(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Barbell">Barbell</SelectItem>
              <SelectItem value="Dumbbell">Dumbell</SelectItem>
              <SelectItem value="Machine">Machine</SelectItem>
              <SelectItem value="Bodyweight">Bodyweight</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogButtonBB fetchData={fetchData} />
        <div></div>
      </div>
      <Table data-test="tableBB" className="max-w-5xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead className="text-right">Equipment</TableHead>
            <TableHead className="text-right">Weight (kg)</TableHead>
            <TableHead className="text-right">Relation(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listExercises &&
            listExercises
              .filter(
                (exercise) =>
                  !selectedEquipment || exercise.equipment === selectedEquipment
              )
              .map((exercise) => {
                return (
                  <TableRow data-test={exercise.name} key={exercise.id}>
                    <TableCell className="font-medium">
                      {capitalize(exercise.name)}
                    </TableCell>
                    <TableCell className="text-right">
                      {exercise.equipment}
                    </TableCell>
                    <TableCell data-test="rmBB" className="text-right ">
                      {id === exercise.id ? (
                        <div className="flex justify-end">
                          <Input
                            data-test="update-repMaxBB"
                            className="w-16"
                            type="number"
                            value={exercise.rep_max}
                            onChange={(event) =>
                              handleInputRM(event, exercise.id)
                            }
                            min={0}
                            max={500}
                          />{" "}
                          <Check
                            data-test="check-btnBB"
                            color="green"
                            className="ml-1 cursor-pointer"
                            onClick={() => handleFinishEditing(exercise.id)}
                          />
                        </div>
                      ) : exercise.rep_max < 0 ? (
                        0
                      ) : (
                        Number(exercise.rep_max.toFixed(2))
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {userWeight && (exercise.rep_max / userWeight).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {id === exercise.id ? (
                        ""
                      ) : (
                        <Button
                          data-test="update-btnBB"
                          onClick={() => handleUpdateRM(exercise.id)}
                        >
                          Update
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        data-test="delete-btnBB"
                        className="bg-destructive hover:bg-red-400"
                        onClick={() =>
                          handleDelExerciseBodybuilding(exercise.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center gap-2 mt-20">
        <article>
          <div className="border-0 p-2 text-center w-80 h-24 rounded-full bg-mainGray relative">
            <Lightbulb
              color="yellow"
              strokeWidth={3}
              size={24}
              className="absolute top-2 left-10"
            />
            <h2 className="mb-2 text-sm">1 Rep Max (RM)</h2>
            <p className="text-xs">
              Keep a record of how much weight you can put on for just one
              repetition
            </p>
          </div>
        </article>
        <article className="mb-16">
          <div className="border-0 p-2 text-center w-80 rounded-full bg-mainGray relative h-24">
            <Lightbulb
              color="yellow"
              strokeWidth={3}
              size={24}
              className="absolute top-2 left-10"
            />
            <h2 className="mb-2 text-sm">Relation (%)</h2>
            <p className="text-xs">
              Update your Profile weight and your 1RM in the exercises you want
              to give the percentage between your 1RM and your weight (kg/kg)
            </p>
          </div>
        </article>
      </div>
    </section>
  ) : (
    <Loading />
  );
}
