const fsPromises = require('fs').promises;
const fs = require('fs');

const urlFile = './data.json';

const readFileData = async () => {
    const data = await fsPromises.readFile(urlFile);
    return JSON.parse(data);
}

const writeFileData = async (data) => (
    fsPromises.writeFile(urlFile, JSON.stringify(data, null, 2))
)



module.exports = app => {

    // Create a new task
    app.post("/create-task", function (req, res) {

        fs.stat(urlFile, async function (err, stat) {
            if (err == null) {
                console.log("llego aca")
                const data = await readFileData();
                await writeFileData([...data, req.body]);
                res.send({ "res": "OK" });
            } else if (err.code === 'ENOENT') {
                console.log("no existe archivo")
                // file does not exist
                await writeFileData([req.body]);
                res.send({ "res": "OK" });
                //fs.writeFile('data.json', 'Some log\n');
            } else {
                console.log('Some other error: ', err.code);
            }
        });
    });

    app.get("/tasks", function (req, res) {
        fs.stat(urlFile, async function (err, stat) {
            if (err == null) {
                const data = await readFileData();
                res.send({ "res": data });
            } else if (err.code === 'ENOENT') {
                res.send({ "res": [] });
                //fs.writeFile('data.json', 'Some log\n');
            } else {
                console.log('Some other error: ', err.code);
            }
        })
    })





};



