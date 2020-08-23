const isPasswordStrong = password => {
    if (password.length < 8) { return false }

    return true
}

module.exports = isPasswordStrong