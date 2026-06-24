import "./App.css";
import { useState } from "react";

// temporary types
type Skills = {
  [key: string]: number;
};

type UserStatus = {
  name: string;
  level: number;
  skills: Skills;
};

const defaultStatus: UserStatus = {
  name: "Test",
  level: 0,
  skills: {},
};

function App() {
  const storageKey = "test_status";

  const [userState, setUserState] = useState<UserStatus>(() => {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : defaultStatus;
  });

  const increaseProficiency = (skillName: string, skillLevel: number) => {
    const savedDataRaw = localStorage.getItem(storageKey);
    const currentStatus: UserStatus = savedDataRaw
      ? JSON.parse(savedDataRaw)
      : {};

    const updatedProfile: UserStatus = {
      ...currentStatus,
      skills: { ...currentStatus.skills, [skillName]: skillLevel + 1 },
    };
    setUserState(updatedProfile);
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
  };

  const deleteProficiency = (skillName: string) => {
    const savedDataRaw = localStorage.getItem(storageKey);
    const currentStatus: UserStatus = savedDataRaw
      ? JSON.parse(savedDataRaw)
      : {};

    const { [skillName]: _, ...updatedSkills } = currentStatus.skills;
    const updatedState = { ...currentStatus, skills: updatedSkills };

    setUserState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  return (
    <>
      <div>
        <p>Status</p>
        <p>{userState.name}</p>
        <p>{userState.level}</p>
        <p>Skills: </p>
        <ul>
          {/* Object.entries turns the skills object into an array of [key, value] pairs */}
          {Object.entries(userState.skills).map(([skillName, skillLevel]) => (
            <li key={skillName}>
              <strong>{skillName}:</strong> {skillLevel}
              <button
                onClick={() => increaseProficiency(skillName, skillLevel)}
              >
                Increase
              </button>
              <button onClick={() => deleteProficiency(skillName)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
