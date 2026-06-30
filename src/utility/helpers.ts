import { storageKey } from "./config";

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

export function importLocalStorage() {
  const hiddenSavePicker = document.getElementById("hiddenSavePicker");
  const reader = new FileReader();
  let importedLocalStorageFile;

  if (!hiddenSavePicker) {
    console.error("No local storage data found.");
    return;
  }

  hiddenSavePicker.click();

  hiddenSavePicker.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;

    importedLocalStorageFile = target.files?.[0];

    if (!importedLocalStorageFile) {
      console.error("No local storage data found.");
      return;
    }

    reader.onload = (event) => {
      const fileContent = event.target?.result;

      console.log("Here is your data:", fileContent);
      localStorage.setItem(storageKey, fileContent);
    };

    reader.readAsText(importedLocalStorageFile);
  });
}
