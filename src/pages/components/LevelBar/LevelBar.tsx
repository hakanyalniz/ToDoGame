import { type LevelBarTypes, type UserStatus } from "../../../utility/types";
import { storageKey } from "../../../utility/config";
import "./LevelBar.css";
import { useLocation } from "react-router";
import { useState, type ChangeEvent } from "react";

function LevelBar({
  skillName,
  skillExperience,
  userState,
  setUserState,
  className = "",
}: LevelBarTypes) {
  // Is editing for editing the skill name
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();

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
        const modifiedValue = Math.floor(handleExperienceImplementation(value));
        return sum + modifiedValue;
      }, 0),
    );

    const updatedProfile = {
      ...userState,
      level: totalUserLevel,
      skills: updatedSkills,
    };

    // handleExperienceBar();
    setUserState(updatedProfile);
    localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
  };

  /** Clicking the delete button next to the skill will delete the skill, update the local state and local storage */
  const deleteProficiency = (skillName: string) => {
    // The given skillName to be deleted is separated from updatedSkills by deconstruction
    const { [skillName]: _, ...updatedSkills } = userState.skills;
    const { [skillName]: __, ...updatedSchedule } = userState.schedule;

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
      schedule: updatedSchedule,
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

  /**
   * Gets the new skill experience, the current level, the next level.
   * Inverses the formula to calculate the current level and next level experience thresholds.
   * Then calculates the progress to the next level and shows it in percentage mode.
   */
  const handleExperienceBar = () => {
    // Get the current precise level and the next level
    const currentSkillLevel = Math.floor(
      handleExperienceImplementation(skillExperience),
    );
    const nextLevel = currentSkillLevel + 1;

    // Use the inverse formula to find the XP thresholds for both levels
    const xpForCurrentLevel = Math.round(
      100 * (Math.pow(1.1, currentSkillLevel) - 1),
    );
    const xpForNextLevel = Math.round(100 * (Math.pow(1.1, nextLevel) - 1));

    // Calculate progress percentage 770
    const xpEarnedInCurrentLevel = skillExperience - xpForCurrentLevel;
    const xpRequiredForNextLevel = xpForNextLevel - xpForCurrentLevel;

    // Get percentage on the level progress
    const progressFraction = xpEarnedInCurrentLevel / xpRequiredForNextLevel;
    const progressPercentage = Math.min(
      Math.max(progressFraction * 100, 0),
      100,
    );

    // Give this percentage value and use it to fill a bar
    return fillExperienceBar(progressPercentage);
  };

  const fillExperienceBar = (progressPercentage: number) => {
    // Get the first digit (e.g., 76 becomes 7. If 100, it becomes 10)
    const filledSegmentCount = Math.floor(progressPercentage / 10);
    const totalSegments = 10;

    return (
      <div className="green-experience-bar">
        {Array.from({ length: totalSegments }).map((_, index) => {
          // Since index goes from 0 to 9, if index is less than filledCount, it should be colored
          const isFilled = index < filledSegmentCount;

          return (
            <div
              className="single-experience-bar"
              key={index}
              style={{
                backgroundColor: isFilled ? "#4caf50" : "black", // Green for filled, grey for empty
              }}
            />
          );
        })}
      </div>
    );
  };

  // Flip the number on the skillname, either scheduling it on or off
  // The button for this is only visible in SkillPage
  const handleSkillSchedule = (skillName: string) => {
    const updatedState = {
      ...userState,
      schedule: {
        ...userState.schedule,
        [skillName]: userState.schedule[skillName] === 1 ? 0 : 1,
      },
    };

    setUserState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  // Change the skill edit state after clicking it, do nothing on pages other than SkillPage
  const handleEditChangeByClick = () => {
    if (location.pathname !== "/SkillPage") {
      return;
    }
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  // Saves the changes to skill name when enter is pressed in input field
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  // Change the userState state
  // While changing state, keep the previous userState and the previous userState of skills
  // Only change the name of the skill we want
  const handleSkillNameChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    // Destructure the old key out from the skills, and collect the rest of the properties
    // This leaves us with a skill object that is missing the skillName
    const { [skillName]: skillExperienceToMove, ...restOfSkills } =
      userState.skills;

    // Also update the schedule name to match the new skill name
    const { [skillName]: skillScheduleToMove, ...restOfSchedule } =
      userState.schedule;

    // Return a new object with the rest of the properties and the new key
    // When returning, we also do not forget to return the rest of the untouched userState object
    const updatedState = {
      ...userState,
      schedule: { ...restOfSchedule, [e.target.value]: skillScheduleToMove },
      skills: { ...restOfSkills, [e.target.value]: skillExperienceToMove },
    };

    setUserState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  return (
    <>
      <li className="small-skill-list" key={skillName}>
        {location.pathname === "/SkillPage" ? (
          <div
            className="skill-schedule-status"
            style={{
              backgroundColor:
                userState.schedule[skillName] === 1 ? "green" : "red",
            }}
          ></div>
        ) : (
          <div
            className="skill-schedule-status"
            style={{
              backgroundColor: "transparent",
            }}
          ></div>
        )}
        <strong className={className} onClick={() => handleEditChangeByClick()}>
          {isEditing ? (
            <input
              className="skill-name-change-input"
              type="text"
              value={skillName}
              onChange={(e) => handleSkillNameChange(e)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span>{skillName} </span>
          )}
        </strong>
        <span className="experience">
          <span id="experience-bar"> {handleExperienceBar()}</span>
          <span id="experience-level">
            level {Math.floor(handleExperienceImplementation(skillExperience))}
          </span>
        </span>

        <span>
          {location.pathname != "/SkillPage" && (
            <button
              className="jrpg-button left-small-margin"
              onClick={() => increaseProficiency(skillName, skillExperience)}
            >
              Done
            </button>
          )}

          {location.pathname === "/SkillPage" && (
            <button
              className="jrpg-button left-small-margin"
              onClick={() => handleSkillSchedule(skillName)}
            >
              Schedule
            </button>
          )}

          {location.pathname === "/SkillPage" && (
            <button
              className="jrpg-button left-small-margin"
              onClick={() => deleteProficiency(skillName)}
            >
              Delete
            </button>
          )}
        </span>
      </li>
    </>
  );
}
export default LevelBar;
