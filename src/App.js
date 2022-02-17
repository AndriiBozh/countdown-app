import React, { useState, useEffect } from "react";
import TimeDisplay from "./components/TimeDisplay";
import ControlButton from "./components/ControlButton";
import Footer from "./components/Footer";
import Icons from "./components/Icons";

const App = () => {
  const defaultNumberOfSets = 5;
  const defaultBreakLength = 5;
  const defaultSessionLength = 25;
  const defaultSeconds = "0";

  const audioUrl = "https://www.soundjay.com/buttons/sounds/beep-07a.mp3";
  const [audio] = useState(new Audio(audioUrl));
  const [numberOfSets, setNumberOfSets] = useState(defaultNumberOfSets);
  const [breakDuration, setBreakDuration] = useState(defaultBreakLength);
  const [sessionDuration, setSessionDuration] = useState(defaultSessionLength);
  const [timerLabel, setTimerLabel] = useState(false);
  let timerName = false;
  const [timerOn, setTimerOn] = useState(false);
  const [playPause, setPlayPause] = useState(false);
  const [min, setMinsLeft] = useState(defaultSessionLength);
  const [sec, setSecLeft] = useState(defaultSeconds);
  const [timeAfterTimerWasPaused, setTimeAfterTimerWasPaused] =
    useState(defaultSessionLength);
  const [timerWasPaused, setTimerWasPaused] = useState(false);

  const { pauseIcon, playIcon, resetIcon, arrowDown, arrowUp } = Icons;

  function handleDecrement(
    time,
    isTimerRunning,
    isTimerPaused,
    timeCountingFunction
  ) {
    //   prevent incrementing and decrementing time/break/sets when countdown session has begun (whether countdown is in process, or paused)
    if (!isTimerRunning && !isTimerPaused) {
      time > 1
        ? timeCountingFunction((prevTime) => prevTime - 1)
        : timeCountingFunction(time);
    }
  }

  function handleIncrement(
    time,
    isTimerRunning,
    isTimerPaused,
    timeCountingFunction
  ) {
    if (!isTimerRunning && !isTimerPaused) {
      time < 60
        ? timeCountingFunction((prevTime) => prevTime + 1)
        : timeCountingFunction(time);
    }
  }

  function togglePlayPauseName() {
    setPlayPause((prevValue) => !prevValue);
  }

  function handleReset() {
    setTimerWasPaused(false);
    setTimerLabel(false);
    setPlayPause(false);
  }

  function handleResetTime(time) {
    setNumberOfSets(defaultNumberOfSets);
    setSessionDuration(time);
    setMinsLeft(time);
    setSecLeft(defaultSeconds);
  }

  //   when [sessionLength] changes, 'timer' component rerenders, 'timeLeft' variable changes and gets a current (updated) value of 'sessionLength' variable
  useEffect(() => {
    setMinsLeft(sessionDuration);
  }, [sessionDuration]);

  useEffect(() => {
    let timer = null;
    let start = Date.now();
    let difference = 0;
    let minutes;
    let seconds;
    let setsCounter = numberOfSets;
    let sessionDurationInSeconds = sessionDuration * 60;
    let breakDurationInSeconds = breakDuration * 60;

    if (timerOn) {
      timer = setInterval(() => {
        difference =
          (timerWasPaused
            ? timeAfterTimerWasPaused
            : !timerName
            ? sessionDurationInSeconds
            : breakDurationInSeconds) - Math.floor((Date.now() - start) / 1000);

        minutes = Math.floor(difference / 60);
        seconds = Math.floor(difference % 60);

        setMinsLeft(minutes);
        setSecLeft(seconds);
        setTimeAfterTimerWasPaused(difference);
        setTimerWasPaused(true);

        if (difference === 0) {
          start = Date.now(); // reset 'start' so that break-time or settings-time begin counting down from the current moment ----> this one was hard to guess!)

          audio.loop = true;
          audio.play();
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 2000);

          if (!timerName) {
            setMinsLeft(breakDuration);
            setSecLeft(defaultSeconds);
            setTimerLabel((prevValue) => !prevValue);
            timerName = !timerName;
            setsCounter -= 1;
            setNumberOfSets((prevValue) => prevValue - 1);
          } else {
            setMinsLeft(sessionDuration);
            setSecLeft(defaultSeconds);
            setTimerLabel((prevValue) => !prevValue);
            timerName = !timerName;
          }

          if (setsCounter === 0) {
            setNumberOfSets(defaultNumberOfSets);
            setBreakDuration(defaultBreakLength);
            setSessionDuration(defaultSessionLength);
            setMinsLeft(defaultSessionLength);
            setSecLeft(defaultSeconds);
            setTimerWasPaused(false);
            setTimerLabel(false);
            setPlayPause(false);
            clearInterval(timer);
          }
          // setTimerOn(!timerOn);  // add this line to stop timer after session-time, or break-time downcounts to 00:00. Then we'll need to click play button to launch countdown (break or session) again
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timerOn]);

  return (
    <div className="container">
      <div className="timer-group sets-timer-group">
        <TimeDisplay
          className="display control-display sets-display "
          displayId="sets"
          displayLabel="sets-label"
          displayName="Sets"
          length={numberOfSets}
          durationId="sets-number"
          displayClassName="value-display sets-value-display"
          labelClassName="sets-label label-display"
          wrapperDivClassName="timer-group sets-timer-group"
        />
        <ControlButton
          className="control-btn sets-decrement-btn"
          buttonId="sets-decrement"
          buttonName={arrowDown}
          handleTimeChange={() =>
            handleDecrement(
              numberOfSets,
              timerOn,
              timerWasPaused,
              setNumberOfSets
            )
          }
        />
        <ControlButton
          className="control-btn sets-increment-btn"
          buttonId="sets-increment"
          buttonName={arrowUp}
          handleTimeChange={() =>
            handleIncrement(
              numberOfSets,
              timerOn,
              timerWasPaused,
              setNumberOfSets
            )
          }
        />
      </div>

      <div className="timer-group break-timer-group">
        <TimeDisplay
          className="display control-display break-display"
          displayId="break"
          displayLabel="break-label"
          displayName="Break Length"
          length={breakDuration}
          durationId="break-duration"
          displayClassName="value-display break-value-display"
          labelClassName="break-label label-display"
        />
        <ControlButton
          className="control-btn break-decrement-btn"
          buttonId="break-decrement"
          buttonName={arrowDown}
          handleTimeChange={() =>
            handleDecrement(
              breakDuration,
              timerOn,
              timerWasPaused,
              setBreakDuration
            )
          }
        />
        <ControlButton
          className="control-btn break-increment-btn"
          buttonId="break-increment"
          buttonName={arrowUp}
          handleTimeChange={() =>
            handleIncrement(
              breakDuration,
              timerOn,
              timerWasPaused,
              setBreakDuration
            )
          }
        />
      </div>

      <div className="timer-group session-timer-group">
        <TimeDisplay
          className="display control-display session-display"
          displayId="session"
          displayLabel="session-label"
          displayName="Session Length"
          length={sessionDuration}
          durationId="session-duration"
          displayClassName="value-display session-value-display"
          labelClassName="session-label label-display"
        />
        <ControlButton
          className="control-btn session-decrement-btn"
          buttonId="session-decrement"
          buttonName={arrowDown}
          handleTimeChange={() =>
            handleDecrement(
              sessionDuration,
              timerOn,
              timerWasPaused,
              setSessionDuration
            )
          }
        />
        <ControlButton
          className="control-btn session-increment-btn"
          buttonId="session-increment"
          buttonName={arrowUp}
          handleTimeChange={() =>
            handleIncrement(
              sessionDuration,
              timerOn,
              timerWasPaused,
              setSessionDuration
            )
          }
        />
      </div>
      <div className="timer-group display-value-timer-group">
        <TimeDisplay
          className="display control-display timer-display"
          displayId="timer"
          displayLabel="timer-label"
          displayName={!timerLabel ? "Work" : "Rest"}
          durationId="timer-duration"
          minutes={min < 10 ? "0" + min : min}
          seconds={sec < 10 ? "0" + sec : sec}
          displayClassName="value-display timer-value-display"
          labelClassName="timer-label label-display"
        />
        <ControlButton
          className="control-btn start-stop-btn"
          buttonId="start-stop"
          buttonName={!playPause ? playIcon : pauseIcon}
          toggleBtnName={togglePlayPauseName}
          startTimer={() => setTimerOn(!timerOn)}
        />
        <ControlButton
          className="control-btn reset-btn"
          buttonId="reset"
          buttonName={resetIcon}
          resetTime={() => handleResetTime(defaultSessionLength)}
          resetBreakDuration={() => setBreakDuration(defaultBreakLength)}
          resetTimerOn={() => setTimerOn(false)}
          handleReset={handleReset}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
