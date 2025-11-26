"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    if (!token) {
        return res.status(500).send('login the user');
    }
    try {
        var decoderedUser = (0, jsonwebtoken_1.verify)(token, process.env.JWT_USER_AUTH);
        req.user = decoderedUser;
    }
    catch (error) {
        res.status(500).send(error);
    }
    return next();
});
