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

  // State for the user profile, we pull it from local storage, otherwise assign a default one
  const [userState, setUserState] = useState<UserStatus>(() => {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : defaultStatus;
  });

  // State for the input field for skill
  const [inputText, setInputText] = useState("");

  /** Clicking increase button next to the skill increases the local state and the local storage data. */
  const increaseProficiency = (skillName: string, skillLevel: number) => {
    // const savedDataRaw = localStorage.getItem(storageKey);
    // const currentStatus: UserStatus = savedDataRaw
    //   ? JSON.parse(savedDataRaw)
    //   : {};

    const updatedProfile: UserStatus = {
      ...userState,
      skills: { ...userState.skills, [skillName]: skillLevel + 1 },
    };
    setUserState(updatedProfile);
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
  };

  /** Clicking the delete button next to the skill will delete the skill, update the local state and local storage */
  const deleteProficiency = (skillName: string) => {
    const { [skillName]: _, ...updatedSkills } = userState.skills;
    const updatedState = { ...userState, skills: updatedSkills };

    setUserState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  /** Clicking the add button will update the local state and local storage. */
  const addProficiency = () => {
    const updatedState = {
      ...userState,
      skills: { ...userState.skills, [inputText]: 0 },
    };
    setUserState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  return (
    <>
      <div>
        <p>Status</p>
        <p>{userState.name}</p>
        <p>{userState.level}</p>
        <p>
          Skills:{" "}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something here..."
          />
          <button onClick={addProficiency}>Add</button>
        </p>
        <ul>
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
