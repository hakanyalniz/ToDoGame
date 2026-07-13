import { type Dispatch, type SetStateAction } from "react";

export type Skills = {
  [key: string]: number;
};

export type SkillSchedule = {
  [key: string]: number;
};

export type UserStatus = {
  name: string;
  level: number;
  skills: Skills;
  schedule: SkillSchedule;
};

export type PopUpTypes = {
  title: string;
  helpTextOption: number;
};

export type LevelBarTypes = {
  skillName: string;
  skillExperience: number;
  userState: UserStatus;
  setUserState: Dispatch<SetStateAction<UserStatus>>;
  className?: string;
};

export type SkillPageTypes = {
  userState: UserStatus;
  setUserState: Dispatch<SetStateAction<UserStatus>>;
};

export type LayoutContextTypes = {
  userState: UserStatus;
  setUserState: Dispatch<SetStateAction<UserStatus>>;
};

export const defaultStatus: UserStatus = {
  name: "DEFAULT_NAME",
  level: 0,
  skills: {},
  schedule: {},
};
