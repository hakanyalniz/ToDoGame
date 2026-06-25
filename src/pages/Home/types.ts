export type Skills = {
  [key: string]: number;
};

export type UserStatus = {
  name: string;
  level: number;
  skills: Skills;
};
