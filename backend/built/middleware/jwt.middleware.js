"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateUserToken = function (user) {
    var token = jsonwebtoken_1.default.sign({
        id: user.id, email: user.email, name: user.name
    }, process.env.JWT_USER_AUTH, {
        expiresIn: "1000d"
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        dob: user.dob,
        contact: user.contact,
        role: user.role,
        isLogin: true,
        token: token,
    };
};
exports.generateUserToken = generateUserToken;
