const pool = require('../../config/database');

async function getDate(grp, round, type) {
  const connection = await pool.getConnection();

  try {
    if (round === 1 && type === 'contribution') {
      return getCurrentDate();
    } else {
      const [rows] = await connection.query(
        'SELECT date FROM hce_behavior WHERE grp = ? AND round = ? ORDER BY date DESC LIMIT 1',
        [grp, round]
      );

      if (rows.length === 0) {
        return getCurrentDate();
      } else {
        return rows[0].date;
      }
    }
  } finally {
    connection.release();
  }
}

function getCurrentDate() {
  const now = new Date();
  return now.getFullYear().toString() +
         (now.getMonth() + 1).toString().padStart(2, '0') +
         now.getDate().toString().padStart(2, '0') +
         now.getHours().toString().padStart(2, '0') +
         now.getMinutes().toString().padStart(2, '0');
}

module.exports = getDate;