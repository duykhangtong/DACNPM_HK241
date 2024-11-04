require('dotenv').config();
const mongoose = require('mongoose');
const uri = "mongodb+srv://khangtong1124:A48HzE1AJhR13ZCW@cluster0.46bzt.mongodb.net/SSPS?retryWrites=true&w=majority&appName=SSPS";

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('CONNECT SUCCESS!!!');
    } catch (error) {
        console.log('Fail!!!');
    }
}

module.exports = connectDB;