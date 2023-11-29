import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { exercisesList } from "@/constants/exercises"


export default function ExBodybuilding() {
  return (
    <section>
      <header className="my-16">
        <h1 className="head-text">Bodybuilding Exercises</h1>
      </header>
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
    {exercisesList.map((exercise) => {
      return (
        <TableRow>
          <TableCell className="font-medium">{exercise.exercise}</TableCell>
          <TableCell className="text-right">{exercise.equipment}</TableCell>
          <TableCell className="text-right">{exercise.weight}</TableCell>
          <TableCell className="text-right">{exercise.relation}</TableCell>
      </TableRow>
    )})}
  </TableBody>
</Table>


    </section>
  )
}
