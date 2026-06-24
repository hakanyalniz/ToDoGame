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

  const increaseProfiency = (skillName: string, skillLevel: number) => {
    const savedDataRaw = localStorage.getItem(storageKey);
    const currentStatus = savedDataRaw ? JSON.parse(savedDataRaw) : {};

    const updatedProfile: UserStatus = {
      ...currentStatus,
      skills: { ...currentStatus.skills, [skillName]: skillLevel + 1 },
    };
    setUserState(updatedProfile);
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
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
              <button onClick={() => increaseProfiency(skillName, skillLevel)}>
                Increase
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
