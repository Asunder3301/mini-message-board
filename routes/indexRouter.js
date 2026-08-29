const indexRouter = (req, res, options = {}) => {
    res.render("index", { title: options.title, messages: options.messages });
}

export { indexRouter };