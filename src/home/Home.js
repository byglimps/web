import React, { Component, Fragment } from "react";
import axios from "axios";
import { parse, addDays, compareAsc } from "date-fns";

import logo from "../assets/logo.svg";
import "./Home.css";

import EventCard from "../shared/EventCard";
import ContactButton from "../shared/ContactButton";

const { RAZZLE_GLIMPS_API_HOST } = process.env;

const HomeOverlay = () => <div className="Home-overlay" />;

const isBefore = (event, future) =>
  compareAsc(parse(event.date), future) === -1;

const splitEventsByOccurrence = events => {
  let tmm = addDays(new Date(), 1);
  const pastEvents = events.filter(e => isBefore(e, tmm));
  const currentEvents = events.filter(e => !isBefore(e, tmm));
  return {
    pastEvents: pastEvents.length > 0 ? pastEvents : null,
    currentEvents: currentEvents.length > 0 ? currentEvents : null
  };
};

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    try {
      let {
        data: { data: events }
      } = await axios.get(`${RAZZLE_GLIMPS_API_HOST}/api/events?limit=20`);

      const eventsByOccurrence = splitEventsByOccurrence(events);
      return eventsByOccurrence;
    } catch (e) {
      console.log("Error: ", e);
      return { pastEvents: [], currentEvents: [] };
    }
  }

  render() {
    let { pastEvents, currentEvents } = this.props;
    return (
      <Fragment>
        <HomeOverlay />
        <div className="Home">
          <div className="container">
            <div className="Home-header">
              <div className="logo">
                <img src={logo} className="Home-logo" alt="logo" />
              </div>
              <div>
                <ContactButton to={"glimpsco@gmail.com"} className="button">
                  Get glimps at your event
                </ContactButton>
              </div>
            </div>
            <div className="divider" />
            {currentEvents && (
              <div className="events current-events">
                <h2 className="title">Events happening now</h2>
                <div className="event-cards">
                  {currentEvents.map(event => (
                    <div key={event.id} className="grid-cell">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {pastEvents && (
              <div className="events past-events">
                <h2 className="title">Recent Events</h2>
                <div className="event-cards">
                  {pastEvents.map(event => (
                    <div key={event.id} className="grid-cell">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
