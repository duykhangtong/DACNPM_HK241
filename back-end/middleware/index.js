const express = require('express');
const cors = require('cors');

middleWare = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:8081" }));
}

module.exports = middleWare;