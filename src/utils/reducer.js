import shuffleArray from '../utils/suffleArray';
export const SECS_PER_QUESTION = 10;

export const initialState = {
  allQuestions: {},
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  isTimerOn: false
};

export function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        allQuestions: action.payload,
        status: 'ready'
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      };
    case 'startQuiz':
      const selectedYearMonth = action.payload;
      const selectedQuestions = Object.entries(selectedYearMonth).flatMap(
        ([year, months]) =>
          months.flatMap((month) => state.allQuestions[year][month])
      );
      // Shuffle the selected questions
      const shuffledArray = shuffleArray(selectedQuestions);
      return {
        ...state,
        questions: shuffledArray,
        status: 'active',
        secondsRemaining: selectedQuestions.length * SECS_PER_QUESTION
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      };
    case 'restart':
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        status: 'ready'
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      };
    case 'toggleTimer':
      return {
        ...state,
        isTimerOn: !state.isTimerOn
      };
    default:
      throw new Error('Action unkonwn');
  }
}
