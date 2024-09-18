const School = require('../models/schoolModel');
const { calculateDistance } = require('../utils/distanceCalculator');

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  School.addSchool({ name, address, latitude, longitude }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add school' });
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
};

const listSchools = (req, res) => {
  const { latitude: userLatitude, longitude: userLongitude } = req.query;

  if (!userLatitude || !userLongitude) {
    return res.status(400).json({ error: 'User location (latitude and longitude) is required' });
  }

  School.getAllSchools((err, schools) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve schools' });

    const sortedSchools = schools.map((school) => {
      const distance = calculateDistance(
        userLatitude, userLongitude, school.latitude, school.longitude
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
};

module.exports = { addSchool, listSchools };
