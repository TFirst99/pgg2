const pool = require('../../config/database');

exports.getFinalData = async (req, res) => {
  const { group: grp, pbnr } = req.body;

  try {
    const connection = await pool.getConnection();

    const date = await getDate(connection, grp, pbnr);
    const powerReceived = await getPowerReceived(connection, grp, pbnr);
    const powerTransferred = await getPowerTransferred(connection, grp, pbnr);
    const earnings = await getEarnings(connection, grp, pbnr);

    connection.release();

    res.status(200).json({
      received: powerReceived ? 1 : 0,
      transferred: powerTransferred ? 1 : 0,
      earnings,
      date
    });
  } catch (error) {
    console.error('Error in getFinalData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function getDate(connection, grp, pbnr) {
  const [rows] = await connection.query(
    'SELECT date FROM hce_behavior WHERE grp = ? AND pbnr = ? ORDER BY date DESC LIMIT 1',
    [grp, pbnr]
  );
  return rows[0]?.date || new Date().toISOString().slice(0, 19).replace('T', ' ');
}

async function getPowerReceived(connection, grp, pbnr) {
  const column = `p${pbnr}`;
  const [rows] = await connection.query(
    `SELECT ${column} FROM hce_behavior WHERE grp = ? AND type = 'effectiveness' AND pbnr != ? AND ${column} != 0 LIMIT 1`,
    [grp, pbnr]
  );
  return rows.length > 0;
}

async function getPowerTransferred(connection, grp, pbnr) {
  const columns = ['p1', 'p2', 'p3', 'p4', 'p5'].filter(p => p !== `p${pbnr}`);
  const [rows] = await connection.query(
    `SELECT ${columns.join(', ')} FROM hce_behavior WHERE grp = ? AND type = 'effectiveness' AND pbnr = ? LIMIT 1`,
    [grp, pbnr]
  );
  return rows.length > 0 && Object.values(rows[0]).some(v => v !== 0);
}

async function getEarnings(connection, grp, pbnr) {
  const [rows] = await connection.query(
    `SELECT p${pbnr} as earnings FROM hce_payment WHERE grp = ?`,
    [grp]
  );
  return rows[0]?.earnings || 0;
}