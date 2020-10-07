const bcrypt = require("bcrypt");

const setCookie = async id => {
    const d = new Date();
    const dt = d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    const output = await bcrypt.hashSync(toString(id), 10);
    return { cookie: output, maxAge: dt };
}

module.exports = setCookie;