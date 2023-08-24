const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../../errors/methodNotAllowed");
const cors = require("cors");
const controller = require("./theaters.controller");

router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);

module.exports = router;