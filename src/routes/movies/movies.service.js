const knex = require("../../db/connection");

function listMovies() {
    return knex("movies").select("*");
}

function listActiveMovies() {
    return knex("movies as m")
    .groupBy("m.movie_id")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where("mt.is_showing", true)
    .select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url");
}

function readMovie(movieId) {
    return knex("movies").where("movie_id", movieId).select("*").first();
}

module.exports = {
    listMovies,
    listActiveMovies,
    readMovie,
}