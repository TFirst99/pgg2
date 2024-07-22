const pool = require('../config/database');

exports.getCurrentRound = async (req, res) => {
  const { grp, pbnr } = req.query;
  try {
    const [rows] = await pool.query(
      'SELECT MAX(round) as round FROM hce_behavior WHERE grp = ? AND pbnr = ?',
      [grp, pbnr]
    );
    const round = rows[0].round || 0;
    res.json({ round });
  } catch (error) {
    console.error('Error getting current round:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.advanceRound = async (req, res) => {
  // This function is a placeholder. Implement the logic to advance the round here.
  // For now, we'll just return a success message.
  res.json({ message: 'Round advanced successfully' });
};