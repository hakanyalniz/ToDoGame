import "./PopUp.css";
import { type PopUpTypes } from "../../types";
import { mainMenuHelp, loginMenuHelp, errorHelp } from "./PopUpText";

function PopUp({ title, helpTextOption }: PopUpTypes) {
  let helpText = "";
  switch (helpTextOption) {
    case 1:
      helpText = mainMenuHelp;
      break;
    case 2:
      helpText = loginMenuHelp;
      break;
    default:
      helpText = errorHelp;
  }
  return (
    <dialog id="help-dialog">
      <h3>{title}</h3>
      <div className="main-help-text">{helpText}</div>
      <button commandfor="help-dialog" command="close" className="jrpg-button">
        Close
      </button>
    </dialog>
  );
}

export default PopUp;
