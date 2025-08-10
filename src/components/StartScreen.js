import { useState } from "react";

function StartScreen({ dispatch, allQuestions }) {
  const [selected, setSelected] = useState({});

  const years = allQuestions ? Object.keys(allQuestions) : [];

  const handleMonthChange = (year, month) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };
      const yearMonths = newSelected[year] || [];

      if (yearMonths.includes(month)) {
        newSelected[year] = yearMonths.filter((m) => m !== month);
      } else {
        newSelected[year] = [...yearMonths, month];
      }

      // Clean up empty year arrays
      if (newSelected[year].length === 0) {
        delete newSelected[year];
      }

      return newSelected;
    });
  };

  const handleSelectAll = (year) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };
      const allMonthsForYear = Object.keys(allQuestions[year]);

      if (newSelected[year]?.length === allMonthsForYear.length) {
        // Deselect all
        delete newSelected[year];
      } else {
        // Select all
        newSelected[year] = allMonthsForYear;
      }

      return newSelected;
    });
  };

  const handleStart = () => {
    dispatch({
      type: "startQuiz",
      payload: selected,
    });
  };

  const numSelectedQuestions = Object.entries(selected).reduce(
    (acc, [year, months]) =>
      acc +
      months.reduce(
        (monthAcc, month) => monthAcc + allQuestions[year][month].length,
        0
      ),
    0
  );

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>Select questions to start</h3>

      {years.map((year) => {
        const allMonthsForYear = Object.keys(allQuestions[year]);
        const areAllSelectedForYear = selected[year]?.length === allMonthsForYear.length && allMonthsForYear.length > 0;

        return (
            <div key={year} style={{ marginBottom: "20px" }}>
              <h4>{year}</h4>
              <div>
                <span style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    id={`select-all-${year}`}
                    checked={areAllSelectedForYear}
                    onChange={() => handleSelectAll(year)}
                  />
                  <label htmlFor={`select-all-${year}`}>Select All</label>
                </span>
                {allMonthsForYear.map((month) => (
                  <span key={month} style={{ marginRight: "10px" }}>
                    <input
                      type="checkbox"
                      id={`${year}-${month}`}
                      checked={selected[year]?.includes(month) || false}
                      onChange={() => handleMonthChange(year, month)}
                    />
                    <label htmlFor={`${year}-${month}`}>{month}</label>
                  </span>
                ))}
              </div>
            </div>
        )
      })}

      {numSelectedQuestions > 0 && (
        <h4>{numSelectedQuestions} questions selected.</h4>
      )}

      <button
        className="btn btn-ui"
        onClick={handleStart}
        disabled={Object.keys(selected).length === 0}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
