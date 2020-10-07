const areValidInputs = (validInputs, inputs) => {
    return Object.keys(inputs)
        .every(bodyInput => validInputs.includes(bodyInput))
}

module.exports = areValidInputs