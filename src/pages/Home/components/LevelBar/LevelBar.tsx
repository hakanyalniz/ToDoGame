import { type LevelBarTypes } from "../../types";
import { storageKey } from "../../../../utility/config";
import "./LevelBar.css";

function LevelBar({
  skillName,
  skillExperience,
  userState,
  setUserState,
}: LevelBarTypes) {
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

    handleExperienceBar(newSkillExperience);
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
  const handleExperienceBar = (newSkillExperience: number) => {
    const greenExperienceBar = document.getElementById("green-experience-bar");

    if (!greenExperienceBar) return;

    // Get the current precise level and the next level
    const currentSkillLevel = Math.floor(
      handleExperienceImplementation(newSkillExperience),
    );
    const nextLevel = currentSkillLevel + 1;

    // Use the inverse formula to find the XP thresholds for both levels
    const xpForCurrentLevel = Math.round(
      100 * (Math.pow(1.1, currentSkillLevel) - 1),
    );
    const xpForNextLevel = Math.round(100 * (Math.pow(1.1, nextLevel) - 1));

    // Calculate progress percentage 770
    const xpEarnedInCurrentLevel = newSkillExperience - xpForCurrentLevel;
    const xpRequiredForNextLevel = xpForNextLevel - xpForCurrentLevel;

    // Get percentage on the level progress
    const progressFraction = xpEarnedInCurrentLevel / xpRequiredForNextLevel;
    const progressPercentage = Math.min(
      Math.max(progressFraction * 100, 0),
      100,
    );

    greenExperienceBar.innerHTML = String(progressPercentage);
  };

  return (
    <>
      <li className="small-skill-list" key={skillName}>
        <strong>{skillName}: </strong> <div id="green-experience-bar"></div>
        <span>level </span>
        {Math.floor(handleExperienceImplementation(skillExperience))}
        <button
          className="jrpg-button left-small-margin"
          onClick={() => increaseProficiency(skillName, skillExperience)}
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
    </>
  );
}
export default LevelBar;
