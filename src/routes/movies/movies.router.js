const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const cors = require("cors");
const controller = require("./movies.controller");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router.use("/:movieId/reviews", reviewsRouter);
router.use("/:movieId/theaters", theatersRouter);

router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);
router.route("/:movieId").all(cors()).get(controller.read).all(methodNotAllowed);

module.exports = router;