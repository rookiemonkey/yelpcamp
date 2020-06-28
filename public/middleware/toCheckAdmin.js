const bcrypt = require("bcrypt");
const toError = require("./toError");

const toCheckAdmin = async (
    adminCode = toError('adminCode'),
    admin = toError('admin')
) => {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(adminCode, salt);
    return await bcrypt.compareSync(admin, hash);
}

module.exports = toCheckAdmin;