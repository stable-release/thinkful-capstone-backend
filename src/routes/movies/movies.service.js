const knex = require("../../db/connection");

function listMovies() {
    return knex("movies").select("*");
}

function listActiveMovies() {
    return knex("movies as m").join("movies_theaters as mt", "mt.movie_id", "m.movie_id").where("mt.is_showing", true).groupBy("mt.movie_id").select("*");
}

function readMovie(movieId) {
    return knex("movies").where("movie_id", movieId).select("*").first();
}

module.exports = {
    listMovies,
    listActiveMovies,
    readMovie,
}