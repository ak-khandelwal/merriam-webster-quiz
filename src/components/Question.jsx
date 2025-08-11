import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div className="question_container">
      <h4 className="my-7 mx-2 sm:mx-auto font-bold text-4xl sm:text-5xl">
        {question.question}
      </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
