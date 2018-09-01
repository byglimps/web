import React from "react";

const toSearchString = (searchParams = {}) => {
  return Object.keys(searchParams)
    .map(key => `${key}=${encodeURIComponent(searchParams[key])}`)
    .join("&");
};

const createMailtoLink = (email, headers) => {
  let link = `mailto:${email}`;
  if (headers) {
    link += `?${toSearchString(headers)}`;
  }
  return link;
};

const ContactButton = ({ to, children, ...props }) => {
  let headers = {
    subject: "I'm interested in having Glimps at my event",
    body:
      "Hi there, \n I would love to have glimps at my event. Looking forward to hear back via email or phone."
  };
  return (
    <a {...props} href={`${createMailtoLink(to, headers)}`}>
      {children}
    </a>
  );
};

export default ContactButton;
