
// CAMPGROUND ROUTES
module.exports.handler_addCamp = require('./campgrounds/handler_addCamp');
module.exports.handler_deleteCamp = require('./campgrounds/handler_deleteCamp');
module.exports.handler_updateCamp = require('./campgrounds/handler_updateCamp');
module.exports.single_showCampground = require('./campgrounds/single_showCampground');
module.exports.multi_showCampgrounds = require('./campgrounds/multi_showCampgrounds');

// COMMENT ROUTES
module.exports.handler_addComment = require('./comments/handler_addComment');
module.exports.handler_deleteComment = require('./comments/handler_deleteComment');
module.exports.handler_updateComment = require('./comments/handler_updateComment');

// USER ROUTES
module.exports.handler_login = require('./users/handler_login');
module.exports.handler_signup = require('./users/handler_signup');
module.exports.handler_forgotPassword = require('./users/handler_forgotPassword');
module.exports.handler_resetPassword = require('./users/handler_resetPassword');
module.exports.form_signup = require('./users/form_signup');
module.exports.form_login = require('./users/form_login');
module.exports.form_logout = require('./users/form_logout');
module.exports.form_forgotPassword = require('./users/form_forgotPassword');
module.exports.form_resetPassword = require('./users/form_resetPassword');
module.exports.form_addCamp = require('./users/form_addCamp');
module.exports.form_updateCamp = require('./users/form_updateCamp');

// 404 ERROR
module.exports.Error = require('./error404');