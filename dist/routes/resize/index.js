"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var multer_1 = __importDefault(require("multer"));
var savePath = path_1.default.join(__dirname, '../../../public/gallery/resized/');
function fileExists(filename) {
    return (0, fs_1.existsSync)(path_1.default.join(savePath, filename));
}
var resizeRouter = (0, express_1.Router)();
resizeRouter.get('/', function (req, res) {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});
var upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
resizeRouter.post('/', upload.single('image'), function (req, res) {
    var file = req.file;
    if (!file) {
        res.status(400).send('No file uploaded.');
    }
    if (fileExists(file.filename)) {
        res.send(path_1.default.join("http://localhost:3000/gallery/resized/".concat(file.filename)));
    }
    (0, sharp_1.default)(file.buffer)
        .resize(req.body.width, req.body.height)
        .toFile(path_1.default.join(savePath, file.filename));
    res.send(path_1.default.join("http://localhost:3000/gallery/resized/".concat(file.filename)));
});
exports.default = resizeRouter;
