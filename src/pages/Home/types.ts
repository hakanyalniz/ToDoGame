import { type Dispatch, type SetStateAction } from "react";

export type Skills = {
  [key: string]: number;
};

export type UserStatus = {
  name: string;
  level: number;
  skills: Skills;
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
};

export type SkillPageTypes = {
  userState: UserStatus;
  setUserState: Dispatch<SetStateAction<UserStatus>>;
};
