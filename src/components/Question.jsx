import Options from './Options';
import fetchWordAudio from '../utils/fetchWordAudio';
import { getTheWord, addToLocalStorage } from '../utils/helper';
import { useEffect, useRef } from 'react';
let audioUrl = null;

function Question({ question, dispatch, answer }) {
  const firstOptionRef = useRef(null);
  useEffect(() => {
    if (firstOptionRef.current) {
      firstOptionRef.current.focus(); // set focus on mount
    }
  }, [question]);
  function optionClicks(e) {
    const type = e.target.dataset.type;
    let index = null;
    if (type === 'option') index = Number(e.target.dataset.index);
    if (type === 'option' && index !== null) {
      dispatch({ type: 'newAnswer', payload: index });
      // set the word to the localstorage if answer is wrong
      if (index !== question.correctOption) {
        addToLocalStorage(question);
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
        {hasAnswered &&
          (answer === question.correctOption ? (
            <span
              title="Correct"
              className="inline-block align-middle ml-2 text-green-400 text-3xl"
            >
              ✔️
            </span>
          ) : (
            <span
              title="Wrong"
              className="inline-block align-middle ml-2 text-red-400 text-3xl"
            >
              ❌
            </span>
          ))}
      </div>
      {hasAnswered && question.synonyms && (
        <p className="text-xl text-gray-300 mb-4">
          <b>Synonyms</b>: {question.synonyms.join(', ')}
        </p>
      )}
      <div onClick={optionClicks}>
        <button ref={firstOptionRef} className="sr-only"></button>
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
