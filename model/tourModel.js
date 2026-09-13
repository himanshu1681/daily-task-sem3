const fs = require('fs');
const path = require('path');

const packageFilePath = path.join(__dirname, '../data/tour.json');

const getAll = () => {
  const Data = fs.readFileSync(packageFilePath, 'utf-8');
  return JSON.parse(Data);
};

const getById = (id) =>{
  const data = fs.readFileSync(packageFilePath, 'utf-8');
  const tours = JSON.parse(data);
  return tours.find(tour => tour.id === id);
}

module.exports = {
  getAll,
  getById
};
