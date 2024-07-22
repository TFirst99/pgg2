const pool = require('../config/database');
const gameLogic = require('../utils/gameLogic');

exports.calculateEarnings = async (req, res) => {
    const { grp, pbnr, multiplier } = req.body;
    const MUs = 20;

    try {
        const round = await gameLogic.getCurrentRound(grp, pbnr);
        const contributions = await gameLogic.getContributions(grp, round);
        const effectiveness = await gameLogic.getEffectiveness(grp, round);
        const deductions = await gameLogic.getDeductions(grp, round);

        const totalContribution = contributions.reduce((sum, c) => sum + c, 0);
        const conTot = totalContribution * multiplier;

        const payoffs = gameLogic.calculatePayoffs(contributions, effectiveness, deductions, conTot, MUs);

        if (pbnr === 1) {
            await gameLogic.updatePayments(grp, payoffs);
        }

        const formattedResult = gameLogic.formatEarningsResult(contributions, deductions, pbnr);
        res.json(formattedResult);
    } catch (error) {
        console.error('Error calculating earnings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};