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
import { Dispatch, useEffect, useState } from "react";
import { getExerciseList } from "@/api/exerciseBB/types";
import axios from "axios"

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
  const [open, setOpen] = useState(false);

  const [crossfitList, setCrossfitList] = useState<getExerciseList[]>([])

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
        setCrossfitList(response.data);
      } else {
        throw new Error("Profile not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  },[])

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
                    ex.name.toLowerCase() === nameExercise.toLowerCase()
                )?.name
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
                  value={ex.name}
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
                      nameExercise === ex.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ex.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
     {!noSelectingExercise && <Undo2 size={24} className="inline ml-1 cursor-pointer" color="green" onClick={handleFormText} />}
    </div>
  );
}
