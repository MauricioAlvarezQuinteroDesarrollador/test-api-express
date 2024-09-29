module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Movie;
};