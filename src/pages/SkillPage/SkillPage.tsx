import { useState } from "react";
import { storageKey } from "../../utility/config";
import { useOutletContext } from "react-router";
import { type LayoutContextTypes } from "../../utility/types";
import "./SkillPage.css";
import { useNavigate } from "react-router";
import LevelBar from "../Home/components/LevelBar/LevelBar";

function SkillPage() {
  const { userState, setUserState } = useOutletContext<LayoutContextTypes>();
  const navigate = useNavigate();

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

  const handleHomeNavigation = () => {
    navigate("/");
  };
  return (
    <div className="game-screen-overlay">
      <div className="game-status-container vt323-regular">
        <div>
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
          <button
            className="jrpg-button left-small-margin"
            onClick={handleHomeNavigation}
          >
            Return
          </button>
        </div>

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
  );
}

export default SkillPage;
