const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function listAllMovies (req, res, next) {
    const is_showing = req.query.is_showing;
    if (is_showing) {
        const movies = await moviesService.listActiveMovies();
        console.log(movies);
        res.json({ data: movies })
    } else {
        const movies = await moviesService.listMovies();
        res.json({ data: movies });
    }
}

async function readMovie (req, res, next) {
    const { movieId } = req.params;
    const movie = await moviesService.readMovie(movieId);
    if (movie) {
        res.json({ data: movie })
    }
    next({
        status: 404,
        message: `${movieId} cannot be found`
    });
}

module.exports = {
    list: [asyncErrorBoundary(listAllMovies)],
    read: [asyncErrorBoundary(readMovie)],
}