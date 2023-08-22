const theatersService = require("./theaters.service");
const reduceProperties = require("../../utils/reduce-properties");

const reduceTheaters = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    theater_id: ["movies", null, "theater_id"],
    m_created_at: ["movies", null, "created_at"],
    m_updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
});

async function listAllTheaters(req, res, next) {
    const theaters = await theatersService.list();
    const data = reduceTheaters(theaters);
    data.forEach((entry, index) => {
        entry["updated_at"] = entry["t_updated_at"];
        entry["created_at"] = entry["t_created_at"];
        entry["theater_id"] = entry["movies"][0].theater_id;
        entry.movies.forEach((movie) => {
            movie["is_showing"] = !!movie["is_showing"];
        });
        delete entry["t_updated_at"];
        delete entry["t_created_at"];
    });
    res.json({ data: data });
}

module.exports = {
    list: [listAllTheaters],
};
