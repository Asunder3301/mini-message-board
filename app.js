import express from "express";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { newRouter } from "./routes/newRouter.js";
import { detailRouter } from "./routes/detailRouter.js";
import { getAllMessages, insertMessage } from "./db/queries.js";

const link = { href: "/new", text: "New Message" };

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, process.env.STATIC_DIR);
const viewsPath = path.join(__dirname, process.env.VIEWS_DIR);

const app = express();
const PORT = process.env.PORT;

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use("/detail", detailRouter);
app.use("/new", newRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.get("/", async (req, res) => {
    const messages = await getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages: messages, link: link });
});

app.post("/new", async (req, res) => {
    await insertMessage({ text: req.body.message, user: req.body.author, added: new Date().toISOString().split("T")[0] });
    res.redirect("/");
});

app.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);

    res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is currently running`);
});