/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("movies", (table) => {
        table.increments("movie_id").primary();
        table.string("title");
        table.integer("runtime_in_minutes");
        table.string("rating");
        table.text("description");
        table.string("image_url");
        table.timestamp('m_created_at').defaultTo(knex.fn.now());
        table.timestamp('m_updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("movies")
};
