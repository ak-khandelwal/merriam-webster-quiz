function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p className="text-2xl sm:text-3xl">
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p className="text-2xl sm:text-3xl">
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
