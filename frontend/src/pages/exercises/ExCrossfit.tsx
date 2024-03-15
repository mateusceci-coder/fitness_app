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
import { Check, Lightbulb } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogButtonCF from "@/components/DialogButtonCF";
import axios from "axios";
import { getExerciseList } from "@/api/exerciseBB/types";
import Loading from "../Loading";
import { useExerciseCF } from "@/api/exerciseCF/useExerciseCF";

export default function ExCrossfit() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const { id } = useSelector((store: RootReducer) => store.exercise);
  const [exercisesData, setExercisesData] = useState<getExerciseList[] | null>(
    null
  );
  const [listExercises, setListExercises] = useState<getExerciseList[] | null>(
    exercisesData
  );

  const { deleteExerciseCF, updateExerciseCF } = useExerciseCF();

  const dispatch = useDispatch();

  const [userWeight, setUserWeight] = useState<number | null>(null);

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
        `http://127.0.0.1:8000/api/exercises/crossfit/`,
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

  const loggedUser = sessionStorage.getItem("auth_token");

  if (!loggedUser) {
    return window.location.href = "/login";
  }

  useEffect(() => {
    fetchData();
    fetchProfile();

    // Cleanup function to handle component unmounting
    return () => {
      // Any cleanup actions go here
    };
  }, []);

  const handleDelExerciseCrossfit = (id: number) => {
    deleteExerciseCF(id, fetchData);
  };

  const handleUpdateRM = (id: number) => {
    dispatch(editingExerciseId(id));
  };

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

  const handleFinishEditing = (id: number) => {
    const findExercise =
      listExercises && listExercises.find((exercise) => exercise.id === id);
    const newRepMax = findExercise ? findExercise.rep_max : 0;

    updateExerciseCF(newRepMax, id);

    dispatch(editingExerciseId(0));
  };

  const handleSelect = (e: string | null) => {
    if (e === "All") {
      setSelectedEquipment(null);
    } else {
      setSelectedEquipment(e);
    }
  };

  return exercisesData ? (
    <section className="relative">
      <header className="my-16">
        <h1 className="head-text">Crossfit Exercises</h1>
      </header>
      <div className="flex flex-col sm:flex-row items-center sm:justify-evenly pb-5 max-w-5xl mx-auto gap-2">
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
              <SelectItem value="Kettlebell">Kettlebell</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogButtonCF fetchData={fetchData} />
        <div></div>
      </div>
      <Table data-test="tableCF" className="max-w-5xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead className="text-right">Equipment</TableHead>
            <TableHead className="text-right">1RM (kg)</TableHead>
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
                    <TableCell data-test="rmCF" className="text-right ">
                      {id === exercise.id ? (
                        <div className="flex justify-end">
                          <Input
                            data-test="update-repMaxCF"
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
                            data-test="check-btnCF"
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
                    <TableCell  className="text-right">
                      {id === exercise.id ? (
                        ""
                      ) : (
                        <Button data-test="update-btnCF" onClick={() =>
                        handleUpdateRM(exercise.id)}>
                          Update
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        data-test="delete-btnCF"
                        className="bg-destructive hover:bg-red-400"
                        onClick={() => handleDelExerciseCrossfit(exercise.id)}
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
