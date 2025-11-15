"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTasks = exports.putTasks = exports.postTasks = exports.getTasks = void 0;
const db_config_1 = __importDefault(require("../../config/db_config"));
const getTasks = async (user_id, id) => {
    var sql;
    if (id) {
        sql = `SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at FROM tasks WHERE guest_user_id="${user_id}" AND tasks.id="${id}"`;
    }
    else {
        sql = `SELECT *, DATE_FORMAT(created_at, '%d %b %Y') AS created_at, DATE_FORMAT(updated_at, '%d %b %Y') AS updated_at FROM tasks WHERE guest_user_id="${user_id}"`;
    }
    const [rows] = await db_config_1.default.query(sql);
    return rows;
};
exports.getTasks = getTasks;
const postTasks = async (id, { name, description }) => {
    let sql = `INSERT INTO tasks (name, description, guest_user_id) VALUES (?, ?, ?)`;
    let params = [name, description, id];
    const [rows] = await db_config_1.default.query(sql, params);
    return rows;
};
exports.postTasks = postTasks;
const putTasks = async ({ name, description, status, id }) => {
    let keys = "";
    let params = [];
    if (name) {
        keys += "name=?,";
        params.push(name);
    }
    ;
    if (description) {
        if (description && status) {
            keys += "description=?,";
            params.push(description);
        }
        else {
            keys += "description=?";
            params.push(description);
        }
    }
    if (status) {
        keys += "status=?";
        params.push(status);
    }
    params.push(id);
    const sql = `UPDATE tasks SET ${keys} WHERE id = ?`;
    console.log(sql, params);
    const [rows] = await db_config_1.default.query(sql, params);
    return rows;
};
exports.putTasks = putTasks;
const deleteTasks = async (id) => {
    const [rows] = await db_config_1.default.query("DELETE FROM tasks WHERE id=?", [id]);
    return rows;
};
exports.deleteTasks = deleteTasks;
