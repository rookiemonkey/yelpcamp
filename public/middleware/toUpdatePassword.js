const toError = require("./toError");

const toUpdatePassword = (
    user = toError("User"),
    newPW = toError("New Password")
) => {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.setPassword(newPW, async () => {
        try { user.save(); }
        catch (err) { console.log(err); }
    });
};

module.exports = toUpdatePassword;