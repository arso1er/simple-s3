import { Router } from "express";
import multer from "multer";

import { generateToken, uploadFile, getFile } from "../controllers/files";

const router = Router();
const upload = multer();

router.get("/token", generateToken);
router.put("/upload", upload.single("file"), uploadFile);
router.get("/:filename", getFile);

export default router;
