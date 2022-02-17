import React from "react";
import LinkToMyGithub from "./LinkToMyGithub";
import Icons from "./Icons";

const { coffyCup } = Icons;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span className="year">{year}</span> &copy; <LinkToMyGithub /> {coffyCup}
    </footer>
  );
};

export default Footer;
