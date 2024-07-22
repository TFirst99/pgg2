const pool = require('../../config/database');
const getRound = require('../utils/getRound');

const MUs = 20;

exports.calculateEarnings = async (req, res) => {
  const { grp, pbnr, multiplier } = req.body;
  
  try {
    const round = await getRound(grp, pbnr);
    const connection = await pool.getConnection();

    // Fetch contributions
    const contributions = await fetchContributions(connection, grp, round);

    // Fetch effectiveness
    const effectiveness = await fetchEffectiveness(connection, grp, round);

    // Fetch and calculate deductions
    const deductions = await fetchAndCalculateDeductions(connection, grp, round, effectiveness);

    // Calculate payoffs
    const payoffs = calculatePayoffs(contributions, deductions, multiplier);

    // Update payments
    await updatePayments(connection, grp, payoffs);

    // Prepare response
    const response = prepareResponse(pbnr, contributions, deductions);

    connection.release();
    res.status(200).json(response);
  } catch (error) {
    console.error('Error calculating earnings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function fetchContributions(connection, grp, round) {
  const query = 'SELECT pbnr, p1 FROM hce_behavior WHERE grp = ? AND type = "contribution" AND round = ?';
  const [rows] = await connection.query(query, [grp, round]);
  return rows.reduce((acc, row) => ({ ...acc, [row.pbnr]: row.p1 }), {});
}

async function fetchEffectiveness(connection, grp, round) {
  const query = 'SELECT pbnr, p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND round = ?';
  const [rows] = await connection.query(query, [grp, round]);
  return rows.reduce((acc, row) => {
    acc[row.pbnr] = [row.p1, row.p2, row.p3, row.p4, row.p5];
    return acc;
  }, {});
}

async function fetchAndCalculateDeductions(connection, grp, round, effectiveness) {
  const query = 'SELECT pbnr, p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "deduction" AND round = ?';
  const [rows] = await connection.query(query, [grp, round]);
  
  const deductions = rows.reduce((acc, row) => {
    acc[row.pbnr] = [row.p1, row.p2, row.p3, row.p4, row.p5];
    return acc;
  }, {});

  // Apply effectiveness to deductions
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 5; j++) {
      deductions[i][j] *= effectiveness[i][j];
    }
  }

  return deductions;
}

function calculatePayoffs(contributions, deductions, multiplier) {
  const totalContribution = Object.values(contributions).reduce((sum, c) => sum + c, 0);
  const conTot = totalContribution * multiplier;
  
  const payoffs = {};
  for (let i = 1; i <= 5; i++) {
    const totalDeductionReceived = Object.values(deductions).reduce((sum, d) => sum + d[i-1], 0);
    const totalDeductionGiven = deductions[i].reduce((sum, d) => sum + d, 0);
    payoffs[i] = (conTot / 5) - totalDeductionReceived - totalDeductionGiven + (MUs - contributions[i]);
  }

  return payoffs;
}

async function updatePayments(connection, grp, payoffs) {
  const query = 'INSERT INTO hce_payment (grp, p1, p2, p3, p4, p5) VALUES (?, ?, ?, ?, ?, ?) ' +
                'ON DUPLICATE KEY UPDATE p1 = p1 + VALUES(p1), p2 = p2 + VALUES(p2), ' +
                'p3 = p3 + VALUES(p3), p4 = p4 + VALUES(p4), p5 = p5 + VALUES(p5)';
  await connection.query(query, [grp, payoffs[1], payoffs[2], payoffs[3], payoffs[4], payoffs[5]]);
}

function prepareResponse(pbnr, contributions, deductions) {
  const order = [pbnr, ...Array.from({length: 5}, (_, i) => i + 1).filter(i => i !== pbnr)];
  const contributionsString = order.map(i => contributions[i]).join(' $$ ');
  const deductionsString = order.map(i => deductions[i].reduce((sum, d) => sum + d, 0)).join(' $$ ');
  return `${contributionsString} && ${deductionsString}`;
}