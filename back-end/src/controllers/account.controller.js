const db = require('../models/index');
const Client = db.client;
const Spso = db.spso;

const getClientInfo = (req, res) => {
    Client.findById(req.role)
        .then(client => res.status(200).json(client))
        .catch(error => console.error(error));
}

const getAdminInfo = (req, res) => {
    Spso.findById(req.role)
        .then(spso => res.status(200).json(spso))
        .catch(error => console.error(error));
}

module.exports = { getClientInfo, getAdminInfo };