import React, { useEffect } from 'react';

const TimerComponent = ({
  id,
  hours,
  minutes,
  seconds,
  update,
}: {
  id: number;
  hours: number;
  minutes: number;
  seconds: number;
  update: (id: any, hours: any, minutes: any, seconds: any) => void;
}) => {
  useEffect(() => {
    const timer = setInterval(() => {
      update(id, hours, minutes, seconds);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [id, hours, minutes, seconds, update]);

  return (
    <div className="time_ctn">
      <div className="time_hour">{String(hours).padStart(2, '0')}</div>:
      <div className="time_min">{String(minutes).padStart(2, '0')}</div>:
      <div className="time_sec">{String(seconds).padStart(2, '0')}</div>
    </div>
  );
};

export default TimerComponent;
