/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary();
        table.text("content");
        table.integer("score");
        table.integer("critic_id");
        table.foreign("critic_id").references("critic_id").inTable("critics").onDelete("cascade");
        table.integer("movie_id");
        table.foreign("movie_id").references("movie_id").inTable("movies").onDelete("cascade");
        table.timestamp('r_created_at').defaultTo(knex.fn.now());
        table.timestamp('r_updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
