const pool = require('../config/database');
const gameLogic = require('../utils/gameLogic');

exports.getFinalStats = async (req, res) => {
    const { grp, pbnr } = req.query;

    try {
        const today = await gameLogic.getToday(grp, pbnr);
        const received = await gameLogic.getPowerReceived(grp, pbnr);
        const transferred = await gameLogic.getPowerTransferred(grp, pbnr);
        const earnings = await gameLogic.getEarnings(grp, pbnr);

        res.json({
            received,
            transferred,
            earnings,
            today
        });
    } catch (error) {
        console.error('Error getting final stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};