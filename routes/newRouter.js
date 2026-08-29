import express from "express";

const newRouter = express.Router();

newRouter.get("/", (req, res) => {
    res.render("form", { title: "New Message" });
})

newRouter.use((err, req, res, next) => {
    console.error(`ERROR: ${err}`);

    res.status(err.statusCode || 500).send(err.message);
});

export { newRouter };