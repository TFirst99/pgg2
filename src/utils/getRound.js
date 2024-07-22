const pool = require('../../config/database');

async function getRound(grp, pbnr) {
  try {
    const [rows] = await pool.query(
      'SELECT MAX(round) as round FROM hce_behavior WHERE grp = ? AND pbnr = ?',
      [grp, pbnr]
    );

    let round = rows[0].round;
    if (round === null) {
      round = 0;
    }

    return round;
  } catch (error) {
    console.error('Error getting round:', error);
    throw error;
  }
}

module.exports = getRound;