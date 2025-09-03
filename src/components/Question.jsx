import Options from './Options';
import fetchWordAudio from '../utils/fetchWordAudio';
import { getTheWord, localStorageKey } from '../utils/helper';
let audioUrl = null;

function Question({ question, dispatch, answer }) {
  function optionClicks(e) {
    const type = e.target.dataset.type;
    let index = null;
    if (type === 'option') index = Number(e.target.dataset.index);
    if (type === 'option' && index !== null) {
      dispatch({ type: 'newAnswer', payload: index });
      // set the word to the localstorage if answer is wrong
      if (index !== question.correctOption) {
        const word = question.word || getTheWord(question.question);
        const answer = question.options[question.correctOption];
        const value = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        value.push({ word, answer });
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }
    }
  }
  // Fetch audio URL using the utility function
  const word = question.word || getTheWord(question.question) || null;
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
          <button onClick={playAudio} className="p-2 rounded" tabIndex={-1}>
            🔊
          </button>
        )}
      </div>
      {hasAnswered && question.synonyms && (
        <p className="text-xl text-gray-300 mb-4">
          <b>Synonyms</b>: {question.synonyms.join(', ')}
        </p>
      )}
      <div onClick={optionClicks}>
        <Options
          question={question}
          dispatch={dispatch}
          answer={answer}
          hasAnswered={hasAnswered}
        />
      </div>
      {hasAnswered && question.example && (
        <p className="text-white tracking-wide mt-4">
          <strong>Example:</strong> {question.example}
        </p>
      )}
    </div>
  );
}
export default Question;
