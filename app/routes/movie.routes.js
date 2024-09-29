module.exports = app => {
    const movies = require("../controller/movieController.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/create", movies.create);

    // Retrieve all Tutorials
    router.get("/", movies.findAll);

    app.use("/api/movies", router);
};

