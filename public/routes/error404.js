// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();

// ===========================
// 404 ERROR
// ===========================
router.get("*", (req, res) => {
    res.send("ERROR:404 Unfortunately, the page that you are asking is not existing..")
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;