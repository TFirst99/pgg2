const pool = require('../../config/database');
const getRound = require('../utils/getRound');

const MEMBERS = 5;

exports.getStatus = async (req, res) => {
  const { group: grp, stage, change, pbnr } = req.body;

  try {
    const connection = await pool.getConnection();
    const round = await getRound(grp, pbnr);

    let status;
    if (change === 'change') {
      await updateReadyStatus(connection, grp, pbnr, stage);
      status = 'updated';
    } else {
      status = await checkStatus(connection, grp, stage, round);
    }

    connection.release();
    res.status(200).json({ status });
  } catch (error) {
    console.error('Error in getStatus:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function updateReadyStatus(connection, grp, pbnr, stage) {
  await connection.query(
    'UPDATE hce_ready SET ?? = ? WHERE grp = ?',
    [`p${pbnr}`, stage, grp]
  );
}

async function checkStatus(connection, grp, stage, round) {
  const type = getTypeFromStage(stage);
  const [rows] = await connection.query(
    'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ?',
    [grp, type, round]
  );

  return rows.length === MEMBERS ? 'ready' : 'waiting';
}

function getTypeFromStage(stage) {
  switch (stage) {
    case 'contribution_feedback':
      return 'contribution';
    case 'deduction_feedback':
      return 'deduction';
    case 'effectiveness_feedback':
      return 'effectiveness';
    default:
      return stage;
  }
}