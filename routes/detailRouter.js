import express from "express"

const detailRouter = express.Router();

const link = { href: "/", text: "Home" };

detailRouter.get("/", (req, res) => {
    const { text, user, added } = req.query;

    res.render("detail", { text: text, user: user, added: added, title: "Message Details", link: link});
});

detailRouter.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);

    res.status(err.statusCode || 500).send(err.message);
});

export { detailRouter };