import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home/Home";
import SkillPage from "./pages/SkillPage/SkillPage";
import { useState } from "react";
import { type UserStatus, type SkillScheduleTypes } from "./utility/types";
import { storageKey, defaultStatus } from "./utility/config";

function StateWrapper() {
  const [userState, setUserState] = useState<UserStatus>(() => {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : defaultStatus;
  });
  const [skillSchedule, setSkillSchedule] = useState<SkillScheduleTypes>({});

  return (
    <Outlet
      context={{ userState, setUserState, skillSchedule, setSkillSchedule }}
    />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StateWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/SkillPage", element: <SkillPage /> },
    ],
  },
]);
