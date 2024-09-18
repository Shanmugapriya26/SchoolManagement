const db = require('../config/database');

const School = {
  addSchool: (schoolData, callback) => {
    const { name, address, latitude, longitude } = schoolData;
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], callback);
  },

  getAllSchools: (callback) => {
    const query = 'SELECT * FROM schools';
    db.query(query, callback);
  }
};

module.exports = School;
