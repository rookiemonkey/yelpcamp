const toError = require("./toError");

const toUpdatePassword = (
    user = toError("User"),
    newPW = toError("New Password")
) => {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.setPassword(newPW, async () => {
        try { await user.save(); }
        catch (err) { return err.message; }
    });
};

module.exports = toUpdatePassword;