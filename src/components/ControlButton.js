import React from "react";

const ControlButton = (props) => {
  const {
    className,
    buttonId,
    handleTimeChange,
    resetBreakDuration,
    breakDuration,
    buttonName,
    startTimer,
    resetTime,
    resetTimerOn,
    resetSeconds,
    toggleBtnName,

    handleReset,
  } = props;

  return (
    <button
      id={buttonId}
      className={className}
      onClick={() => {
        //check if there's a 'handleTimeChange' prop and if it's there, run 'handleTimeChange()' function
        // if there's no such check, then if we press a button, which does not have this prop, an arror message will pop up, saying: 'Uncaught TypeError: props.handleTimeChange is not a function'
        handleTimeChange ? handleTimeChange() : false;
        resetTime ? resetTime() : false;
        resetBreakDuration ? resetBreakDuration(breakDuration) : false;
        startTimer ? startTimer() : false;
        toggleBtnName ? toggleBtnName() : false;
        resetTimerOn ? resetTimerOn() : false;
        resetSeconds ? resetSeconds() : false;
        handleReset ? handleReset() : false;
      }}
    >
      {buttonName}
    </button>
  );
};

export default ControlButton;
