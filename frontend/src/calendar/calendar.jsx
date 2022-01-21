import "./style.scss";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";

import _ from "lodash";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as calendarActionCreators from "./calendarActions";

import Reminder from "./reminder";
import { arrWeeks, arrMonths } from "../common/dateStuff";

/**
 * This function get all the days from a Month
 * Fills with false the days there aren't of the current month
 */
const getAllDaysInMonth = (month, year) => {
  const arr = Array.from(
    { length: new Date(year, month, 0).getDate() - 1 },
    (_, i) => new Date(year, month, i + 1)
  ).map((x) =>
    x.toLocaleDateString("default", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    })
  );

  // Get the first day of the Month
  const firstWeekDay = arr[0].split(",")[0].toLowerCase();
  // Get the last day of the Month
  const lastWeekDay = arr[arr.length - 1].split(",")[0].toLowerCase();
  let i = 0;

  // Fill on the initial of the array with days aren't of the current month
  while (firstWeekDay !== arrWeeks[i]) {
    arr.unshift(false);
    i++;
  }

  // Fill on the end of the array with days aren't of the current month if the last day are not Saturday (Because 'Sat' is the las on the calendar)
  if (lastWeekDay !== "sat") {
    i = arrWeeks.indexOf(lastWeekDay);
    while (arrWeeks[i] !== "sat") {
      arr.push(false);
      i++;
    }
  }

  // Return the new Array
  return arr;
};

const StartCalendar = (props) => {
  const remindersValues = _.sortBy(useSelector((state) => state.calendar.reminders), 'hour')

  const [days, setDays] = useState(null);
  const [month, setMonth] = useState(0);
  const [monthStr, setMonthStr] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const dispatch = useDispatch();

  const { addReminder, editReminder, deleteReminder } = bindActionCreators(
    calendarActionCreators,
    dispatch
  );

  /**
   * This func switch the Current Month
   * When the first Month is defined you can't click back and the same for the opposite
   */
  const changeMonth = (strClass) => {
    if (strClass.indexOf("disabled") < 0) {
      strClass.indexOf("fa-angle-right") >= 0
        ? setMonth(month + 1)
        : setMonth(month - 1);

      setCurrentDate("");
    }
  };

  /**
   * Func to scroll to the footer when a data is clicked
   */
  const scroll = () => {
    setTimeout(() => {
      const section = document.querySelector(".cardCalendar__footer");
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };  

  useEffect(() => {
    //Set the number of the current month
    setDays(getAllDaysInMonth(month, 2022));
    //Set the name of the current month
    setMonthStr(arrMonths[month]);
  }, [month]);

  return (
    <main className="cardCalendar">
      <section className="cardCalendar__header">
        <i
          className={`fas fa-angle-left ${month === 0 ? "disabled" : ""}`}
          onClick={(e) => changeMonth(e.target.className)}
        ></i>
        <h3>{monthStr}</h3>
        <i
          className={`fas fa-angle-right ${month === 11 ? "disabled" : ""}`}
          onClick={(e) => changeMonth(e.target.className)}
        ></i>
      </section>
      <section className="cardCalendar__body">
        <ul className="cardCalendar__body--days">
          {arrWeeks &&
            arrWeeks.map((name, index) => <li key={index}>{name}</li>)}
        </ul>
        <ul className="cardCalendar__body--dates">
          {days &&
            days.map((data, index) => (
              <div key={index}>
                <li
                  className={`${
                    data === false ? "notCurrentMonth" : "currentMonth"
                  }`}
                  data-value={data}
                  onClick={(e) => {setCurrentDate(e.target.dataset.value);scroll()}}
                >
                  {data === false ? "" : <span>{data.split("/")[1]}</span>}
                  {/**
                   * Bring all the dates of the Current Month and filter and Map the remimders of each one
                   */}
                  {data === false
                    ? ""
                    : remindersValues &&
                      remindersValues
                        .filter(
                          (element) =>
                            element.hour.split(" -")[0] === data.split(", ")[1]
                        )
                        .slice(0, 3)
                        .map((el, index) => (
                          <span
                            key={index}
                            className="reminders"
                            style={{ backgroundColor: el.color }}
                          >
                            {el.hour.split("- ")[1]}
                          </span>
                        ))}
                </li>
              </div>
            ))}
        </ul>
      </section>
      <section className="cardCalendar__footer">
        <Reminder
          currentDate={currentDate}
          month={month}
          addReminder={addReminder}
          editReminder={editReminder}
          deleteReminder={deleteReminder}
          remindersValues={remindersValues}
        />
      </section>
    </main>
  );
};

export default StartCalendar;
