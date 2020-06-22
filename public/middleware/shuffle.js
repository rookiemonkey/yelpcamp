const shuffle = arr => {
    for (let idx1 = arr.length - 1; idx1 > 0; idx1--) {

        // generate a random index between 0 and idx1 (inclusive)
        let idx2 = Math.floor(Math.random() * (idx1 + 1));

        // swap elements at idx1 and idx2
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }
    return arr;
}

module.exports = shuffle;