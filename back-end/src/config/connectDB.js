require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.URI;

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('CONNECT SUCCESS!!!');
    } catch (error) {
        console.log('Fail!!!');
    }
}

module.exports = connectDB;