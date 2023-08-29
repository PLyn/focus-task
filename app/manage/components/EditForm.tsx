"use client";
import FormSubmitButtons from "@/components/FormSubmitButtons";
import TaskItemDetailsLayout from "@/components/TaskItemDetailsLayout";
import { Task } from "@/types/Task";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "react-query";
import { FormSubmit } from "./HandleSubmitCRUD";
import { useUserInfo } from "@/hooks/useUserInfo";
import toast from "react-hot-toast";

interface EditFormProps {
  task: Task;
  onBack: Dispatch<SetStateAction<boolean>>;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const EditForm: React.FC<EditFormProps> = ({ task, onBack, onClose }) => {
  const router = useRouter();
  const { user } = useUserInfo();
  const queryClient = useQueryClient();

  const HandleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    await toast.promise(FormSubmit(e, "edit", user?.id), {
      loading: "Updating Task...",
      success: "Task Updated!",
      error: "Unable to Update Task. Please try again.",
    });

    await queryClient.resetQueries("ManageTasks");
    await queryClient.resetQueries("ActiveTask");
    await queryClient.resetQueries("TaskCount");

    onBack(false);
    onClose(false);
    router.refresh();
  };

  return (
    <div>
      <form method="post" onSubmit={HandleSubmit}>
        <TaskItemDetailsLayout task={task} isEdit />
        <FormSubmitButtons
          submitText="Edit Task"
          onBack={onBack}
          onClose={onClose}
        />
      </form>
    </div>
  );
};

export default EditForm;
