import fs from "fs";
import express, { Request } from "express";
import cors from "cors";

import config from "./config";
import fileRoutes from "./routes/files";

const { port, bodySizeLimit, filesFolder } = config;

const app = express();

// Cors middleware
app.use(cors());
app.options("*", cors<Request>());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: bodySizeLimit }));
app.use(express.urlencoded({ extended: true, limit: bodySizeLimit }));

app.use("/files", fileRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);

  // Create files folder if it doesn't exist
  if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
  }
});
