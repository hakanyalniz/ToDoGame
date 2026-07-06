import "./Home.css";
import UserLogin from "./components/UserLogin/UserLogin";
import PopUp from "./components/PopUp/PopUp";
import LevelBar from "./components/LevelBar/LevelBar";
import { storageKey, defaultStatus } from "../../utility/config";
import { exportLocalStorage, importLocalStorage } from "../../utility/helpers";
import { type LayoutContextTypes } from "../../utility/types";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

function Home() {
  // State for the user profile, we pull it from local storage, otherwise assign a default one
  const { userState, setUserState } = useOutletContext<LayoutContextTypes>();
  const navigate = useNavigate();

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

  const handleSkillPageNavigation = () => {
    navigate("/SkillPage");
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
          <div>
            <button className="jrpg-button" onClick={handleSkillPageNavigation}>
              Show Skill Page
            </button>
          </div>
          <ul className="skill-grid-container">
            {/* Here we map through all of the skills inside user. But we only show the skills that are marked in the schedule */}
            {Object.entries(userState.skills).map(
              ([skillName, skillExperience], key) => {
                {
                  return (
                    userState.schedule?.[skillName] === 1 && (
                      <LevelBar
                        skillName={skillName}
                        skillExperience={skillExperience}
                        userState={userState}
                        setUserState={setUserState}
                        key={key}
                      />
                    )
                  );
                }
              },
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;

// Have a way to do X times per week
// Have a way of having multiple accounts
// Add a way to edit the skill name
// Work on the help tooltip and update it
// Have a way to know if something is scheduled or not, maybe by a green/red light
