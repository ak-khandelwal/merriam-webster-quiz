import { useState } from "react";

function StartScreen({ dispatch, allQuestions }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);

  const years = allQuestions ? Object.keys(allQuestions) : [];

  const months = selectedYear ? Object.keys(allQuestions[selectedYear]) : [];

  const handleMonthChange = (month) => {
    setSelectedMonths((prevMonths) =>
      prevMonths.includes(month)
        ? prevMonths.filter((m) => m !== month)
        : [...prevMonths, month]
    );
  };

  const handleStart = () => {
    dispatch({
      type: "startQuiz", // I'll need to add this reducer case in App.js
      payload: { year: selectedYear, months: selectedMonths },
    });
  };

  const numSelectedQuestions = selectedYear && selectedMonths.length > 0
    ? selectedMonths.reduce((acc, month) => acc + allQuestions[selectedYear][month].length, 0)
    : 0;

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      { allQuestions && Object.keys(allQuestions).length > 0 ? (
        <>
            <h3>Select questions to start</h3>
            <div>
              <label>Select Year:</label>
              <select value={selectedYear} onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setSelectedMonths([]); // reset months on year change
              }}>
                <option value="">--Please choose a year--</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {selectedYear && (
              <div>
                <p>Select Months (0 = Jan, 1 = Feb, ...):</p>
                {months.map((month) => (
                  <span key={month} style={{marginRight: "10px"}}>
                    <input
                      type="checkbox"
                      id={month}
                      value={month}
                      checked={selectedMonths.includes(month)}
                      onChange={() => handleMonthChange(month)}
                    />
                    <label htmlFor={month}>{month}</label>
                  </span>
                ))}
              </div>
            )}

            {numSelectedQuestions > 0 && <h4>{numSelectedQuestions} questions selected.</h4>}

            <button
              className="btn btn-ui"
              onClick={handleStart}
              disabled={!selectedYear || selectedMonths.length === 0}
            >
              Let's start
            </button>
        </>
      ) : (
        <h3>No questions available to start.</h3>
      )}
    </div>
  );
}

export default StartScreen;
