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
import {
  delExBodybuilding,
  editingExerciseId,
  updateWeightBodybuilding,
} from "@/store/reducers/exercise";
import { RootReducer } from "@/store/store";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ExBodybuilding() {
  const { bodybuildingList, exerciseId } = useSelector(
    (store: RootReducer) => store.exercise
  );
  const { weightUser } = useSelector((store: RootReducer) => store.profile);
  const dispatch = useDispatch();

  const handleInputRM = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseId: string
  ) => {
    const newWeight = Number((+event.target.value).toFixed(2));
    const updatedList = bodybuildingList.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            weight: newWeight,
            relation:
              weightUser === 0 || newWeight < 0
                ? 0
                : Number((+event.target.value / weightUser).toFixed(2)),
          }
        : exercise
    );
    dispatch(updateWeightBodybuilding(updatedList));
  };

  const handleUpdateRM = (exerciseId: string) => {
    dispatch(editingExerciseId(exerciseId));
  };

  const handleFinishEditing = () => {
    dispatch(editingExerciseId(""));
  };

  const handleDelExerciseBodybuilding = (id: string) => {
    dispatch(
      delExBodybuilding(
        bodybuildingList.filter((exercise) => exercise.id !== id)
      )
    );
  };

  return (
    <section>
      <header className="my-16">
        <h1 className="head-text">Bodybuilding Exercises</h1>
      </header>
      <div className="flex justify-center pb-5">
        <DialogButton />
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
          {bodybuildingList.map((exercise) => {
            return (
              <TableRow>
                <TableCell className="font-medium">
                  {exercise.exercise}
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
                        value={exercise.weight}
                        onChange={(event) => handleInputRM(event, exercise.id)}
                        min={0}
                      />{" "}
                      <Check
                        color="green"
                        className="ml-1 cursor-pointer"
                        onClick={handleFinishEditing}
                      />
                    </div>
                  ) : exercise.weight < 0 ? (
                    0
                  ) : (
                    Number(exercise.weight.toFixed(2))
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {exercise.relation}
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
    </section>
  );
}
