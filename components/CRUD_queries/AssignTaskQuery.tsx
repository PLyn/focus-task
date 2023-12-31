import supabaseClient from "@/lib/supabaseClient";

const AssignTaskQuery = async (taskId: string, userId: string) => {
  const { error } = await supabaseClient.from("user_current_task").insert({
    user_id: userId,
    task_id: taskId,
    is_assigned: true,
    is_current: true,
    action_at: new Date(),
  });

  if (error) throw new Error(error.message);
};

export default AssignTaskQuery;
