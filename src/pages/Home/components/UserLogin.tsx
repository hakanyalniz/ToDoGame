import { type UserStatus } from "../types";
import { useState } from "react";
import { storageKey } from "../../../utility/config";

type UserLoginProps = {
  updateUser: React.Dispatch<React.SetStateAction<UserStatus>>;
};

function UserLogin({ updateUser }: UserLoginProps) {
  const [loginName, setLoginName] = useState("");

  const registerUser = () => {
    const newUser = {
      name: loginName,
      level: 0,
      skills: {},
    };
    localStorage.setItem(storageKey, JSON.stringify(newUser));
    updateUser(newUser);
  };

  return (
    <div className="game-screen-overlay">
      <div className="game-status-container vt323-regular">
        Please login{" "}
        <input
          className="jrpg-input"
          type="text"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          placeholder="Type name..."
        />
        <button className="jrpg-button" onClick={registerUser}>
          Register
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
