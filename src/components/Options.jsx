function Options({ question, dispatch, answer }) {
  // answer is being set after clicking the option
  const hasAnswered = answer !== null;

  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
