import "./Home.css";
import { type UserStatus } from "./types";
import { useState } from "react";

const defaultStatus: UserStatus = {
  name: "Test",
  level: 0,
  skills: {},
};

function Home() {
  const storageKey = "test_status";

  // State for the user profile, we pull it from local storage, otherwise assign a default one
  const [userState, setUserState] = useState<UserStatus>(() => {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : defaultStatus;
  });

  // State for the input field for skill
  const [inputText, setInputText] = useState("");

  /** Clicking increase button next to the skill increases the local state and the local storage data.
   * It also updates the total user level, which is a sum of all skill experience.*/
  const increaseProficiency = (skillName: string, skillExperience: number) => {
    // Update the total skill experience of the specific skill
    const newSkillExperience = skillExperience + 10;

    // Update the specific skill experience
    const updatedSkills = {
      ...userState.skills,
      [skillName]: newSkillExperience,
    };

    // Get the sum of all skill experience, turn it into level, which is the general user level
    const totalUserLevel = Math.round(
      Object.values(updatedSkills).reduce((sum, value) => {
        const modifiedValue = Math.round(handleExperienceImplementation(value));
        return sum + modifiedValue;
      }, 0),
    );

    // Get it all together
    const updatedProfile = {
      ...userState,
      level: totalUserLevel,
      skills: updatedSkills,
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

  /** Uses a math formula to determine skill levels given skill experience. Every 10 experience, increased by 10 percent each level, is 1 level.
   * Numbers are logged as experience in skill proficiency, it is while rendering that they are converted to levels.*/
  const handleExperienceImplementation = (skillExperience: number) => {
    const argument = (0.1 * skillExperience) / 10 + 1;
    const skillLevel = Math.log(argument) / Math.log(1.1);

    return skillLevel;
  };

  return (
    <>
      <div className="game-screen-overlay">
        <div className="game-status-container vt323-regular">
          <p>Status</p>
          <p>{userState.name}</p>
          <p>{userState.level}</p>
          <p>
            Skills:{" "}
            <input
              className="jrpg-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type skill..."
            />
            <button className="jrpg-button" onClick={addProficiency}>
              Add
            </button>
          </p>
          <ul>
            {Object.entries(userState.skills).map(
              ([skillName, skillExperience]) => (
                <li key={skillName}>
                  <strong>{skillName}:</strong> <span>level</span>{" "}
                  {Math.round(handleExperienceImplementation(skillExperience))}
                  <button
                    className="jrpg-button"
                    onClick={() =>
                      increaseProficiency(skillName, skillExperience)
                    }
                  >
                    Increase
                  </button>
                  <button
                    className="jrpg-button"
                    onClick={() => deleteProficiency(skillName)}
                  >
                    Delete
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
