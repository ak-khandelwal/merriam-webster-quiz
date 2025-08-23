import Options from './Options';
import fetchWordAudio from '../utils/fetchWordAudio';
let audioUrl = null;
function Question({ question, dispatch, answer }) {
  // Fetch audio URL using the utility function
  const word = question.question.match(/'([^']+)'/)?.[1] || null;
  audioUrl = fetchWordAudio(word);
  const playAudio = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };
  const hasAnswered = answer !== null;
  return (
    <div className="question_container">
      <div className="my-7 mx-2 sm:mx-auto font-bold text-4xl sm:text-5xl">
        {question.question}{' '}
        <span className="text-amber-200">
          {question.type ? `(${question.type})` : ''}
        </span>
        {audioUrl && (
          <button onClick={playAudio} className="p-2 rounded">
            🔊
          </button>
        )}
      </div>
      {hasAnswered && question.synonyms && (
        <p className="text-xl text-gray-300 mb-4">
          <b>Synonyms</b>: {question.synonyms.join(', ')}
        </p>
      )}
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        hasAnswered={hasAnswered}
      />
      {hasAnswered && question.example && (
        <p className="text-white tracking-wide mt-4">
          <strong>Example:</strong> {question.example}
        </p>
      )}
    </div>
  );
}
export default Question;
