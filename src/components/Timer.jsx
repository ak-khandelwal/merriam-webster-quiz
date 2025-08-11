import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
// timer =  {
//   float: left;
//   font-size: calc(100vmin - 97vmin);
//   color: var(--color-medium);
//   border: 2px solid var(--color-dark);
//   padding: 1.35rem 2.8rem;
//   border-radius: 100px;
//   margin-left: -2rem;
// }

const timer = {
  float: "left",
  color: "var(--color-medium)",
  border: "2px solid var(--color-dark)",
  padding: "1.35rem 2.8rem",
  borderRadius: "100px",
  marginLeft: "-2rem",
};
  return (
    <div style={timer} className="text-2xl sm:text-3xl">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
