import { useUserInfo } from "@/hooks/useUserInfo";
import { Task } from "@/types/Task";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient, UseQueryResult } from "react-query";
import ActiveTaskDetailLayout from "./ActiveTaskDetailLayout";
import useTaskContext from "@/hooks/useTaskContext";
import { CatPictureData } from "@/types/CatPictureData";
import { MouseEventHandler } from "react";
import UnassignTaskQuery from "@/components/CRUD_queries/UnassignTaskQuery";
import CompleteTaskQuery from "@/components/CRUD_queries/CompleteTaskQuery";
import { CalculateNextDueDate } from "@/components/task_functions/CalculateNextDueDate";
import UpdateRecurringTaskDueDateQuery from "@/components/CRUD_queries/UpdateRecurringTaskDueDateQuery";
import InsertCompletedRecurringTaskQuery from "@/components/CRUD_queries/InsertCompletedRecurringTaskQuery";

interface ActiveTaskDisplayProps {
  task: Task;
  catQuery: UseQueryResult<CatPictureData[], Error>;
}

const ActiveTaskExists: React.FC<ActiveTaskDisplayProps> = ({
  task,
  catQuery,
}) => {
  const router = useRouter();
  const { user } = useUserInfo();
  const queryClient = useQueryClient();
  const { setTaskCompleted } = useTaskContext();

  const resetQueriesAndPage = async () => {
    await queryClient.resetQueries("ManageTasks");
    await queryClient.resetQueries("ActiveTask");
    await queryClient.resetQueries("TaskCount");

    router.refresh();
  };

  const HandleUnassign: MouseEventHandler<HTMLButtonElement> = async () => {
    if (user) {
      await toast.promise(UnassignTaskQuery(task.id, user?.id), {
        loading: "Unassigning Task...",
        success: "Task Unassigned!",
        error: "Unable to Unassign Task. Please try again.",
      });
      await resetQueriesAndPage();
    } else toast.error("User data not found. Please try again.");
  };

  const HandleComplete: MouseEventHandler<HTMLButtonElement> = async () => {
    if (user) {
      if (task.is_recurring) {
        /*await toast.promise(CompleteRecurringTaskQuery(task, user?.id), {
                                  loading: "Completing Recurring Task...",
                                  success: "Task Completed!",
                                  error: "Unable to Complete Task. Please try again.",
                                });*/
        const newDueDate = CalculateNextDueDate(
          task.recurring_type,
          task.due_date,
        );
        await toast.promise(
          UpdateRecurringTaskDueDateQuery(task, user.id, newDueDate),
          {
            loading: "Update Recurring Task",
            success: "Update Recurring!",
            error: "Unable to Update Recurring. Please try again.",
          },
        );

        await toast.promise(InsertCompletedRecurringTaskQuery(task, user.id), {
          loading: "Inserting Completed...",
          success: "Insert completed!",
          error: "Unable to insert completed. Please try again.",
        });

        await toast.promise(UnassignTaskQuery(task.id, user.id), {
          loading: "Unassign task...",
          success: "Task Unassigned!",
          error: "Unable to unassign task. Please try again.",
        });
      } else {
        await toast.promise(CompleteTaskQuery(task, user?.id), {
          loading: "Completing Task...",
          success: "Task Completed!",
          error: "Unable to Complete Task. Please try again.",
        });
      }
      if (setTaskCompleted !== undefined) {
        setTaskCompleted(true);
        await catQuery.refetch();
      }
      await resetQueriesAndPage();
    } else toast.error("User data not found. Please try again.");
  };

  return (
    <div key={task.id} className="w-full flex flex-col items-center">
      <div className="bg-mainBg text-onMainBg lg:w-[50em] w-full rounded-lg my-4 mx-4 drop-shadow-lg">
        <ActiveTaskDetailLayout name={task.name} desc={task.description} />
        <div className="flex flex-row justify-center">
          <button
            onClick={HandleUnassign}
            className="hover:bg-main hover:text-onMainBg  bg-neutralBg text-onNeutralBg border-2 border-main rounded-lg my-4 mr-8 w-[7em] h-[3em] font-semibold"
          >
            Unassign
          </button>
          <button
            onClick={HandleComplete}
            className="hover:bg-inverted hover:text-onInvertedBg bg-main text-onMainBg my-4 mr-8 rounded-lg w-[7em] h-[3em] font-semibold"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTaskExists;