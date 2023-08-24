const router = require("express").Router({ mergeParams: true });
const cors = require("cors");
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);
router.route("/:reviewId").all(cors()).put(controller.update).delete(controller.delete).all(methodNotAllowed);

module.exports = router;