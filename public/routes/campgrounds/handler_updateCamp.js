// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const toGeocode = require("../../middleware/toGeocode");
const Campground = require("../../schemas/campgroundSchema");

// =========================================
// UPDATE ROUTE: edit handler
// =========================================
const handler_updateCamp = (req, res) => {
  Campground.findById(req.params.id, async (err, foundCampground) => {
    if (req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id) || isAdmin(req)) {

      const loc = await toGeocode(req.body.updates.location);
      req.body.updates.lat = loc.lat;
      req.body.updates.lng = loc.lng;
      req.body.updates.location = loc.formattedLocation;

      Campground.findByIdAndUpdate(req.params.id, req.body.updates, (err) => {
        if (err) {
          req.flash("error", `Something went wrong upon updating. ${err.message} Please try again`);
          res.redirect(`/campgrounds/camps/${req.params.id}`);
        } else {
          req.flash("success", `"${foundCampground.campname}" was updated successfully`);
          res.redirect(`/campgrounds/camps/${req.params.id}`);
        }
      });
    } else {
      // if not logged in let them log in first
      req.flash("error", "Something is not right. You need to be logged in and should be the owner of the camp to edit it");
      res.redirect("/campgrounds/users/login");
    }
  })
};


// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_updateCamp;