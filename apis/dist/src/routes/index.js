"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_router_1 = __importDefault(require("../features/tasks/tasks.router"));
const auth_router_1 = __importDefault(require("../features/auth/auth.router"));
function RoutesList(app) {
    app.use("/", tasks_router_1.default);
    app.use("/auth", auth_router_1.default);
}
exports.default = RoutesList;
