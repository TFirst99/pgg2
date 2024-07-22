const pool = require('../../config/database');
const getRound = require('../utils/getRound');

const MEMBERS = 5;

exports.getRound = async (req, res) => {
  const { grp, pbnr } = req.body;

  try {
    const round = await getRound(grp, pbnr);
    res.status(200).json({ round });
  } catch (error) {
    console.error('Error getting round:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRedirect = async (req, res) => {
  const { group: grp, pbnr } = req.body;

  try {
    const connection = await pool.getConnection();
    let round = await getRound(grp, pbnr);

    if (round === 1) {
      const [rows] = await connection.query(
        'SELECT * FROM hce_behavior WHERE grp = ? AND type = "contribution" AND round = ?',
        [grp, round]
      );
      if (rows.length === MEMBERS) {
        round += 1;
      }
    }

    let stage = 'contribution';
    let stage2 = '';

    if (round > 2) {
      stage = 'effectiveness';
      const [effectivenessCheck] = await connection.query(
        'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ? AND pbnr = ?',
        [grp, stage, round, pbnr]
      );
      if (effectivenessCheck.length === 1) {
        stage2 = 'effectiveness_feedback';
      }
    }

    const [contributionCheck] = await connection.query(
      'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ?',
      [grp, 'contribution', round]
    );

    if (contributionCheck.length === MEMBERS) {
      stage = 'contribution';
      stage2 = '';
      const [playerContributionCheck] = await connection.query(
        'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ? AND pbnr = ?',
        [grp, 'contribution', round, pbnr]
      );
      if (playerContributionCheck.length === 1) {
        stage2 = 'contribution_feedback';
      }
    }

    if (round < 3) {
      stage = 'contribution';
      stage2 = '';
      const [playerContributionCheck] = await connection.query(
        'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ? AND pbnr = ?',
        [grp, 'contribution', round, pbnr]
      );
      if (playerContributionCheck.length === 1) {
        stage2 = 'contribution_feedback';
      }
    }

    if (round > 1) {
      const [deductionCheck] = await connection.query(
        'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ?',
        [grp, stage, round]
      );
      if (deductionCheck.length === MEMBERS) {
        stage = 'deduction';
        stage2 = '';
        const [playerDeductionCheck] = await connection.query(
          'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = ? AND pbnr = ?',
          [grp, 'deduction', round, pbnr]
        );
        if (playerDeductionCheck.length === 1) {
          stage2 = 'deduction_feedback';
        }
      }
    }

    connection.release();
    res.status(200).json({ stage: stage2 || stage });
  } catch (error) {
    console.error('Error in getRedirect:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};