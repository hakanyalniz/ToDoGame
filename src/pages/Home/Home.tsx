import "./Home.css";
import { type UserStatus } from "./types";
import { useState } from "react";
import UserLogin from "./components/UserLogin/UserLogin";
import PopUp from "./components/PopUp/PopUp";
import { storageKey } from "../../utility/config";
import { exportLocalStorage, importLocalStorage } from "../../utility/helpers";

const defaultStatus: UserStatus = {
  name: "DEFAULT_NAME",
  level: 0,
  skills: {},
};

function Home() {
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
    const newSkillExperience = skillExperience + 10;

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

    // Recalculate the user general level when a skill is deleted
    const totalUserLevel = Math.round(
      Object.values(updatedSkills).reduce((sum, value) => {
        const modifiedValue = Math.round(handleExperienceImplementation(value));
        return sum + modifiedValue;
      }, 0),
    );

    const updatedState = {
      ...userState,
      level: totalUserLevel,
      skills: updatedSkills,
    };

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

  const deleteProfile = () => {
    const userConfirm = window.confirm("Are you sure you want to delete this?");
    if (userConfirm) {
      localStorage.removeItem(storageKey);
      setUserState(defaultStatus);
    }
  };

  // Saves the local storage state
  const handleExportingLocalStorage = () => {
    const userConfirm = window.confirm("Do you want to save your profile?");

    if (userConfirm) {
      exportLocalStorage();
    }
  };

  // Loads the selected file into local storage and the current state
  const handleImportingLocalStorage = async () => {
    const exportedLocalStorage = await importLocalStorage();

    if (!exportedLocalStorage) return;

    setUserState(exportedLocalStorage);
  };

  // Conditional rendering of login page
  if (userState.name === "DEFAULT_NAME") {
    return <UserLogin updateUser={setUserState} />;
  }

  return (
    <>
      <div className="game-screen-overlay">
        <div className="game-status-container vt323-regular">
          <PopUp title={"Help Menu"} helpTextOption={1} />
          <input
            type="file"
            id="hiddenSavePicker"
            style={{ display: "none" }}
          ></input>

          <div className="game-top-bar">
            <div>
              <button
                className="jrpg-button"
                onClick={handleExportingLocalStorage}
              >
                Save
              </button>
              <button
                className="jrpg-button"
                onClick={handleImportingLocalStorage}
              >
                Load
              </button>
            </div>

            <div>
              <button
                className="button-style default"
                command="show-modal"
                commandfor="help-dialog"
              >
                ?
              </button>
              <button className="button-style exit" onClick={deleteProfile}>
                X
              </button>
            </div>
          </div>

          <p>Status</p>
          <p>{userState.name}</p>
          <p>Level {userState.level}</p>
          <p>
            Skills:{" "}
            <input
              className="jrpg-input skill"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type skill..."
            />
            <button
              className="jrpg-button left-small-margin"
              onClick={addProficiency}
            >
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
                    className="jrpg-button left-small-margin"
                    onClick={() =>
                      increaseProficiency(skillName, skillExperience)
                    }
                  >
                    Done
                  </button>
                  <button
                    className="jrpg-button left-small-margin"
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

// Have a way to export
// Make experience bar instead of number
// Have a way to toggle the tasks in or out
// Have a way to do X times per week
// Make the minimize and maximize buttons which enlarge or make the status window smaller
// Have a way of having multiple accounts
// Make the skills, add and so on prettier. Maybe have a separate screen where the user can add or remove skills
