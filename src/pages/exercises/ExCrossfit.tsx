import DialogButton from "@/components/DialogButton";
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
import { exercisesCrossfitList, exercisesProps } from "@/constants/exercises";
import { capitalize } from "@/lib/utils";
import { RootReducer } from "@/store/store";
import { Check } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

export default function ExCrossfit() {
  const [newCrossfitList, setNewCrossfitList] = useState<exercisesProps[]>(
    exercisesCrossfitList
  );
  const [editingExerciseId, setEditingExerciseId] = useState("");
  const { crossfitList } = useSelector((store: RootReducer) =>  store.exercise)

  const handleDelExerciseCrossfit = (id: string) => {
    setNewCrossfitList(
      newCrossfitList.filter((exercise) => exercise.id !== id)
    );
  };

  const handleUpdateRM = (exerciseId: string) => {
    setEditingExerciseId(exerciseId);
  };

  const handleInputRM = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseId: string
  ) => {
    const updatedList = newCrossfitList.map((exercise) =>
      exercise.id === exerciseId
        ? { ...exercise, weight: Number((+event.target.value).toFixed(2)) }
        : exercise
    );
    setNewCrossfitList(updatedList);
  };
  const handleFinishEditing = () => {
    setEditingExerciseId("");
  };

  return (
    <section>
      <header className="my-16">
        <h1 className="head-text">Crossfit Exercises</h1>
      </header>
      <div className="flex justify-center pb-5">
        <DialogButton setNewCrossfitList={setNewCrossfitList} />
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
          {crossfitList.map((exercise) => {
            return (
              <TableRow key={exercise.id}>
                <TableCell className="font-medium">
                  {capitalize(exercise.exercise)}
                </TableCell>
                <TableCell className="text-right">
                  {exercise.equipment}
                </TableCell>
                <TableCell className="text-right ">
                  {editingExerciseId === exercise.id ? (
                    <div className="flex justify-end">
                      <Input
                        className="w-16"
                        type="number"
                        value={exercise.weight}
                        onChange={(event) => handleInputRM(event, exercise.id)}
                      />{" "}
                      <Check
                        color="green"
                        className="ml-1 cursor-pointer"
                        onClick={handleFinishEditing}
                      />
                    </div>
                  ) : (
                    Number(exercise.weight.toFixed(2))
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {exercise.relation}
                </TableCell>
                <TableCell className="text-right">
                  {editingExerciseId === exercise.id ? (
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
    </section>
  );
}
