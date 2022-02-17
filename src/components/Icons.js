import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faRefresh,
  faCoffee,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
const pauseIcon = <FontAwesomeIcon icon={faPause} />;
const playIcon = <FontAwesomeIcon icon={faPlay} />;
const resetIcon = <FontAwesomeIcon icon={faRefresh} />;
const coffyCup = <FontAwesomeIcon icon={faCoffee} />;
const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;
const arrowUp = <FontAwesomeIcon icon={faArrowUp} />;

const Icons = { pauseIcon, playIcon, resetIcon, coffyCup, arrowDown, arrowUp };

export default Icons;
