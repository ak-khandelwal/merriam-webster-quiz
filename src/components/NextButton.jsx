import { addToLocalStorage } from '../utils/helper';

function NextButton({ dispatch, answer, index, numQuestions, question }) {
  function handleIsAnswered(answer) {
    if (answer === null) {
      debugger;
      addToLocalStorage(question);
    }
  }
  // if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          // if next is clicked and answer is null then add it to wrongAnswer from localStorage
          handleIsAnswered(answer);
          dispatch({ type: 'nextQuestion' });
        }}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: 'finish' });
          handleIsAnswered(answer);
        }}
      >
        Finish
      </button>
    );
}

export default NextButton;
