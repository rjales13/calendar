import React, { useState, useEffect } from "react";
import padTo2Digits from "../common/padTo2Digits";

import If from "../operator/if";

/**
 * Func brings all the hours of a day
 */
const funcHours = () => {
  let i = -1;
  let arr = [];
  while (i <= 22) {
    arr.push(
      `${padTo2Digits(i + 1)}:00 - ${
        padTo2Digits(i + 2) === "24" ? "00" : padTo2Digits(i + 2)
      }:00`
    );
    i++;
  }
  return arr;
};

const StartReminder = (props) => {
  const [hours, setHours] = useState(null);
  const [newValues, setNewValues] = useState([]);
  const [oldValues, setOldValues] = useState([]);
  const [list, setList] = useState([]);
  const [showEditButtons, setShowEditButtons] = useState(null);
  const [showNewButton, setShowNewButton] = useState(null);

  const handleChange = (i, e) => {
    let newFormValues =
      showNewButton === true ? [...newValues] : [...oldValues];
    newFormValues[i][e.target.name] = e.target.value;
    showNewButton === true
      ? setNewValues(newFormValues)
      : setOldValues(newFormValues);
  };

  const addNewReminder = () => {
    setShowEditButtons(false);
    setShowNewButton(true);
    setList(newValues);
  };

  useEffect(() => {
    setHours(funcHours());
    setNewValues([
      {
        hour: `${props.currentDate.split(", ")[1]} -`,
        description: "",
        color: "#000000",
      },
    ]);
    setOldValues(
      props.remindersValues.filter(
        (element) =>
          element.hour.split(" -")[0] === props.currentDate.split(", ")[1]
      )
    );
    setShowEditButtons(true);
    setShowNewButton(false);
    setList(props.remindersValues);
  }, [props.currentDate, props.remindersValues, props.month]);

  return (
    <div className="reminderList">
      <div className="reminderTitle">
        <If show={props.currentDate !== ""}>
          <span>Reminder(s) from: {props.currentDate.split(", ")[1]}/2022</span>
          <small>
            edit your list bellow or click on the button beside to create a new
            one
          </small>
          <i
            className="fas fa-plus-square"
            title="Add"
            onClick={() => addNewReminder("new")}
          ></i>
        </If>
        <If show={props.currentDate === ""}>
          <span>Click in some date above to start!!!</span>
        </If>
      </div>
      <div>
        {/**
         * Brings all the the fields when the user storaged or brings a new one when he wants to add
         */}
        {list &&
          list
            .filter(
              (element) =>
                element.hour.split(" -")[0] === props.currentDate.split(", ")[1]
            )
            .map((element, index) => (
              <ul key={index}>
                <li>
                  <label htmlFor="hour">Hour</label>
                  <select
                    name="hour"
                    id="hour"
                    title="Choose an hour"
                    value={element.hour}
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option value="" defaultValue>
                      Choose an Hour
                    </option>
                    {/**
                     * Brings the ours and compares if some record has already. If does, the option is not showed
                     * PS: tried the disabled property, but for some reason I could change the value for false when apropriated. Always come just 'disabled'
                     */}
                    {hours &&
                      hours.map((data, i) => {
                        return (
                          <option
                            key={i}
                            className={`                            
                            ${
                              oldValues &&
                              oldValues.filter(
                                (el) =>
                                  el.hour.split(" -")[0] ===
                                    props.currentDate.split(", ")[1] &&
                                  el.hour.split(" -")[1].replace(/\s/g, "") ===
                                    data.replace(/\s/g, "") &&
                                  el.hour.split(" -")[1].replace(/\s/g, "") !==
                                    element.hour
                                      .split(" -")[1]
                                      .replace(/\s/g, "")
                              ).length
                                ? "hideOption"
                                : ""
                            }                            
                            `}
                            value={`${
                              props.currentDate.split(", ")[1]
                            } - ${data.replace(/\s/g, "")}`}
                          >
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </li>
                <li>
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    title="Text a description"
                    maxLength={30}
                    placeholder="Text a description"
                    value={element.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                </li>
                <li>
                  <label htmlFor="color">Color</label>
                  <input
                    type="color"
                    name="color"
                    id="color"
                    title="Choose a color"
                    value={element.color}
                    onChange={(e) => handleChange(index, e)}
                  />
                </li>
                <If show={showEditButtons}>
                  <li onClick={() => props.editReminder(oldValues)}>
                    <div>
                      <i className="far fa-edit" title="Edit"></i>
                    </div>
                  </li>
                  <li
                    className="liDelete"
                    onClick={() => props.deleteReminder(element.hour)}
                  >
                    <div>
                      <i className="far fa-trash-alt" title="Delete"></i>
                    </div>
                  </li>
                </If>
                <If show={showNewButton}>
                  <li onClick={() => props.addReminder(newValues)}>
                    <div>
                      <i
                        className={`far fa-plus-square ${
                          element.hour.split("-")[1] === "" ? "disabled" : ""
                        }`}
                        title="Add"
                      ></i>
                    </div>
                  </li>
                </If>
              </ul>
            ))}
      </div>
    </div>
  );
};

export default StartReminder;
