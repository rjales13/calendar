const INITIAL_STATE = {
  reminders: [],
};

const ReducerCalender = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_REMINDER":
      return {
        ...state,
        reminders: [...state.reminders, Object.assign({}, action.payload[0])],
      };
    case "ADD_REMINDERS":
      console.log(action.payload);
      return {
        ...state,
        reminders: [...state.reminders, ...action.payload.map((e) => Object.assign({}, e))],
      };
    case "EDIT_REMINDER":
      console.log(action.payload);
      return {
        ...state,
        reminders: state.reminders.filter(
          (item) =>
            item.hour.split(" -")[0] !== action.payload[0].hour.split(" -")[0]
        ),
      };
    case "DELETE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.filter(
          (item) =>
            item.hour !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ReducerCalender;
