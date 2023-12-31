"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui_components/button";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui_components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui_components/popover";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import useThemeContext from "@/hooks/useThemeContext";

const GroupProperties = [
  {
    value: "group by",
    label: "Group By",
  },
  {
    value: "recurring",
    label: "Recurring",
  },
  {
    value: "recurring type",
    label: "Recurring Type",
  },
  {
    value: "priority",
    label: "Priority",
  },
  {
    value: "due date",
    label: "Due Date",
  },
];

const SearchFilterGrouping = ({
  setGroupBy,
  groupBy,
}: {
  setGroupBy: Dispatch<SetStateAction<string>>;
  groupBy: string;
}) => {
  const [open, setOpen] = useState(false);
  const { color } = useThemeContext();

  return (
    <div className={"md:px-4 bg-mainBg text-onMainBg " + `theme-${color}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={"GroupTaskButton"}
            aria-label={"Group by Task category Button"}
            variant="outline"
            role="combobox"
            aria-expanded={open}
          >
            {groupBy
              ? GroupProperties.find(
                  (GroupProperty) => GroupProperty.value === groupBy,
                )?.label
              : "Group By..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={
            "bg-mainBg w-[200px] p-0 text-onMainBg " + `theme-${color}`
          }
        >
          <Command>
            <CommandGroup>
              {GroupProperties.map((GroupProperty) => (
                <CommandItem
                  key={GroupProperty.value}
                  onSelect={(currentValue) => {
                    setGroupBy(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      groupBy === GroupProperty.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {GroupProperty.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchFilterGrouping;
