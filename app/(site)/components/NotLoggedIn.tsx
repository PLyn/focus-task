"use client";
import Login from "@/app/login/components/login";

const NotLoggedIn = () => {
  return (
    <div>
      <div className="bg-mainBg  lg:w-[50em] w-full lg:mx-auto rounded-lg text-md mt-8 drop-shadow-lg py-8">
        <div className="text-onMainBg text-md text-center">
          Sign in to get full access
        </div>
        <div className="lg:px-12">
          <Login />
        </div>
      </div>
      <div className="bg-mainBg  lg:w-[50em] w-full lg:mx-auto rounded-lg text-md mt-8 drop-shadow-lg py-8">
        <div className="text-onMainBg text-md text-center">
          Sign in to get full access
        </div>
        <div className="lg:px-12">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
