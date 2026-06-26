import { type UserStatus } from "../types";
import { useState } from "react";
import { storageKey } from "../../../utility/config";
import "./UserLogin.css";

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
        <form onSubmit={registerUser} className="register-form">
          <input
            className="jrpg-input"
            type="text"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            placeholder="Type name..."
          />
          <button type="submit" className="jrpg-button register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
