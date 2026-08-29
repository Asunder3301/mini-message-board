import express from "express";

const newRouter = express.Router();

const link = { href: "/", text: "Home" }

newRouter.get("/", (req, res) => {
    res.render("form", { title: "New Message", link: link });
})

newRouter.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);

    res.status(err.statusCode || 500).send(err.message);
});

export { newRouter };