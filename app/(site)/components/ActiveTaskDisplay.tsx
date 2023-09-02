import { useUserInfo } from "@/hooks/useUserInfo";
import { Task } from "@/types/Task";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient, UseQueryResult } from "react-query";
import ActiveTaskDetails from "./ActiveTaskDetails";
import useTaskContext from "@/hooks/useTaskContext";
import { CatPictureData } from "@/types/CatPictureData";
import { MouseEventHandler } from "react";
import UnassignTaskQuery from "@/components/CRUD_queries/UnassignTaskQuery";
import CompleteRecurringTaskQuery from "@/components/CRUD_queries/CompleteRecurringTaskQuery";
import CompleteTaskQuery from "@/components/CRUD_queries/CompleteTaskQuery";

interface ActiveTaskDisplayProps {
  task: Task;
  catQuery: UseQueryResult<CatPictureData[], Error>;
}

const ActiveTaskDisplay: React.FC<ActiveTaskDisplayProps> = ({
  task,
  catQuery,
}) => {
  const router = useRouter();
  const { user } = useUserInfo();
  const queryClient = useQueryClient();
  const { taskCompleted, setTaskCompleted } = useTaskContext();

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
        await toast.promise(CompleteRecurringTaskQuery(task, user?.id), {
          loading: "Completing Recurring Task...",
          success: "Task Completed!",
          error: "Unable to Complete Task. Please try again.",
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
        <ActiveTaskDetails task={task} />
        <div className="flex flex-row justify-center">
          <input name="task" type="hidden" value={JSON.stringify(task)}></input>
          <button
            onClick={HandleUnassign}
            className="          
              hover:bg-main
              hover:text-onMainBg 
              bg-neutralBg
              text-onNeutralBg
              border-2
              border-main
              rounded-lg
              my-4
              mr-8
              w-[7em]
              h-[3em]
              font-semibold"
          >
            Unassign
          </button>
          <input name="task" type="hidden" value={JSON.stringify(task)}></input>
          <button
            onClick={HandleComplete}
            className="          
              hover:bg-inverted
              hover:text-onInvertedBg 
              bg-main
              text-onMainBg 
              my-4
              mr-8
              rounded-lg
              w-[7em]
              h-[3em]
            font-semibold"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTaskDisplay;
