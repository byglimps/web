import React from "react";
import { Link } from "react-router-dom";
import { format, parse } from "date-fns";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const date = format(parse(event.date), "MMMM Do, YYYY");
  return (
    <Link to={"/"} className="event-card">
      <div className="main-image">
        <img src={event.mainImageUrl} alt={event.name} />
      </div>
      <div className="details">
        <div className="name">{event.name}</div>
        <div className="date">{date}</div>
      </div>
    </Link>
  );
};

export default EventCard;
