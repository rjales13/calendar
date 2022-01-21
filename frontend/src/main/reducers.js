import { combineReducers } from "redux";
import CalendaReducer from '../calendar/calendarReducer';

const rootReducer = combineReducers({
  calendar: CalendaReducer,
});

export default rootReducer;
