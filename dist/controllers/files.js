"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.uploadFile = exports.generateToken = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const file_type_1 = __importDefault(require("file-type"));
const config_1 = __importDefault(require("../config"));
const { tokenValidFor, filesFolder } = config_1.default;
const generateToken = (req, res, next) => {
    try {
        const mimeType = req.query.mimeType;
        // Check mimeType in request
        if (!mimeType) {
            return res.status(422).json({
                error: "Please, add a mimeType to the request.",
            });
        }
        // Create token
        const fileData = {
            mimeType,
            createdAt: Date.now(),
        };
        const buffer = Buffer.from(JSON.stringify(fileData));
        const token = buffer.toString("base64");
        // Send token in response
        res.json({ token });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
};
exports.generateToken = generateToken;
const uploadFile = async (req, res, next) => {
    try {
        // Check file in request
        if (!req.file) {
            return res.status(422).json({
                error: "Please, add a file to upload.",
            });
        }
        // Check token in request
        if (!req.body.token) {
            return res.status(422).json({
                error: "Please, add a token to your request.",
            });
        }
        // Decode token
        const { token } = req.body;
        const buffer = Buffer.from(token, "base64");
        const fileData = JSON.parse(buffer.toString("ascii"));
        // Check if token has expired
        const seconds = (Date.now() - fileData.createdAt) / 1000;
        if (seconds > tokenValidFor) {
            return res.status(401).json({
                error: "Your token expired. Please, generate another one.",
            });
        }
        // Check if file mimeType matches token
        const fileTypeResult = await file_type_1.default.fromBuffer(req.file.buffer);
        if (fileTypeResult?.mime !== fileData.mimeType) {
            return res.status(401).json({
                error: "Invalid mimeType: your file and token mimeTypes do not match.",
            });
        }
        // Save file in server folder
        const extension = fileTypeResult?.ext ? `.${fileTypeResult.ext}` : "";
        const fileName = `${Date.now()}${extension}`;
        const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
        const filePath = `${filesFolder}/${fileName}`;
        await writeFile(filePath, req.file.buffer);
        // Create file url and send it in response
        const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;
        res.json({ url });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
};
exports.uploadFile = uploadFile;
const getFile = (req, res, next) => {
    try {
        const filePath = `${filesFolder}/${req.params.filename}`;
        // If file doesn't exist, send 404 response
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).send("File not found.");
        }
        // Send file to client
        const options = {
            root: `${__dirname}/../../`,
        };
        res.sendFile(filePath, options);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
};
exports.getFile = getFile;
