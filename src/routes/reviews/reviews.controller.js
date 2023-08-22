const reviewsService = require("./reviews.service");
const reduceProperties = require("../../utils/reduce-properties");

const reduceReviews = reduceProperties("review_id", {
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    preferred_name: ["critic", null, "preferred_name"],
})

async function updateReview(req, res, next) {
    const { reviewId } = req.params;
    res.locals.review = await reviewsService.readReview(reviewId);
    if (res.locals.review.length) {
        const updatedReview = {
            ...res.locals.review,
            ...req.body.data,
            review_id: reviewId,
        }
        await reviewsService.updateReview(updatedReview);
        const review = await reviewsService.readReview(reviewId)
        const data = reduceReviews(review)[0];
        data["critic"] = data["critic"][0];
        data["updated_at"] = data["c_updated_at"];
        data["created_at"] = data["c_created_at"];
        delete data["c_created_at"];
        delete data["c_updated_at"];
        res.json({data: data})
    }
    next({
        status: 404,
        message: `${reviewId} cannot be found`
    })
}

async function destroy(req, res, next) {
    const { reviewId } = req.params;
    const data = await reviewsService.deleteReview(reviewId);
    if (data) {
        res.sendStatus(204);
    }
    next({
        status: 404,
        message: "Review cannot be found"
    })
}

async function listReviews(req, res, next) {
    const { movieId } = req.params;
    const reviews = await reviewsService.listReviews();
    const data = reduceReviews(reviews.filter(movieId ? review => review.movie_id == movieId : () => true ))
    data.forEach((obj) => obj.critic = obj.critic[0])
    res.json({ data: data })
}

module.exports = {
    update: [
        updateReview
    ],
    delete: [
        destroy
    ],
    list: [
        listReviews
    ]
}