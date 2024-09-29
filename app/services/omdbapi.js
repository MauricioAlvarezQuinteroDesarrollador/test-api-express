const http = require("http")
const URL_API = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`;

exports.getApi = (search, page, year) => {
    return new Promise(function (resolve) {
        http
            .get(
                `${URL_API}&page=${page}&s=${search}&y=${year}`,
                res => {
                    let data = [];


                    res.on("data", chunk => {
                        data.push(chunk);
                    });

                    res.on("end", () => {
                        resolve(JSON.parse(Buffer.concat(data).toString()));
                    });
                }
            )
            .on("error", err => {
                resolve({ "Response": false })
            });
    });
}