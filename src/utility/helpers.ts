import { storageKey } from "./config";
import { type UserStatus } from "./types";

/**
 * Gets the local storage and saves it as a JSON file.
 */
export function exportLocalStorage() {
  const savedJsonStringData = localStorage.getItem(storageKey);
  if (savedJsonStringData === null) {
    console.error("No local storage data found.");
    return;
  }

  // Create a download link and trigger it
  const blob = new Blob([savedJsonStringData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "user_save_file_backup.json";
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
}

// File reader that returns a promise so we can return read files
function readFileAsync(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result); // Resolves the promise with the file content
      } else {
        reject(new Error("File content is not a string."));
      }
    };

    reader.onerror = () => reject(reader.error);

    reader.readAsText(file);
  });
}

// File selector to select the JSON save data
// Clicks on the file reader, when change is detected (file is selected) return it
function selectFile(): Promise<File> {
  return new Promise((resolve, reject) => {
    const hiddenSavePicker = document.getElementById("hiddenSavePicker");
    let importedLocalStorageFile;

    if (hiddenSavePicker === null) {
      console.error("No local storage data found.");
      reject("No local storage data found.");
      return;
    }

    hiddenSavePicker.click();

    hiddenSavePicker.addEventListener("change", async (event) => {
      const target = event.target as HTMLInputElement;

      importedLocalStorageFile = target.files?.[0];

      if (!importedLocalStorageFile) {
        console.error("No local storage data found.");
        reject("No local storage data found.");
        return;
      }

      try {
        resolve(importedLocalStorageFile);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    });
  });
}

/**
 * Triggers the file picker to pick the exported JSON save file. Reads the selected file and saves it to local storage.
 */
export async function importLocalStorage(): Promise<void | UserStatus> {
  try {
    const selectedFile = await selectFile();
    const fileContent = await readFileAsync(selectedFile);
    localStorage.setItem(storageKey, fileContent);

    const fileContentObject: UserStatus = JSON.parse(fileContent);
    return fileContentObject;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}
