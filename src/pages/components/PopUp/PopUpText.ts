export const mainMenuHelp = `
This is the main status page.

On the top is the game bar. On the right of it is the HELP(?) button, the EXIT(x) button.
Exit button will DELETE the user's registered account and all DATA. Please be careful when clicking this button.
The HELP button will open this page.

On the left of the game bar is the SAVE and LOAD buttons. Clicking Save will save your current profile, meanwhile clicking Load will load a selected profile by using a file picker.

Below it are the name of the user, their general total level, a button that takes you to the Skill Page and the list of skills belonging to the user.
The overall level of the user is calculated by adding all the total levels of their skills.
The Skill Page allows the user to ADD a skill, DELETE a skill or SCHEDULE it. Scheduled skills appear on the main user profile, which you can return by clicking the RETURN button.
You can also click on the skill name on Skill Page to change it.


When the user completes a task, they can click DONE, which will give the user Experience. Enough experience will allow the skill to level up.
It becomes harder for the skill to level up the higher it is.
`;

export const loginMenuHelp = `
This is the login page.

The user will be required to register when a registered user is not found in the browser's local storage.
The user can also click the "Load" button to load a save they had previously saved.
Pressing EXIT(x) in the main status screen will cause the registered user to be deleted.
`;

export const errorHelp = `
An error occurred and the help text could not be found!
`;
