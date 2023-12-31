import { UserRegister } from "@/components/UserActions";
import { AddDefaultUserSettings } from "@/components/user_queries/AddDefaultUserSettings";
import { Task } from "@/types/Task";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const defaultTask = {
  id: "",
  name: "",
  description: "",
  is_recurring: "",
  recurring_type: "",
  priority: "",
  due_date: new Date(Date.now()).toLocaleDateString(),
  created_at: new Date(Date.now()).toLocaleDateString(),
  created_by: "",
  updated_at: new Date(Date.now()).toLocaleDateString(),
  user_id: "",
} as Task;

const Register = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FormData>();
  const [showMessage, setShowMessage] = useState(false);

  const HandleRegister: SubmitHandler<FormData> = async (data) => {
    const res = await UserRegister(data.email, data.password);

    if (res.user) {
      await AddDefaultUserSettings(defaultTask, res.user?.id);
    }

    setShowMessage(true);
    router.refresh();
  };

  return (
    <div className="bg-mainBg text-onMainBg md:w-2/5 w-3/5 mx-auto mt-8 px-8 py-8">
      {showMessage ? (
        <div>
          Please check your email for a confirmation mail to complete
          registration.
        </div>
      ) : (
        <div></div>
      )}
      <div className="font-semibold">Sign up for a new account</div>
      <form onSubmit={handleSubmit(HandleRegister)}>
        <div className="">
          <div className="flex flex-col pt-4">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id={"email"}
              className="drop-shadow-md border-2 border-main"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            ></input>
          </div>

          <div className="flex flex-col pt-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id={"password"}
              className="drop-shadow-md border-2 border-main"
              {...register("password", { required: true, minLength: 2 })}
              type={"password"}
            ></input>
          </div>

          <div className="text-center">
            <button
              id={"Register"}
              aria-label="Register Form Button"
              type="submit"
              className="w-1/2"
            >
              <div
                className="              
                hover:bg-inverted
                hover:text-onInvertedBg 
                bg-main
                text-onMainBg  
                rounded-lg
                mt-8
                py-2
                drop-shadow-lg"
              >
                Register
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
