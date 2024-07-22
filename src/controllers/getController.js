const pool = require('../../config/database');
const getRound = require('../utils/getRound');

exports.getData = async (req, res) => {
  const { type, grp, pbnr, round: requestedRound } = req.body;

  try {
    const connection = await pool.getConnection();
    const round = requestedRound || await getRound(grp, pbnr);

    let result;
    switch (type) {
      case 'effectiveness':
        result = await getEffectivenessData(connection, grp, pbnr, round);
        break;
      case 'contribution':
        result = await getContributionData(connection, grp, pbnr, round);
        break;
      case 'deduction':
        result = await getDeductionData(connection, grp, pbnr, round);
        break;
      default:
        throw new Error('Invalid type');
    }

    connection.release();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function getEffectivenessData(connection, grp, pbnr, round) {
  const [totalRows] = await connection.query(
    'SELECT p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND round = ?',
    [grp, round]
  );
  const [userRow] = await connection.query(
    'SELECT p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND round = ? AND pbnr = ?',
    [grp, round, pbnr]
  );

  const total = totalRows.reduce((acc, row) => {
    return acc.map((val, idx) => val + row[`p${idx + 1}`]);
  }, [0, 0, 0, 0, 0]);

  const user = userRow[0] ? Object.values(userRow[0]) : [0, 0, 0, 0, 0];

  const reorderedTotal = [pbnr, ...Array.from({length: 5}, (_, i) => i + 1).filter(i => i !== pbnr)]
    .map(i => total[i - 1]);
  const reorderedUser = [pbnr, ...Array.from({length: 5}, (_, i) => i + 1).filter(i => i !== pbnr)]
    .map(i => user[i - 1]);

  return {
    total: reorderedTotal.join(' $$ '),
    user: reorderedUser.join(' $$ ')
  };
}

async function getContributionData(connection, grp, pbnr, round) {
  const [rows] = await connection.query(
    'SELECT pbnr, p1 FROM hce_behavior WHERE grp = ? AND type = "contribution" AND round = ?',
    [grp, round]
  );

  const contributions = rows.reduce((acc, row) => ({ ...acc, [row.pbnr]: row.p1 }), {});
  const reordered = [pbnr, ...Array.from({length: 5}, (_, i) => i + 1).filter(i => i !== pbnr)]
    .map(i => contributions[i] || 0);

  return reordered.join(' $$ ');
}

async function getDeductionData(connection, grp, pbnr, round) {
  const [rows] = await connection.query(
    'SELECT pbnr, p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "deduction" AND round = ?',
    [grp, round]
  );

  const deductions = rows.reduce((acc, row) => {
    acc[row.pbnr] = [row.p1, row.p2, row.p3, row.p4, row.p5];
    return acc;
  }, {});

  const order = [pbnr, ...Array.from({length: 5}, (_, i) => i + 1).filter(i => i !== pbnr)];
  const result = order.map(i => {
    const playerDeductions = deductions[i] || [0, 0, 0, 0, 0];
    return order.map(j => playerDeductions[j - 1]).join(' $$ ');
  });

  return result.join(' && ');
}