const toError = require("./toError");

const setToken = async (
    user = toError("Found User"),
    token = toError("Token")
) => {
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000 // 1hr
    await user.save();
}

module.exports = setToken;