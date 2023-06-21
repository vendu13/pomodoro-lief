"use client";
import React, { createContext, useContext, useState } from "react";
import { Box, Button, Grommet, Notification } from "grommet";
import theme from "../../../styles/theme";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./Home.module.css";
import Context from "../../../context/Context.js";

const GrommetWrapper = ({ children }) => {
  return <Grommet theme={theme}>{children}</Grommet>;
};

const Home = () => {
  const { currentTask } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastStyle, setToastStyle] = useState("normal");
  const [keyClock, setKeyClock] = useState(2);
  const [time, setTime] = useState(25);
  const [startAnimate, setStartAnimate] = useState(false);
  const [currentButton, setCurrentButton] = useState("work");
  const [currentButtonState, setCurrentButtonState] = useState(0);
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const onRestartClock = () => {
    setStartAnimate(false);
    setCurrentButton("work");
    setCurrentButtonState(0);
    setTime(25);
    setKeyClock(Math.random());
  };

  const onCompleteClock = () => {
    if (currentButton === "work" && currentButtonState !== 4) {
      setCurrentButton("short");
      setCurrentButtonState(currentButtonState + 1);
      setTime(5);
      setKeyClock(Math.random());
      setStartAnimate(true);

      setVisible(true);
      setToastTitle("You can have a short break now");
      setToastStyle("normal");
    } else if (currentButton === "short" && currentButtonState !== 4) {
      setCurrentButton("work");
      setTime(25);
      setKeyClock(Math.random());
      setStartAnimate(true);

      setVisible(true);
      setToastTitle("You need to work now");
      setToastStyle("warning");
    } else if (currentButton === "short" && currentButtonState === 4) {
      setCurrentButton("long");
      setTime(15);
      setKeyClock(Math.random());
      setStartAnimate(true);

      setVisible(true);
      setToastTitle("You can have a long break now");
      setToastStyle("normal");
    } else if (currentButton === "long") {
      setCurrentButton("work");
      setCurrentButtonState(0);
      setTime(25);
      setStartAnimate(false);
      setKeyClock(Math.random());

      setVisible(true);
      setToastTitle("End of session");
      setToastStyle("normal");
    }
  };

  return (
    <GrommetWrapper>
      <div className={styles.pomodoroMain}>
        <h1>Pomodoro</h1>
        <p>Be productive the right way.</p>
        <div className={styles.modes}>
          <Button
            disabled={currentButton !== "work"}
            primary
            style={{ backgroundColor: "#FFCA58", borderColor: "#FFCA58" }}
            label="Work"
          />
          <Button
            disabled={currentButton !== "short"}
            primary
            style={{ backgroundColor: "#FFCA58", borderColor: "#FFCA58" }}
            label="Short break"
          />
          <Button
            disabled={currentButton !== "long"}
            primary
            style={{ backgroundColor: "#FFCA58", borderColor: "#FFCA58" }}
            label="Long break"
          />
        </div>
        <div className={styles.task}>Current task: {currentTask}</div>
        <div className={styles.timerContainer}>
          <div className={styles.timeWrapper}>
            <CountdownCircleTimer
              key={keyClock}
              isPlaying={startAnimate}
              duration={time * 60}
              size={210}
              colors={["#e4e8eb"]}
              trailColor="#FFCA58"
              initialRemainingTime={"20"}
              onComplete={onCompleteClock}
            >
              {children}
            </CountdownCircleTimer>
          </div>
        </div>
        <Box direction="row" gap="1rem">
          <Button
            size="medium"
            primary
            style={{ backgroundColor: "#FFCA58", borderColor: "#FFCA58" }}
            label="Start"
            onClick={() => {
              if (!currentTask) {
                setVisible(true);
                setToastTitle("Please choose a task");
                setToastStyle("warning");
                return;
              }
              setStartAnimate(true);
            }}
          />
          <Button
            primary
            style={{ backgroundColor: "#FFCA58", borderColor: "#FFCA58" }}
            label="Pause"
            onClick={() => setStartAnimate(false)}
          />
          <Button
            primary
            style={{ backgroundColor: "#FFCA58", borderColor: "#FFCA58" }}
            label="Restart"
            onClick={onRestartClock}
          />
        </Box>
      </div>
      {visible && (
        <Notification
          toast
          time={4000}
          title={toastTitle}
          status={toastStyle}
          onClose={() => setVisible(false)}
        />
      )}
    </GrommetWrapper>
  );
};
export default Home;
