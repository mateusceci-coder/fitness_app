
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
import {
  editingExerciseId
} from "@/store/reducers/exercise";
import { RootReducer } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Lightbulb } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogButtonBB from "@/components/DialogButtonBB";
import { getExerciseList } from "@/api/exercise/types";
import { useExercise } from "@/api/exercise/useExercise";

export default function ExBodybuilding({exercisesData} : {exercisesData: getExerciseList[] } ) {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
    const dispatch = useDispatch()

    console.log (exercisesData)
  const { updateExercise } = useExercise()

  const { exerciseId } = useSelector((store: RootReducer) => store.exercise)


  const handleInputRM = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseId: number
  ) => {
    const newWeight = Number((+event.target.value).toFixed(2));

    updateExercise(newWeight, exerciseId)

  };

  const handleUpdateRM = (exerciseId: number) => {
    dispatch(editingExerciseId(exerciseId));
  };

  const handleFinishEditing = () => {
    dispatch(editingExerciseId(0));
  };

  const handleDelExerciseBodybuilding = (id: number) => {
      exercisesData.filter((exercise) => exercise.id !== id)
  };

  const handleSelect = (e: string | null) => {
    if (e === "All") {
      setSelectedEquipment(null);
    } else {
      setSelectedEquipment(e);
    }
  };

  return (
    <section className="relative">
      <header className="my-16">
        <h1 className="head-text">Bodybuilding Exercises</h1>
      </header>
      <div className="flex justify-evenly max-w-5xl mx-auto pb-5">
        <Select defaultValue="All" onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Barbell">Barbell</SelectItem>
            <SelectItem value="Dumbbell">Dumbell</SelectItem>
            <SelectItem value="Machine">Machine</SelectItem>
            <SelectItem value="Bodyweight">BodyWeight</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <DialogButtonBB />
        <div></div>
      </div>
      <Table className="max-w-5xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead className="text-right">Equipment</TableHead>
            <TableHead className="text-right">Weight (kg)</TableHead>
            <TableHead className="text-right">Relation(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercisesData
            .filter(
              (exercise) =>
                !selectedEquipment || exercise.equipment === selectedEquipment
            )
            .map((exercise) => {
              return (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">
                    {capitalize(exercise.name)}
                  </TableCell>
                  <TableCell className="text-right">
                    {exercise.equipment}
                  </TableCell>
                  <TableCell className="text-right ">
                    {exerciseId === exercise.id ? (
                      <div className="flex justify-end">
                        <Input
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
                          color="green"
                          className="ml-1 cursor-pointer"
                          onClick={handleFinishEditing}
                        />
                      </div>
                    ) : exercise.rep_max < 0 ? (
                      0
                    ) : (
                      Number(exercise.rep_max.toFixed(2))
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {exerciseId === exercise.id}
                  </TableCell>
                  <TableCell className="text-right">
                    {exerciseId === exercise.id ? (
                      ""
                    ) : (
                      <Button onClick={() => handleUpdateRM(exercise.id)}>
                        Update
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-destructive"
                      onClick={() => handleDelExerciseBodybuilding(exercise.id)}
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
        <article>
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
  );
}
