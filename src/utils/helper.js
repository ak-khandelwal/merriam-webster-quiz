export const localStorageKey = 'wrongAnswers';
export function shuffleArray(array) {
  const arr = array.slice();
  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    // generate random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // swap elements
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getTheWord(ques) {
  return ques.match(/'([^']+)'/)?.[1];
}

export const SECS_PER_QUESTION = 10;
// add word and its crossponsing answer to localStorage
export function addToLocalStorage(question) {
  const word = question.word || getTheWord(question.question);
  const answer = question.options[question.correctOption];
  const value = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  value.push({ word, answer });
  localStorage.setItem(localStorageKey, JSON.stringify(value));
}
