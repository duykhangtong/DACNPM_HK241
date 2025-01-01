const db = require('../models/index');
const User = db.user;
const Client = db.client;
const Spso = db.spso;

const getClientInfo = async (req, res, next) => {
    try {
        const client = await Client.findById(req.role);
        const user = await User.findOne({ role: req.role });
        const data = {
            full_name: client.full_name,
            number_page: client.number_page,
            last_login: client.last_login,
            email: user.email
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }

}

const updateNumberPage = async (req, res, next) => {
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
        next(error);
    }
}

const getAllClient = async (req, res, next) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAdminInfo = (req, res) => {
    Spso.findById(req.role)
        .then(spso => res.status(200).json(spso))
        .catch(error => console.error(error));
}

module.exports = { getClientInfo, getAdminInfo, updateNumberPage, getAllClient };