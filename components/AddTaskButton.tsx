"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddForm from "./AddForm";

const AddTaskButton = () => {
  const [addOpen, setAddOpen] = useState<boolean>(false);

  return (
    <div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <button className="hover:bg-green-300 rounded-lg border-2 border-green-400">
            <div className="flex flex-row items-center text-green-500 font-semibold px-2 py-2 text-sm">
              <Plus color="green" size={16} /> New Task
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="h-full">
          <div className="mt-12">
            <AddForm onBack={setAddOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTaskButton;
