import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, process.env.STATIC_DIR || "public");

const app = express();
const PORT = 8080;

app.use(express.static(assetsPath));

app.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is currently running`);

  res.status(err.statusCode || 500).send(err.message);
});