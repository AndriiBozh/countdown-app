import React, { useState, useEffect } from "react";

const TimeDisplay = (props) => {
  // since 'props' is an object, we need to use curly brackets to destructure it, not square brackets
  const {
    className,
    displayId,
    displayLabel,
    displayName,
    displayClassName,
    labelClassName,
    length,
    durationId,
    minutes,
    seconds,
  } = props;

  return (
    <div id={displayId} className={className}>
      <div id={displayLabel} className={labelClassName}>
        {displayName}
      </div>
      <div id={durationId} className={displayClassName}>
        {displayId === "timer" ? minutes + " : " + seconds : length}
      </div>
    </div>
  );
};

export default TimeDisplay;
