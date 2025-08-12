function shuffleArray(array) {
    const arr = array.slice();
    let len = arr.length
    for (let i = len - 1; i > 0; i--) {
        // generate random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default shuffleArray;