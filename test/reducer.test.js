import { initialState } from '../src/utils/reducer';
import { reducer } from '../src/utils/reducer';
import { SECS_PER_QUESTION } from '../src/utils/reducer';
// We need to define the intialState in order to use useReduce Hook.

function makeQuestion(overrides = {}) {
  return { correctOption: 1, points: 10, ...overrides };
}

describe('reducer', () => {
  it('should handle dataReceived', () => {
    const action = { type: 'dataReceived', payload: { 2024: {} } };
    const newState = reducer(initialState, action);

    expect(newState.allQuestions).toEqual({ 2024: {} });
    expect(newState.status).toBe('ready');
  });

  it('should handle dataFailed', () => {
    const action = { type: 'dataFailed' };
    const newState = reducer(initialState, action);

    expect(newState.status).toBe('error');
  });

  it('should handle startQuiz', () => {
    const state = {
      ...initialState,
      allQuestions: {
        2024: {
          0: [makeQuestion(), makeQuestion()]
        }
      }
    };
    const action = { type: 'startQuiz', payload: { 2024: [0] } };

    const newState = reducer(state, action);

    expect(newState.status).toBe('active');
    expect(newState.questions.length).toBe(2);
    expect(newState.secondsRemaining).toBe(2 * SECS_PER_QUESTION);
  });

  it('should handle newAnswer with correct option', () => {
    const state = {
      ...initialState,
      questions: [makeQuestion()],
      index: 0,
      points: 0
    };
    const action = { type: 'newAnswer', payload: 1 };

    const newState = reducer(state, action);

    expect(newState.answer).toBe(1);
    expect(newState.points).toBe(10);
  });

  it('should handle newAnswer with wrong option', () => {
    const state = {
      ...initialState,
      questions: [makeQuestion()],
      index: 0,
      points: 0
    };
    const action = { type: 'newAnswer', payload: 2 };

    const newState = reducer(state, action);

    expect(newState.points).toBe(0);
  });

  it('should handle nextQuestion', () => {
    const state = { ...initialState, index: 0, answer: 2 };
    const action = { type: 'nextQuestion' };

    const newState = reducer(state, action);

    expect(newState.index).toBe(1);
    expect(newState.answer).toBeNull();
  });

  it('should handle finish', () => {
    const state = { ...initialState, points: 20, highscore: 10 };
    const action = { type: 'finish' };

    const newState = reducer(state, action);

    expect(newState.status).toBe('finished');
    expect(newState.highscore).toBe(20);
  });

  it('should handle restart', () => {
    const state = { ...initialState, allQuestions: { 2024: {} } };
    const action = { type: 'restart' };

    const newState = reducer(state, action);

    expect(newState.status).toBe('ready');
    expect(newState.allQuestions).toEqual({ 2024: {} });
  });

  it('should handle tick when time remaining', () => {
    const state = {
      ...initialState,
      secondsRemaining: 5,
      points: 10,
      highscore: 20,
      status: 'active'
    };
    const action = { type: 'tick' };

    const newState = reducer(state, action);

    expect(newState.secondsRemaining).toBe(4);
    expect(newState.status).toBe('active');
  });

  it('should handle tick when timer reaches 0', () => {
    const state = {
      ...initialState,
      secondsRemaining: 0,
      points: 30,
      highscore: 20
    };
    const action = { type: 'tick' };

    const newState = reducer(state, action);

    expect(newState.status).toBe('finished');
    expect(newState.highscore).toBe(30);
  });

  it('should handle toggleTimer', () => {
    const state = { ...initialState, isTimerOn: true };
    const action = { type: 'toggleTimer' };

    const newState = reducer(state, action);

    expect(newState.isTimerOn).toBe(false);
  });

  it('should throw error on unknown action', () => {
    const action = { type: 'unknownAction' };
    expect(() => reducer(initialState, action)).toThrow('Action unkonwn');
  });
});
