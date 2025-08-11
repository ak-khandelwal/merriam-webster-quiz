import { useState } from "react";
function StartScreen({ dispatch, allQuestions }) {
  const [selected, setSelected] = useState({});

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
    <div className="tailwind-page text-2xl sm:text-3xl">
    {/* <div className="tailwind-page"> */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4 py-8 ">
        <h2 className="font-extrabold mb-2 text-blue-400 drop-shadow text-4xl sm:text-5xl">
          Merriam-Webster Quiz
        </h2>
        <h3 className="font-medium mb-8 text-gray-300 text-xl sm:text-2xl">
          Please select the year and month for the quiz
        </h3>

        {/* Modified container for full screen width */}
        <div className="w-full space-y-8 min-h-screen overflow-y-auto">
          {years.map((year) => {
            const allMonthsForYear = Object.keys(allQuestions[year]);
            const areAllSelectedForYear =
              selected[year]?.length === allMonthsForYear.length &&
              allMonthsForYear.length > 0;

            return (
              <div
                key={year}
                className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-blue-300">
                    {year}{" "}
                    <span className="text-green-400 font-semibold mr-4">
                      {selected[year]
                        ? selected[year].reduce(
                            (acc, month) => acc + allQuestions[year][month].length,
                            0
                          )
                        : 0}
                      {" / "}
                      {Object.values(allQuestions[year]).reduce(
                        (acc, arr) => acc + arr.length,
                        0
                      )}{" "}
                      questions selected
                    </span>
                  </h4>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`select-all-${year}`}
                      checked={areAllSelectedForYear}
                      onChange={() => handleSelectAll(year)}
                      className="h-6 w-6 accent-blue-500 rounded border-2 border-blue-500 bg-gray-900 transition-transform duration-150 hover:scale-110"
                    />
                    <span className="text-blue-300 font-medium">Select All</span>
                  </label>
                </div>

                <div className="flex flex-wrap gap-4">
                  {allMonthsForYear.map((month) => (
                    <label
                      key={month}
                      htmlFor={`${year}-${month}`}
                      className="flex items-center gap-3 bg-gray-900/50 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={`${year}-${month}`}
                        checked={selected[year]?.includes(month) || false}
                        onChange={() => handleMonthChange(year, month)}
                        className="h-6 w-6 accent-blue-400 rounded border-2 border-blue-400 bg-gray-900 transition-transform duration-150 hover:scale-110"
                      />
                      <span className="text-gray-200 ">
                        {monthNames[month]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* {numSelectedQuestions > 0 && (
    <h4 className="mt-6 text-green-400 font-semibold">
      {numSelectedQuestions} questions selected.
    </h4>
  )} */}

        <button
          className="mt-8 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-md hover:from-blue-500 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold tracking-wide"
          onClick={handleStart}
          disabled={Object.keys(selected).length === 0}
        >
          🚀 Let's Start
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
