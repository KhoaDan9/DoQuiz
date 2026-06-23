import { useEffect, useState } from "react";

const CountDown = (props) => {
  const { onTimeUp } = props;
  const [count, setCount] = useState(1000);

  useEffect(() => {
    if (count === 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return (
    <div className="countdown-container">
      {new Date(count * 1000).toISOString().substring(14, 19)}
    </div>
  );
};

export default CountDown;
