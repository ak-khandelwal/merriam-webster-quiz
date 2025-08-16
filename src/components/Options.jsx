function Options({ question, dispatch, answer, hasAnswered }) {
  // answer is being set after clicking the option
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
