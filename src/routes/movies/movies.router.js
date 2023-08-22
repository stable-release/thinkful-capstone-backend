const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const cors = require("cors");
const controller = require("./movies.controller");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router.use("/:movieId/reviews", reviewsRouter);
router.use("/:movieId/theaters", theatersRouter);

router.route("/").get(cors(), controller.list).all(methodNotAllowed);
router.route("/:movieId").get(cors(), controller.read).all(methodNotAllowed);

module.exports = router;