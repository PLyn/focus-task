"use client";
import SearchForm from "@/app/manage/components/SearchForm";
import dynamic from "next/dynamic";
import { useState } from "react";
import SearchFilters from "./SearchFilters";
import AddTaskButton from "./AddTaskButton";
import { Calendar } from "@/components/ui/calendar";

const TaskList = ({ ShowTaskActions }: { ShowTaskActions: boolean }) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  const TaskItemDisplay = dynamic(() => import("./TaskItemDisplay"), {
    loading: () => <p>Loading..</p>,
  });

  return (
    <div>
      {!ShowTaskActions ? (
        <Calendar
          mode="single"
          className="rounded-md border w-fit mx-auto mt-4"
        />
      ) : (
        <></>
      )}
      <SearchForm setDebouncedValue={setDebouncedValue} />
      <div className="w-11/12 mx-auto pb-4 mt-2 bg-gray-100 lg:w-[1000px]">
        <TaskItemDisplay
          debouncedValue={debouncedValue}
          ShowTaskActions={ShowTaskActions}
        />
      </div>
    </div>
  );
};

export default TaskList;
