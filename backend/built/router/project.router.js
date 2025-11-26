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
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var rout = (0, express_1.Router)();
rout.use(auth_middleware_1.default);
rout.post("/add", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, project_name, client_id, start_date, project, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, project_name = _a.project_name, client_id = _a.client_id, start_date = _a.start_date;
                return [4 /*yield*/, postgersql_config_1.pool.query("insert into project (project_name,client_id,start_date,status,level_complete,no_task,complete_task) values ($1,$2,$3,$4,$5,$6,$7) returning *", [project_name, client_id, start_date, "pending", 0, 0, 0])];
            case 1:
                project = _b.sent();
                res.json(project.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.get("/getall", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var projects, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postgersql_config_1.pool.query("select * from project")];
            case 1:
                projects = _a.sent();
                res.send(projects.rows);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.get("/get/:id", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var project, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postgersql_config_1.pool.query("select * from project where id=$1", [req.params.id])];
            case 1:
                project = _a.sent();
                res.send(project.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.get("/task/add", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, task, description, project, staff, project_name, priority, due, tasks, project_data, task_count, complete_task, score, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, task = _a.task, description = _a.description, project = _a.project, staff = _a.staff, project_name = _a.project_name, priority = _a.priority, due = _a.due;
                return [4 /*yield*/, postgersql_config_1.pool.query("insert into task (task,description,project,staff,project_name,priority,due) values ($1,$2,$3,$4,$5,$6,$7) returning * ", [task, description, project, staff, project_name, priority, due])];
            case 1:
                tasks = _b.sent();
                return [4 /*yield*/, postgersql_config_1.pool.query("select * from project where id=$1", [project])];
            case 2:
                project_data = _b.sent();
                task_count = parseInt(project_data.rows[0].no_task) + 1;
                complete_task = parseInt(project_data.rows[0].complete_task);
                score = (complete_task / task_count) * 100;
                return [4 /*yield*/, postgersql_config_1.pool.query("update project set no_task=$1,complete_task=$2,level_complete=$3 where id=$4 ", [task_count, complete_task, score, project])];
            case 3:
                _b.sent();
                res.send(task);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
rout.get("/task/getall/:projectid", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postgersql_config_1.pool.query("select * from task where project=$1", [req.params.projectid])];
            case 1:
                tasks = _a.sent();
                res.send(tasks.rows);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                next(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.get("/task/get/:id", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var task, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postgersql_config_1.pool.query("select * from task where id=$1", [req.params.id])];
            case 1:
                task = _a.sent();
                res.send(task.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
rout.put("/task/status/update/:taskId", (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var task, project_data, task_count, complete_task, score, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, postgersql_config_1.pool.query("UPDATE task SET status=$1 WHERE id=$2 RETURNING id", [req.body.status, req.params.taskId])];
            case 1:
                task = _a.sent();
                if (!(req.body.status === "completed")) return [3 /*break*/, 6];
                return [4 /*yield*/, postgersql_config_1.pool.query("select * from project where id=$1", [task.rows[0].project])];
            case 2:
                project_data = _a.sent();
                task_count = parseInt(project_data.rows[0].no_task);
                complete_task = parseInt(project_data.rows[0].complete_task) + 1;
                score = (complete_task / task_count) * 100;
                if (!(score == 100)) return [3 /*break*/, 4];
                return [4 /*yield*/, postgersql_config_1.pool.query("update project set no_task=$1,complete_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "completed", task.rows[0].project])];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, postgersql_config_1.pool.query("update project set no_task=$1,complete_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "processed", task.rows[0].project])];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                res.send(task.rows[0]);
                return [3 /*break*/, 8];
            case 7:
                e_5 = _a.sent();
                next(e_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); }));
exports.default = rout;
