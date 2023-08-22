const router = require("express").Router({ mergeParams: true });
const cors = require("cors");
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./reviews.controller");

const corsPUT = cors({ methods: "PUT" });
const corsDELETE = cors({ methods: "DELETE" });

router.route("/").get(cors(), controller.list).all(methodNotAllowed);
router.route("/:reviewId").put(corsPUT, controller.update).delete(corsDELETE, controller.delete).all(methodNotAllowed);

module.exports = router;