const tourModel = require('../model/tourModel');

const getallTours = (req, res) => {
  const tours = tourModel.getAll();
  res.status(200).json(tours);
};

const getTourById = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tourModel.getById(id);
  if (tour) {
    res.status(200).json(tour);
  } else {
    res.status(404).json({ message: 'Tour not found' });
  }
};

module.exports = {
  getallTours,
  getTourById
}
