"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const files_1 = __importDefault(require("./routes/files"));
const { port, bodySizeLimit, filesFolder } = config_1.default;
const app = (0, express_1.default)();
// Cors middleware
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// Body parser, reading data from body into req.body
app.use(express_1.default.json({ limit: bodySizeLimit }));
app.use(express_1.default.urlencoded({ extended: true, limit: bodySizeLimit }));
app.use("/files", files_1.default);
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
    // Create files folder if it doesn't exist
    if (!fs_1.default.existsSync(filesFolder)) {
        fs_1.default.mkdirSync(filesFolder);
    }
});
