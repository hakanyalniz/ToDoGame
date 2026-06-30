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

function importLocalStorage(jsonString: string) {
  console.log(jsonString);
}
