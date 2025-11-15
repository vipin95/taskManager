"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// First load the enviorment before anything
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV;
const envPath = path_1.default.resolve(process.cwd(), `.env.${env}`);
dotenv_1.default.config({ path: envPath });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./src/routes/index"));
const google_SSO_1 = __importDefault(require("./src/config/google_SSO"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4001; // Port Define
app.use(google_SSO_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
// Calling methods that registring routes as middleware
app.use(express_1.default.json());
(0, index_1.default)(app); // Registring all the routes here
// Global Error handler middleware
app.use((err, req, res, next) => {
    console.log("Error", err);
    res.status(500).json({
        "Message": "Internal server Error",
        "Error": err.message
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT} In ${process.env.NODE_ENV}`);
});
