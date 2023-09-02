"use client";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import FormSubmitButtons from "./FormSubmitButtons";
import { SubmitHandler, useForm } from "react-hook-form";
import AddTaskQuery from "@/components/CRUD_queries/AddTaskQuery";

export type AddTaskFormData = {
  name: string;
  description: string;
  is_recurring: string;
  recurring_type: string;
  priority: string;
  due_date: string;
};

interface AddFormProps {
  onBack: Dispatch<SetStateAction<boolean>>;
}

const AddForm: React.FC<AddFormProps> = ({ onBack }) => {
  const router = useRouter();
  const { user } = useUserInfo();
  const queryClient = useQueryClient();
  const { handleSubmit, register, watch } = useForm<AddTaskFormData>();
  const [recurringType, setRecurringType] = useState<string>("");
  const [recurring, setRecurring] = useState<boolean>(false);

  const HandleAdd: SubmitHandler<AddTaskFormData> = async (data) => {
    if (user) {
      await toast.promise(AddTaskQuery(data, user?.id), {
        loading: "Creating Task...",
        success: "Task Created!",
        error: "Unable to create Task. Please try again.",
      });
    } else toast("No user data found. Please try again.");

    await queryClient.resetQueries("ManageTasks");
    await queryClient.resetQueries("ActiveTask");
    await queryClient.resetQueries("TaskCount");

    onBack(false);
    router.refresh();
  };

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(HandleAdd)}>
        <div className="flex flex-col text-left text-sm">
          <input
            className="mb-4 w-full lg:w-[30em]"
            placeholder={"Task Name..."}
            {...register("name", { required: true, minLength: 2 })}
            autoFocus
          ></input>

          <textarea
            className="border-2 mb-4 h-[10em] w-full lg:w-[30em] resize-none"
            placeholder={"Description..."}
            {...register("description")}
          ></textarea>

          <div className="mb-4 flex flex-row">
            <div className="w-1/4">Recurring?</div>
            <input
              type="checkbox"
              className="scale-150"
              onChangeCapture={(e) => {
                if (!e.currentTarget.checked) setRecurringType("");
                setRecurring(!recurring);
              }}
              checked={recurring}
              {...register("is_recurring")}
            ></input>
          </div>

          <div>Frequency</div>
          <select
            {...register("recurring_type")}
            className="border-2 mb-4 w-full lg:w-[30em]"
            disabled={!watch("is_recurring")}
            onChange={(e) => {
              setRecurringType(e.target.value);
            }}
            value={recurringType}
            required={recurring}
          >
            <option value=""></option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-Weekly">Bi-Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>

          <div className="w-1/4">Priority</div>
          <select
            {...register("priority")}
            className="border-2 mb-4 w-full lg:w-[30em]"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div>
            <div>Due Date</div>
            <input
              {...register("due_date")}
              type="date"
              className="border-2 mb-4 w-full lg:w-[30em]"
              required
              defaultValue={new Date().toISOString().substring(0, 10)}
            ></input>
          </div>
        </div>
        <FormSubmitButtons
          cancelText="Cancel"
          submitText="Add Task"
          onBack={onBack}
        />
      </form>
    </div>
  );
};

export default AddForm;
