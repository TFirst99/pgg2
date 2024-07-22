const pool = require('../config/database');

exports.getCurrentRound = async (grp, pbnr) => {
    const [rows] = await pool.query(
        'SELECT MAX(round) as round FROM hce_behavior WHERE grp = ? AND pbnr = ?',
        [grp, pbnr]
    );
    return rows[0].round || 0;
};

exports.getToday = async (grp, pbnr, round, type) => {
    if (round === 1 && type === 'contribution') {
        return new Date().toISOString().replace(/[-T:Z]/g, '').slice(0, 14);
    } else {
        const [rows] = await pool.query(
            'SELECT date FROM hce_behavior WHERE grp = ? AND pbnr = ? LIMIT 1',
            [grp, pbnr]
        );
        return rows[0]?.date || new Date().toISOString().replace(/[-T:Z]/g, '').slice(0, 14);
    }
};

exports.adjustEffectivenessValues = (body, pbnr) => {
    const { e1, e2, e3, e4, e5 } = body;
    const values = [e1, e2, e3, e4, e5];
    return values.slice(pbnr - 1).concat(values.slice(0, pbnr - 1));
};

exports.adjustDeductionValues = (body, pbnr) => {
    const { ded1, ded2, ded3, ded4, ded5 } = body;
    const values = [ded1, ded2, ded3, ded4, ded5];
    return values.slice(pbnr - 1).concat(values.slice(0, pbnr - 1));
};

exports.checkPreviousDeductions = async (grp, round, members) => {
    const prevRound = round - 1;
    const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM hce_behavior WHERE grp = ? AND type = "deduction" AND round = ?',
        [grp, prevRound]
    );
    return rows[0].count === members || round === 1 || round === 2;
};

exports.checkPreviousEffectiveness = async (grp, round, members) => {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND round = ?',
        [grp, round]
    );
    return rows[0].count === members || round === 1 || round === 2;
};

exports.checkPreviousContributions = async (grp, round, members) => {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM hce_behavior WHERE grp = ? AND type = "contribution" AND round = ?',
        [grp, round]
    );
    return rows[0].count === members;
};

exports.getEffectiveness = async (grp, round, pbnr) => {
    const [rows] = await pool.query(
        'SELECT p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND round = ?',
        [grp, round]
    );
    const total = rows.reduce((sum, row) => sum.map((v, i) => v + row[`p${i+1}`]), [0, 0, 0, 0, 0]);
    const [playerRow] = await pool.query(
        'SELECT p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND round = ? AND pbnr = ?',
        [grp, round, pbnr]
    );
    return { total, player: playerRow[0] };
};

exports.getContributions = async (grp, round, pbnr) => {
    const [rows] = await pool.query(
        'SELECT pbnr, p1 as contribution FROM hce_behavior WHERE grp = ? AND type = "contribution" AND round = ?',
        [grp, round]
    );
    return rows.map(row => row.contribution);
};

exports.getDeductions = async (grp, round, pbnr) => {
    const [rows] = await pool.query(
        'SELECT pbnr, p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "deduction" AND round = ?',
        [grp, round]
    );
    return rows.map(row => [row.p1, row.p2, row.p3, row.p4, row.p5]);
};

exports.calculatePayoffs = (contributions, effectiveness, deductions, conTot, MUs) => {
    // Implement the payoff calculation logic here
    // This will be a complex function based on the original PHP logic
};

exports.updatePayments = async (grp, payoffs) => {
    const [existingPayment] = await pool.query(
        'SELECT * FROM hce_payment WHERE grp = ?',
        [grp]
    );

    if (existingPayment.length === 0) {
        await pool.query(
            'INSERT INTO hce_payment VALUES (?, ?, ?, ?, ?, ?)',
            [grp, ...payoffs]
        );
    } else {
        const updatedPayoffs = payoffs.map((p, i) => p + existingPayment[0][`p${i+1}`]);
        await pool.query(
            'UPDATE hce_payment SET p1 = ?, p2 = ?, p3 = ?, p4 = ?, p5 = ? WHERE grp = ?',
            [...updatedPayoffs, grp]
        );
    }
};

exports.formatEarningsResult = (contributions, deductions, pbnr) => {
    const formattedContributions = contributions.slice(pbnr - 1).concat(contributions.slice(0, pbnr - 1));
    const formattedDeductions = deductions[pbnr - 1].slice(pbnr - 1).concat(deductions[pbnr - 1].slice(0, pbnr - 1));
    return formattedContributions.join(' $$ ') + ' && ' + formattedDeductions.join(' $$ ');
};

exports.getPowerReceived = async (grp, pbnr) => {
    const [rows] = await pool.query(
        'SELECT p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND pbnr != ?',
        [grp, pbnr]
    );
    return rows.some(row => row[`p${pbnr}`] !== 0) ? 1 : 0;
};

exports.getPowerTransferred = async (grp, pbnr) => {
    const [rows] = await pool.query(
        'SELECT p1, p2, p3, p4, p5 FROM hce_behavior WHERE grp = ? AND type = "effectiveness" AND pbnr = ?',
        [grp, pbnr]
    );
    return Object.values(rows[0]).some(v => v !== 0) ? 1 : 0;
};

exports.getEarnings = async (grp, pbnr) => {
    const [rows] = await pool.query(
        'SELECT p1, p2, p3, p4, p5 FROM hce_payment WHERE grp = ?',
        [grp]
    );
    return rows[0][`p${pbnr}`];
};

exports.getCurrentRound = async (grp, pbnr) => {
    const [rows] = await pool.query(
        'SELECT MAX(round) as round FROM hce_behavior WHERE grp = ? AND pbnr = ?',
        [grp, pbnr]
    );
    return rows[0].round || 0;
};