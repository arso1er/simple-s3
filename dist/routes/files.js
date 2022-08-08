"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const files_1 = require("../controllers/files");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.get("/token", files_1.generateToken);
router.put("/upload", upload.single("file"), files_1.uploadFile);
router.get("/:filename", files_1.getFile);
exports.default = router;
