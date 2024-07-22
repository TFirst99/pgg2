const pool = require('../../config/database');
const getRound = require('../utils/getRound');

const MEMBERS = 5;

exports.addBehavior = async (req, res) => {
  const { type, grp, pbnr, RT, errors } = req.body;
  let round = await getRound(grp, pbnr);

  try {
    const connection = await pool.getConnection();

    if (type === 'effectiveness') {
      round += 1;
      const values = getEffectivenessValues(pbnr, req.body);
      await insertBehavior(connection, grp, type, pbnr, values, round, RT, errors);
    } else if (type === 'contribution') {
      if (round === 0 || round === 1) {
        round += 1;
      }
      const contr = req.body.contr;
      await insertBehavior(connection, grp, type, pbnr, [contr, 0, 0, 0, 0], round, RT, errors);
    } else if (type === 'deduction') {
      const values = getDeductionValues(pbnr, req.body);
      await insertBehavior(connection, grp, type, pbnr, values, round, RT, errors);
    }

    connection.release();
    res.status(200).json({ message: 'Behavior added successfully' });
  } catch (error) {
    console.error('Error adding behavior:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function getEffectivenessValues(pbnr, body) {
  const { e1, e2, e3, e4, e5 } = body;
  const values = [e1, e2, e3, e4, e5];
  return values.slice(pbnr - 1).concat(values.slice(0, pbnr - 1));
}

function getDeductionValues(pbnr, body) {
  const { ded1, ded2, ded3, ded4, ded5 } = body;
  const values = [ded1, ded2, ded3, ded4, ded5];
  return values.slice(pbnr - 1).concat(values.slice(0, pbnr - 1));
}

async function insertBehavior(connection, grp, type, pbnr, values, round, RT, errors) {
  const [p1, p2, p3, p4, p5] = values;
  const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  
  const query = 'INSERT INTO hce_behavior VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  await connection.query(query, [grp, type, pbnr, p1, p2, p3, p4, p5, round, RT, errors, today]);
}