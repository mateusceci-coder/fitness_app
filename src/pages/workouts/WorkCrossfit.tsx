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
import { useState } from "react";

export default function WorkCrossfit() {
  const [isFormWorkOpen, setIsFormWorkOpen] = useState(false);

  const handleFormWork = () => {
    setIsFormWorkOpen((i) => !i);
  };

  return (
    <div className="flex flex-col items-center p-5 gap-2">
      <Button onClick={handleFormWork}>New WOD</Button>
      {isFormWorkOpen && (
        <form className="border-2 p-4 rounded-xl flex flex-col items-center gap-2">
          <Label className="text-center text-lg" htmlFor="wod">
            WOD:
          </Label>
          <Input type="text" placeholder="Name of the WOD" id="wod" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="WOD Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amrap">AMRAP</SelectItem>
              <SelectItem value="emom">EMOM</SelectItem>
              <SelectItem value="forTime">For Time</SelectItem>
              <SelectItem value="repsForTime">Reps For Time</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Create WOD</Button>
        </form>
      )}
      <Collapsible className="border-2 p-2 rounded-xl w-96">
        <CollapsibleTrigger>
          <h2 className="text-2xl">Fran Hero</h2>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex gap-2 flex-col">
          <h1 className="text-lg mt-5">21-15-9 For Time</h1>
          <ul>
            <li>Thruster (95/65 lb)</li>
            <li>Pull Ups</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
