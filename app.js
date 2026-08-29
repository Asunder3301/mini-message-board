import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { newRouter } from "./routes/newRouter.js";

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, process.env.STATIC_DIR || "public");

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/new", newRouter);
app.use(express.static(assetsPath));

app.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);

    res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is currently running`);
});