"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface TaskListContextType {
  updateTaskList?: boolean;
  setUpdateTaskList?: Dispatch<SetStateAction<boolean | undefined>>;
}

export const TaskListContext = createContext<TaskListContextType>(
  {} as TaskListContextType
);

interface TaskListContextProviderProps {
  children: React.ReactNode;
}
const TaskListContextProvider: React.FC<TaskListContextProviderProps> = ({
  children,
}) => {
  const [updateTaskList, setUpdateTaskList] = useState<boolean>();

  return (
    <TaskListContext.Provider value={{ updateTaskList, setUpdateTaskList }}>
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;