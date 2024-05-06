const Movie = require('../models/movie');

module.exports = {
  create,
  delete: deleteReview,
  edit,

};

async function create(req, res) {
  const movie = await Movie.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  movie.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await movie.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/movies/${movie._id}`);
}

async function deleteReview(req, res) {
  const movie = await Movie.findOne({ "reviews._id": req.params.id, "reviews.user": req.user._id });
  if (!movie) return res.redirect("/movies");
  movie.reviews.remove(req.params.id);
  await movie.save();
  res.redirect(`/movies/${movie._id}`);
};

async function edit(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    };
    const review = movie.reviews.find(function (review) {
      return review._id == reviewId;
    });

    if (!review) {
      return res.status(404).send("Review not found");
    };
    res.render(`/movies/${movie._id}/edit`, {
      title: "Edit Review"
    });
  } catch (err) {
    console.log(err);
  };
};

