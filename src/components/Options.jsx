function Options({ question, dispatch, hasAnswered }) {
  // answer is being set after clicking the option
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          data-type="option"
          className={`btn btn-option ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={index}
          disabled={hasAnswered}
          data-index={index}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
