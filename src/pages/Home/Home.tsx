import "./Home.css";
import { type UserStatus } from "./types";
import { useState } from "react";
import UserLogin from "./components/UserLogin/UserLogin";
import PopUp from "./components/PopUp/PopUp";
import LevelBar from "./components/LevelBar/LevelBar";
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

  /** Clicking the add button will update the local state and local storage. */
  const addProficiency = () => {
    const updatedState = {
      ...userState,
      skills: { ...userState.skills, [inputText]: 0 },
    };
    setUserState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  const deleteProfile = () => {
    const userConfirm = window.confirm(
      "Are you sure you want to log out (please save before doing this)?",
    );
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
          <ul className="skill-grid-container">
            {Object.entries(userState.skills).map(
              ([skillName, skillExperience], key) => (
                <LevelBar
                  skillName={skillName}
                  skillExperience={skillExperience}
                  userState={userState}
                  setUserState={setUserState}
                  key={key}
                />
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;

// Have a way to toggle the tasks in or out
// Have a way to do X times per week
// Make the minimize and maximize buttons which enlarge or make the status window smaller
// Have a way of having multiple accounts
// Maybe have a separate screen where the user can add or remove skills
// Add a way to edit the skill name
