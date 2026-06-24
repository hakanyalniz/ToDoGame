import "./App.css";

function App() {
  const storageKey = "test_status";

  const userStatus = {
    name: "Test",
    level: 0,
    skills: {
      meditating: 0,
    },
  };
  localStorage.setItem(storageKey, JSON.stringify(userStatus));

  const savedDataRaw = localStorage.getItem(storageKey);
  const currentStatus = savedDataRaw ? JSON.parse(savedDataRaw) : {};

  const updatedProfile = {
    ...currentStatus,
    skills: { ...currentStatus.skills, exercise: 0 },
  };
  localStorage.setItem(storageKey, JSON.stringify(updatedProfile));

  console.log(updatedProfile);

  return (
    <>
      <div>
        <p>Status</p>
        <p>{updatedProfile.name}</p>
        <p>{updatedProfile.level}</p>
        <p>Skills: </p>
        <ul>
          {/* Object.entries turns the skills object into an array of [key, value] pairs */}
          {Object.entries(updatedProfile.skills).map(
            ([skillName, skillLevel]) => (
              <li key={skillName}>
                <strong>{skillName}:</strong> {skillLevel}
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
