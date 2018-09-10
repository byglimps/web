import React from "react";
import axios from "axios";
import { parse, format } from "date-fns";
import Lightbox from "react-images";

import "./Event.css";

const { RAZZLE_GLIMPS_API_HOST } = process.env;

const HeaderOverlay = props => (
  <React.Fragment>
    <div className="header-image">
      <div style={{ background: props.mainColor }} className="header-overlay" />
    </div>
  </React.Fragment>
);

const Sheet = props => (
  <div {...props} className="sheet">
    {props.children}
  </div>
);

const getDateParts = dateString => {
  const date = parse(dateString);
  return {
    month: format(date, "MMM"),
    day: format(date, "D"),
    year: format(date, "YYYY")
  };
};

class Event extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
  }

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    const { params } = match;
    const { slug } = params;
    let url = `${RAZZLE_GLIMPS_API_HOST}/api/event-glimpses?slug=${slug}`;
    try {
      const {
        data: { data: eventData }
      } = await axios.get(url);

      return { event: eventData.event, glimpses: eventData.glimpses };
    } catch (error) {
      console.log("Error: ", error);
      return { event: null, glimpses: [] };
    }
  }

  openLightbox = index => {
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  render() {
    let { event, glimpses } = this.props;

    if (!event) {
      return (
        <div className="Event">
          <div className="event-header">
            <h1>Event Not Fount</h1>
          </div>
        </div>
      );
    }

    const { date, logoUrl, mainColor, name: eventName } = event;
    const { month, day, year } = getDateParts(date);
    const numPics = glimpses.length;
    const lightBoxImages = glimpses.map(tile => {
      return {
        src: tile.imageUrl
      };
    });

    return (
      <div className="Event">
        <div className="event-header">
          <HeaderOverlay mainColor={mainColor} />
          <div className="container">
            <div className="event-date">
              <span className="event-date__month">{month}</span>
              <span className="event-date__day">{day}</span>
              <span className="event-date__year">{year}</span>
            </div>
            <div className="event-logo">
              <img alt={eventName} src={logoUrl} />
            </div>
            <div className="event-stats">
              <span className="event-stats__count">{numPics}</span>
              <span className="event-stats__label">pics</span>
            </div>
          </div>
        </div>
        <div className="container main-container">
          <Sheet>
            <div className="event-grid">
              {glimpses &&
                glimpses.map((tile, idx) => (
                  <div key={tile.id} className="item">
                    <button
                      onClick={() => this.openLightbox(idx)}
                      className="glimps-thumb"
                    >
                      <img alt={`${idx}`} src={tile.imageUrl} />
                    </button>
                  </div>
                ))}
              <Lightbox
                images={lightBoxImages}
                backdropClosesModal={true}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />
            </div>
          </Sheet>
        </div>
      </div>
    );
  }
}

export default Event;
