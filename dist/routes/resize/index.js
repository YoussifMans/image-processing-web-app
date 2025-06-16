"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var galleryPath = path_1.default.join(__dirname, '../../../public/gallery/uploaded/');
var savePath = path_1.default.join(__dirname, '../../../public/gallery/resized/');
function fileExists(filename) {
    return (0, fs_1.existsSync)(path_1.default.join(savePath, filename));
}
var resizeRouter = (0, express_1.Router)();
resizeRouter.use((0, express_1.urlencoded)({ extended: true }));
resizeRouter.get('/', function (req, res) {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});
resizeRouter.post('/', function (req, res) {
    var fileBuffer = (0, fs_1.readFileSync)(path_1.default.join(galleryPath, req.body.fileName)).buffer;
    if (!req.body.fileName ||
        !req.body.image ||
        !req.body.width ||
        !req.body.height) {
        res.status(400).send('Missing Parameters');
        return;
    }
    if (fileExists(req.body.fileName)) {
        res.status(400).send(path_1.default.join("http://localhost:3000/gallery/resized/".concat(req.body.fileName)));
        return;
    }
    (0, fs_1.writeFileSync)(path_1.default.join(savePath, req.body.fileName), '', 'utf8');
    (0, sharp_1.default)(fileBuffer)
        .resize(parseInt(req.body.width), parseInt(req.body.height))
        .toFile(path_1.default.join(savePath, req.body.fileName));
    console.log(req.body);
    res.send(path_1.default.join(savePath, req.body.fileName));
    return;
});
exports.default = resizeRouter;
