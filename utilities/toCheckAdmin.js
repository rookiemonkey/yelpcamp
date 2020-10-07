const bcrypt = require("bcrypt");
const User = require('../schemas/userSchema');

const toCheckAdmin = async (adminCode, admin, _id) => {
    const foundUser = await User.findById(_id)
    if (!foundUser.isAdmin) { return false }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(adminCode, salt);
    return await bcrypt.compareSync(admin, hash);
}

module.exports = toCheckAdmin;