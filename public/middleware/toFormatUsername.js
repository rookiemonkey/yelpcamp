const toFormatUsername = username => {
    return username.replace(/\s+/g, '-').toLowerCase();
}

module.exports = toFormatUsername