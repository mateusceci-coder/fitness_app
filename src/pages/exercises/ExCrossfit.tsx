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
import { capitalize } from "@/lib/utils";
import {
  delExCrossfit,
  editingExerciseId,
  updateWeightCrossfit,
} from "@/store/reducers/exercise";
import { RootReducer } from "@/store/store";
import { Check } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExCrossfit() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const { crossfitList, exerciseId } = useSelector(
    (store: RootReducer) => store.exercise
  );
  const { weightUser } = useSelector((store: RootReducer) => store.profile);
  const dispatch = useDispatch();

  const handleDelExerciseCrossfit = (id: string) => {
    dispatch(
      delExCrossfit(crossfitList.filter((exercise) => exercise.id !== id))
    );
  };

  const handleUpdateRM = (exerciseId: string) => {
    dispatch(editingExerciseId(exerciseId));
  };

  const handleInputRM = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseId: string
  ) => {
    const newWeight = Number((+event.target.value).toFixed(2));
    const updatedList = crossfitList.map((exercise) =>
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
    dispatch(updateWeightCrossfit(updatedList));
  };

  const handleFinishEditing = () => {
    dispatch(editingExerciseId(""));
  };

  const handleSelect = (e: string | null) => {
    if (e === "All") {
      setSelectedEquipment(null);
    } else {
      setSelectedEquipment(e);
    }
  };

  return (
    <section>
      <header className="my-16">
        <h1 className="head-text">Crossfit Exercises</h1>
      </header>
      <div className="flex justify-evenly pb-5 max-w-5xl mx-auto">
        <Select defaultValue="All" onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Bar">Bar</SelectItem>
            <SelectItem value="Dumbbell">Dumbell</SelectItem>
            <SelectItem value="Kettlebell">Kettlebell</SelectItem>
          </SelectContent>
        </Select>
        <DialogButton />
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
          {crossfitList
            .filter(
              (exercise) =>
                !selectedEquipment ||
                exercise.equipment === selectedEquipment
            )
            .map((exercise) => {
              return (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">
                    {capitalize(exercise.exercise)}
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
                          onChange={(event) =>
                            handleInputRM(event, exercise.id)
                          }
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
