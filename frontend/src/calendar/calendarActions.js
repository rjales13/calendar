export function addReminder(arr, type = "ADD_REMINDER") {
  if (arr[0].hour.split("-")[1] === "") return { type: "" };
  return {
    type: type,
    payload: arr,
  };
}

export function applyEditReminder(arr) {
  return {
    type: "EDIT_REMINDER",
    payload: arr,
  };
}

export function deleteReminder(hour) {
  return {
    type: "DELETE_REMINDER",
    payload: hour,
  };
}
/**
 * this action call to reducers
 * 1 - delete all reminders
 * 2 - add again with the changes
 */
export function editReminder(arr) {
  return [
    applyEditReminder(arr),
    addReminder(arr, "ADD_REMINDERS")
  ];
}