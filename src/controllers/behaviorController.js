const pool = require('../config/database');
const gameLogic = require('../utils/gameLogic');

exports.addBehavior = async (req, res) => {
    const { type, grp, pbnr, RT, errors } = req.body;
    const members = 5;
    let round = await gameLogic.getCurrentRound(grp, pbnr);
    let today = await gameLogic.getToday(grp, pbnr, round, type);

    try {
        if (type === 'effectiveness') {
            round += 1;
            const values = gameLogic.adjustEffectivenessValues(req.body, pbnr);
            const checkResult = await gameLogic.checkPreviousDeductions(grp, round, members);
            
            if (checkResult) {
                await pool.query(
                    'INSERT INTO hce_behavior VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [grp, type, pbnr, ...values, round, RT, errors, today]
                );
            }
        } else if (type === 'contribution') {
            if (round === 0 || round === 1) {
                round += 1;
            }
            const { contr } = req.body;
            const checkResult = await gameLogic.checkPreviousEffectiveness(grp, round, members);
            
            if (checkResult) {
                await pool.query(
                    'INSERT INTO hce_behavior VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [grp, type, pbnr, contr, 0, 0, 0, 0, round, RT, errors, today]
                );
            }
        } else if (type === 'deduction') {
            const values = gameLogic.adjustDeductionValues(req.body, pbnr);
            const checkResult = await gameLogic.checkPreviousContributions(grp, round, members);
            
            if (checkResult) {
                await pool.query(
                    'INSERT INTO hce_behavior VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [grp, type, pbnr, ...values, round, RT, errors, today]
                );
            }
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding behavior:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBehavior = async (req, res) => {
    const { type, grp, pbnr, round } = req.query;
    
    try {
        let result;
        if (type === 'effectiveness') {
            result = await gameLogic.getEffectiveness(grp, round, pbnr);
        } else if (type === 'contribution') {
            result = await gameLogic.getContributions(grp, round, pbnr);
        } else if (type === 'deduction') {
            result = await gameLogic.getDeductions(grp, round, pbnr);
        }
        res.json(result);
    } catch (error) {
        console.error('Error getting behavior:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCurrentRound = async (req, res) => {
    const { grp, pbnr } = req.query;
    
    try {
        const round = await gameLogic.getCurrentRound(grp, pbnr);
        res.json({ round });
    } catch (error) {
        console.error('Error getting current round:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};