import { useState } from "react";
import { storageKey } from "../../../../utility/config";
import { type SkillPageTypes } from "../../types";
import "./SkillPage.css";

function SkillPage({ userState, setUserState }: SkillPageTypes) {
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
  return (
    <>
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
    </>
  );
}

export default SkillPage;
