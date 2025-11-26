"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err);
    var status = err.status || 500;
    var message = err.message || 'Internal Server Error';
    res.status(status).json({
        success: false,
        message: message,
    });
}
