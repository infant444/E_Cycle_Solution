"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var error_handler_1 = require("./middleware/error.handler");
var user_router_1 = __importDefault(require("./router/user.router"));
var table_router_1 = __importDefault(require("./router/table.router"));
var client_router_1 = __importDefault(require("./router/client.router"));
var project_router_1 = __importDefault(require("./router/project.router"));
var path_1 = __importDefault(require("path"));
// config
dotenv_1.default.config();
var port = process.env.PORT || 5000;
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use(express_1.default.json());
// router   http://localhost:5000/api/client/addClient
app.use("/api/table", table_router_1.default);
app.use("/api/client", client_router_1.default);
app.use("/api/user", user_router_1.default);
app.use("/api/project", project_router_1.default);
// middleware
app.use(error_handler_1.errorHandler);
app.use(express_1.default.static('public/browser'));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'browser', 'index.html'));
});
// listen
app.listen(port, function () {
    console.log("http://localhost:" + port);
});
