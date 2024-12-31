const db = require('../models/index');
const Client = db.client;
const Spso = db.spso;

const getClientInfo = (req, res) => {
    Client.findById(req.role)
        .then(client => res.status(200).json(client))
        .catch(error => console.error(error));
}

const updateNumberPage = async (req, res) => {
    try {
        const { total_print_pages } = req.body;
        const client_id = req.role;
        await Client.findByIdAndUpdate(
            client_id,
            { $inc: { number_page: -total_print_pages } }
        );
        res.json({ 'message': 'update successfully!!' });
    } catch (error) {
        console.error(error);
    }
}

const getAllClient = async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        console.error(error);
    }
}

const getAdminInfo = (req, res) => {
    Spso.findById(req.role)
        .then(spso => res.status(200).json(spso))
        .catch(error => console.error(error));
}

module.exports = { getClientInfo, getAdminInfo, updateNumberPage, getAllClient };