const isPasswordStrong = password => {
    if (password.length < 8) {
        throw new Error('Please provide a strong password with minimum of 8 characters')
    }

    return true
}

module.exports = isPasswordStrong