

const db = require("../models");

const Movie = db.movie;
const Op = db.Sequelize.Op;
const { getApi } = require("../services/omdbapi")




// Get Data API and save in BD 
exports.create = async (req, res) => {
    await Movie.destroy({ where: {}, truncate: false })
    let page = 1;
    const moviesData = []
    while (page != -1) {
        const omdbapiData = await getApi('love', page, 2020);
        if (omdbapiData.Response && omdbapiData.Search) {
            const data = omdbapiData.Search.map(item => {
                const { Title, Year, Type, Poster } = item;
                return { title: Title, year: Year, type: Type, image: Poster }
            })
            moviesData.push(...data)
            page++;
        } else page = -1;
    };

    await Movie.bulkCreate(moviesData)
    res.send({ "res": "OK" });

};

// Retrieve all Movies from the database.
exports.findAll = async (req, res) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset) - 1;
    res.header("Access-Control-Allow-Origin", "*");
    const data = await Movie.findAndCountAll({ limit, offset: offset * limit });
    data.rows.length === 0 ? res.status(500).send({
        message: `Error with page ${offset + 1}`
    }) : res.send(data);

};








