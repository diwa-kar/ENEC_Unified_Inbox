import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

function Counter({ targetNumber }) {
  const [count, setCount] = useState(0);

  const duration = 3000; // 3000ms or 3 seconds

  useEffect(() => {
    const step = (targetNumber - count) / (duration / 1000);
    const incrementInterval = setInterval(() => {
      if (count < targetNumber) {
        setCount((prevCount) => prevCount + step);
      } else {
        setCount(targetNumber);
        clearInterval(incrementInterval);
      }
    }, 100);

    return () => {
      clearInterval(incrementInterval);
    };
  }, [targetNumber, count]);

  return (
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: "1.3125rem",
        lineHeight: "1.5",
      }}
    >
      {Math.round(count)}
    </Typography>
  );
}

export default Counter;
