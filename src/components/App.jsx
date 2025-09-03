import { useEffect, useReducer } from 'react';
import questionsData from '../data/questions.json';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
import '../App.css';

import { initialState } from '../utils/reducer';
import { reducer } from '../utils/reducer';
export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      allQuestions,
      isTimerOn // added timer on/off state
    },
    dispatch
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    dispatch({ type: 'dataReceived', payload: questionsData });
  }, []);

  return (
    <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && (
        <StartScreen
          dispatch={dispatch}
          allQuestions={allQuestions}
          isTimerOn={isTimerOn}
        />
      )}{' '}
      {status === 'active' && (
        <div className="px-10 py-12 text-xl sm:text-2xl">
          <Progress
            index={index}
            numQuestions={numQuestions}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            {isTimerOn && (
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            )}
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
              question={questions[index]}
            />
          </Footer>
        </div>
      )}
      {status === 'finished' && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </Main>
  );
}
