import * as React from "react";
import { Check, ChevronsUpDown, Undo2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { RootReducer } from "@/store/store";
import { Dispatch } from "react";

interface nameExerciseProps {
  nameExercise: string;
  setNameExercise: Dispatch<React.SetStateAction<string>>;
  setNoNewExercise: Dispatch<React.SetStateAction<boolean>>
  setNoSelectingExercise: Dispatch<React.SetStateAction<boolean>>
  noSelectingExercise: boolean
}

export default function SelectExCrossfit({
  nameExercise,
  setNameExercise,
  setNoNewExercise,
  setNoSelectingExercise,
  noSelectingExercise,
}: nameExerciseProps) {
  const [open, setOpen] = React.useState(false);

  const { crossfitList } = useSelector((store: RootReducer) => store.exercise);

  const handleFormText = () => {
    setNoNewExercise(true)
    setNoSelectingExercise(true)
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {nameExercise
              ? crossfitList.find(
                  (ex) =>
                    ex.exercise.toLowerCase() === nameExercise.toLowerCase()
                )?.exercise
              : "Select Exercise..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Exercise..." />
            <CommandEmpty>No exercise found.</CommandEmpty>
            <CommandGroup>
              {crossfitList.map((ex) => (
                <CommandItem
                  key={ex.id}
                  value={ex.exercise}
                  onSelect={(currentValue) => {
                    setNameExercise(
                      currentValue === nameExercise ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      nameExercise === ex.exercise ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ex.exercise}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
     {!noSelectingExercise && <Undo2 size={24} className="inline ml-1 cursor-pointer" color="blue" onClick={handleFormText} />}
    </div>
  );
}
