const toUpdatePassword = (user, newPW) => {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.setPassword(newPW, async () => {
        try { await user.save(); }
        catch (err) { return err.message; }
    });
};

module.exports = toUpdatePassword;