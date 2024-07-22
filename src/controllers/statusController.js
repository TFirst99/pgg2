const pool = require('../config/database');
const gameLogic = require('../utils/gameLogic');

exports.updateStatus = async (req, res) => {
    const { group, stage, change, pbnr } = req.body;
    const members = 5;

    let st;
    if (stage === 'contribution_feedback') {
        st = 'contribution';
    } else if (stage === 'deduction_feedback') {
        st = 'deduction';
    } else if (stage === 'effectiveness_feedback') {
        st = 'effectiveness';
    }

    try {
        if (change === 'change') {
            await pool.query(
                `UPDATE hce_ready SET p${pbnr} = ? WHERE grp = ?`,
                [stage, group]
            );
            res.json({ success: true });
        } else {
            const round = await gameLogic.getCurrentRound(group, pbnr);
            const [rows] = await pool.query(
                'SELECT COUNT(*) as count FROM hce_behavior WHERE grp = ? AND type = ? AND round = ?',
                [group, st, round]
            );

            const status = rows[0].count === members ? 'ready' : 'waiting';
            res.json({ status });
        }
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};