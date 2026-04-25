import { useEffect, useState } from "react";

export function useClock(timeZone = "Africa/Kigali") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      });
      setTime(formatter.format(now));
    };

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}
