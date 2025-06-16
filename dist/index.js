"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var upload_1 = __importDefault(require("./routes/upload"));
var resize_1 = __importDefault(require("./routes/resize"));
// Initializing constants
var app = (0, express_1.default)();
var port = 3000;
// CORS Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
// GET / and POST / requests (not to be used)
app.get('/', function (req, res) {
    res.status(404).send('Cannot GET /. Please try /gallery or /resize');
});
app.post('/', function (req, res) {
    res.status(404).send('Cannot POST /. Please try /gallery or /resize');
});
// Routers
//   Upload Router
app.use('/upload', upload_1.default);
//   Resize Router
app.use('/resize', resize_1.default);
// Starting server
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
exports.default = app;
