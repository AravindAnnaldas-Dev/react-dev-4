import { useState } from 'react';
import TimerComponent from '../components/TimerComponent';

const timerData = [
  { id: 1, hours: 0, minutes: 1, seconds: 43 },
  { id: 2, hours: 0, minutes: 2, seconds: 54 },
];

const Timer = () => {
  const [timers, setTimers] = useState(timerData);
  const updatingTime = (
    id: number,
    currentHour: number,
    currentMinute: number,
    currentSecond: number
  ) => {
    setTimers((prevTimer) =>
      prevTimer.map((timer) => {
        if (timer.id === id) {
          let seconds = currentSecond - 1;
          let minutes = currentMinute;
          let hours = currentHour;

          if (seconds < 0) {
            seconds = 59;
            minutes = minutes - 1;
          }
          if (minutes < 0) {
            minutes = 59;
            hours = hours - 1;
          }
          if (hours < 0) {
            clearInterval(id);
            return timer;
          }
          return { ...timer, hours, minutes, seconds };
        }
        return timer;
      })
    );
  };

  return (
    <>
      <div className="time_section">
        <div className="time_container">
          <div className="time_wrapper">
            {timers.map((timer) => {
              return (
                <TimerComponent
                  id={timer.id}
                  hours={timer.hours}
                  minutes={timer.minutes}
                  seconds={timer.seconds}
                  update={updatingTime}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
