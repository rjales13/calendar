import "./app.scss";
import React from "react";

import Routes from "./routes";

const Main = (props) => {
  return (
    <main>
      <div className="titleCalendar">
        <h1>Calendar</h1>
      </div>
      <div className="menuCalendar">
        <a href="/">
          <i className="fas fa-home"></i> Home
        </a>
        <a href="/notes">
          <i className="fas fa-sticky-note"></i> Notes
        </a>
      </div>
      <Routes />
    </main>
  );
};
export default Main;
