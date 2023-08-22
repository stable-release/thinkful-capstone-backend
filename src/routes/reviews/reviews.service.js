const knex = require("../../db/connection");

function updateReview(review) {
    return knex("reviews").where("review_id", review.review_id).update({
        content: review.content,
        score: review.score
    });
}

function readReview(reviewId) {
    return knex("reviews as r").where("r.review_id", reviewId).join("critics as c", "r.critic_id", "c.critic_id").select("*");
}

function deleteReview(reviewId) {
    return knex("reviews").where("review_id", reviewId).del();
}

function listReviews() {
    return knex("reviews as r").join("critics as c", "r.critic_id", "c.critic_id").select("*");
}

module.exports = {
    readReview,
    updateReview,
    deleteReview,
    listReviews,
}