const db = require("../db");

// Haversine formula to calculate distance between two coordinates
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Add School Controller
exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const result = await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: "School added successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    res.status(500).json({
      error: "Database error",
      detail: err,
    });
  }
};

// List Schools Controller
exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const result = await db.query("SELECT * FROM schools");
    const schools = result.rows;

    const sorted = schools
      .map((school) => ({
        ...school,
        distance: haversine(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(school.latitude),
          parseFloat(school.longitude)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({
      error: "Database error",
      detail: err,
    });
  }
};
