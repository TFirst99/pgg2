const pool = require('../config/database');

exports.updateStatus = async (req, res) => {
  const { group, stage, change, pbnr } = req.body;
  const grp = group;

  try {
    if (change === 'change') {
      await pool.query(
        `UPDATE hce_ready SET p${pbnr} = ? WHERE grp = ?`,
        [stage, grp]
      );
      res.json({ status: 'updated' });
    } else {
      let st = stage;
      if (stage === 'contribution_feedback') st = 'contribution';
      else if (stage === 'deduction_feedback') st = 'deduction';
      else if (stage === 'effectiveness_feedback') st = 'effectiveness';

      const [rows] = await pool.query(
        'SELECT * FROM hce_behavior WHERE grp = ? AND type = ? AND round = (SELECT MAX(round) FROM hce_behavior WHERE grp = ? AND pbnr = ?)',
        [grp, st, grp, pbnr]
      );

      const status = rows.length === 5 ? 'ready' : 'waiting';
      res.json({ status });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};