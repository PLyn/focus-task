import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NoTaskDisplay = () => {
  //TODO: grab whether task was completed today and detemine what to show
  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <div className="w-[30em]  bg-gray-200 rounded-lg my-4 mx-4">
          <div className="font-light py-4">
            <div className="px-8">Current Task</div>
            <Separator className="bg-green-300 pt-0.5 mt-4" />
          </div>

          <div className="flex flex-col items-center py-8">
            <div className="">You do not have an active task assigned!</div>
            <button
              className="
          hover:bg-green-400 
          my-4
          mt-12
          mr-8
          rounded-lg
          py-4
          px-4
        bg-green-500 
        font-semibold
        text-green-200
        self-end"
            >
              Assign New task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoTaskDisplay;
