"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs/promises"));
var galleryPath = path_1.default.join(__dirname, '../../../public/gallery/uploaded/');
var savePath = path_1.default.join(__dirname, '../../../public/gallery/resized/');
function fileExists(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.access(path_1.default.join(savePath, filename))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _a.sent();
                    console.log('File does not exist or access is denied');
                    console.log('More detailed error log:\n', err_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var resizeRouter = (0, express_1.Router)();
resizeRouter.use((0, express_1.urlencoded)({ extended: true, type: 'application/x-www-form-urlencoded' }));
resizeRouter.use('/', function (req, res, next) {
    console.log("".concat(req.method, " ").concat(req.originalUrl));
    next();
});
resizeRouter.get('/', function (req, res) {
    res.status(404).send('Cannot GET /resize. Please try another endpoint');
});
resizeRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, image, fileName, width, height, fileBuffer;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, image = _a.image, fileName = _a.fileName, width = _a.width, height = _a.height;
                console.log('Checking parameters');
                if (!image || !fileName || !width || !height) {
                    res.status(400).send('Missing or deformed parameters.');
                    return [2 /*return*/];
                }
                console.log('checking if file exists');
                return [4 /*yield*/, fileExists(fileName)];
            case 1:
                if (_b.sent()) {
                    res.send(path_1.default.join(savePath, fileName));
                    return [2 /*return*/];
                }
                console.log('creating buffer');
                return [4 /*yield*/, fs.readFile(path_1.default.join(galleryPath, fileName))];
            case 2:
                fileBuffer = _b.sent();
                console.log('sharp magic');
                return [4 /*yield*/, (0, sharp_1.default)(fileBuffer)
                        .resize({ width: parseInt(width), height: parseInt(req.body.height) })
                        .toFile(path_1.default.join(savePath, fileName))];
            case 3:
                _b.sent();
                console.log('sending response');
                res.send("http://localhost:3000/gallery/resized/".concat(fileName));
                return [2 /*return*/];
        }
    });
}); });
exports.default = resizeRouter;
