const reportService = require('../services/report.service');

const report = async (req, res, next) => {
    const { month, year } = req.body;
    const data = await reportService.report(month, year);
    res.status(200).json(data);
}

module.exports = { report };