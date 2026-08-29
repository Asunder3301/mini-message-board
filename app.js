import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { newRouter } from "./routes/newRouter.js";
import { detailRouter } from "./routes/detailRouter.js";
// import { title } from "process";

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

const link = { href: "/new", text: "New Message" };

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, process.env.STATIC_DIR || "public");
const viewsPath = path.join(__dirname, process.env.VIEWS_DIR || "views");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use("/detail", detailRouter);
app.use("/new", newRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages, link: link });
});

app.post("/new", (req, res) => {
    messages.push({ text: req.body.message, user: req.body.author, added: new Date() });
    res.redirect("/");
});

app.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);

    res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is currently running`);
});