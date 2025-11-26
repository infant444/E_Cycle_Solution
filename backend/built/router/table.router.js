"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var postgersql_config_1 = require("../config/postgersql.config");
var rout = (0, express_1.Router)();
rout.get("/client", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postgersql_config_1.pool.query("CREATE TABLE IF NOT EXISTS client(\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    name TEXT NOT NULL,\n    email TEXT NOT NULL UNIQUE,\n    type TEXT NOT NULL,\n    contactNumber VARCHAR(15) UNIQUE,\n    address TEXT,\n    noProject NUMERIC,\n    isCurrentProject BOOLEAN,\n    currentProject TEXT,\n    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP \n)")];
            case 1:
                _a.sent();
                res.json({ status: "success" });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.get("/project", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, postgersql_config_1.pool.query("CREATE TYPE project_type AS ENUM('completed','processed','pending','accepted');")];
            case 1:
                _a.sent();
                return [4 /*yield*/, postgersql_config_1.pool.query("CREATE TABLE IF NOT EXISTS project (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),\n    projectName Text NOT NULL,\n    client_id UUID,\n    startDate DATE,\n    status project_type,\n    level_complete NUMERIC,\n    noTask NUMERIC,\n    completedTask NUMERIC,\n    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (client_id) REFERENCES client(id)\n\n);")];
            case 2:
                _a.sent();
                res.json({ status: "success" });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
rout.get("/task", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                //       await pool.query(`  CREATE TYPE IF NOT EXISTS task_type AS ENUM (
                //     'completed',
                //     'processed',
                //     'pending',
                //     'accepted'
                //   );`);
                return [4 /*yield*/, postgersql_config_1.pool.query("CREATE TABLE IF NOT EXISTS task(\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),\n    task TEXT NOT NULL,\n    project UUID,\n    projectName TEXT,\n    status task_type,\n    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (project) REFERENCES project(id) ON DELETE CASCADE\n);")];
            case 1:
                //       await pool.query(`  CREATE TYPE IF NOT EXISTS task_type AS ENUM (
                //     'completed',
                //     'processed',
                //     'pending',
                //     'accepted'
                //   );`);
                _a.sent();
                res.json({ status: "success" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.get("/timeSheet", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postgersql_config_1.pool.query("CREATE TABLE IF NOT EXISTS timeSheet(\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),\n    staff UUID NOT NULL,\n    task UUID NOT NULL,\n    project UUID NOT NULL,\n    taskName TEXT NOT NULL,\n    projectName TEXT NOT NULL,\n    description TEXT,\n    date DATE,\n    startTime TIME,\n    endTime TIME,\n    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (project) REFERENCES project(id),\n    FOREIGN KEY (staff) REFERENCES staff(id),\n    FOREIGN KEY (task) REFERENCES task(id)\n);")];
            case 1:
                _a.sent();
                res.json({ status: "success" });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
exports.default = rout;
