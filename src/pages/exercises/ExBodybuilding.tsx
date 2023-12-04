import DialogButton from "@/components/DialogButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exercisesBodybuildingList, exercisesProps } from "@/constants/exercises";
import { RootReducer } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function ExBodybuilding() {
  const [newBodybuildingList, setNewBodybuildingList] = useState<exercisesProps[]>(exercisesBodybuildingList)
  const { bodybuildingList } = useSelector((store: RootReducer) => store.exercise)

  return (
    <section>
      <header className="my-16">
        <h1 className="head-text">Bodybuilding Exercises</h1>
      </header>
      <div className="flex justify-center pb-5">
        <DialogButton setNewBodybuildingList={setNewBodybuildingList} />
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
                <TableCell className="text-right">{Number(exercise.weight.toFixed(2))}</TableCell>
                <TableCell className="text-right">
                  {exercise.relation}
                </TableCell>
                <TableCell className="text-right">
                  <Button>Update</Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-destructive ">Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
