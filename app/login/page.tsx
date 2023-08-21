"use client";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import Login from "./components/login";

export default function Home() {
  const { user } = useUserInfo();
  const router = useRouter();

  return (
    <div>
      <Login />
    </div>
  );
}
