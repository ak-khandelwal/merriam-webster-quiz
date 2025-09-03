function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <div className="result_container">
      <p className="result text-2xl sm:text-3xl">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      {(() => {
        const wrongAnswers = JSON.parse(
          localStorage.getItem('wrongAnswers') || '[]'
        );
        return wrongAnswers.length > 0 ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Wrong Questions:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-red-800">
              {wrongAnswers.map((item, index) => (
                <li key={index} className="text-base">
                  <span className="font-medium">{item.word}</span> →{' '}
                  <span className="italic">{item.answer}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null;
      })()}
      <button
        className="btn btn-ui my-5"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
