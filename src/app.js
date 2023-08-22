if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./routes/movies/movies.router");
const theatersRouter = require("./routes/theaters/theaters.router");
const reviewsRouter = require("./routes/reviews/reviews.router");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res, next) => {
    next({
        status: 404,
        message: `Not found for ${req.originalUrl}`
    })
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Error' } = err;
    res.status(status).json({
        error: message
    });
});

module.exports = app;
