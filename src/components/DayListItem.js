import React from 'react';
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  //give the listItem the "day-list__item--selected" className if selected
  let dayClass = classNames("day-list__item", { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0});

  //adjust the text to use proper grammer for number of spots remaining
  const formatSpots = function (spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return spots + " spots remaining";
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}