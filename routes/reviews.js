const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.put("/reviews/:id/edit", ensureLoggedIn, reviewsCtrl.edit);
// POST /movies/:id/reviews (create review for a movie)
router.post('/movies/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
router.delete("/reviews/:id", ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;