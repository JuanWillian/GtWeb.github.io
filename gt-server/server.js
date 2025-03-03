/**
 * Aurora Gt File Server.
 *
 * This service provides support for to serv file and data for Gt Web application.
 */
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const erpController = require('./controllers/erpControllers.js');
const loginController = require('./controllers/loginController.js');

const fs = require('node:fs');
const https = require('https');
const path = require('path');
const mime = require('mime-types');
var express = require('express');
var app = express();

var config = JSON.parse(fs.readFileSync(__dirname + '/conf/config.json'));
var keys = JSON.parse(fs.readFileSync(__dirname + '/conf/keys.json'));

const host = 'localhost';
const port = config.fileServerPort || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

var repositoryPath = __dirname + '/' + config.repositoryPath;
var httpsKeyFile = __dirname + '/' + config.httpsKeyFile;
var httpsCertFile = __dirname + '/' + config.httpsCertFile;

mongoose.connect(config.mongoServer, {
    dbName: config.mongoDatabase
}).then(() => {
    console.log(`Connected to MongoDB database: ${config.mongoDatabase}`);
    app.emit('pronto');
}).catch((e) => console.log(e));

const options = {
    key: fs.readFileSync(httpsKeyFile),
    cert: fs.readFileSync(httpsCertFile)
};
var currentDate = new Date();

/**
 * Formats a JavaScript Date object into a string with the format "YYYY-MM-DD HH:mm:ss".
 *
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date and time string.
 */
function formatDateHour(date) {
    var day = '' + date.getDate();
    var month = '' + (date.getMonth() + 1);
    var year = '' + date.getFullYear();
    var hour = '' + date.getHours();
    var minute = '' + date.getMinutes();
    var second = '' + date.getSeconds();

    if (day.length < 2) {
        day = '0' + day;
    }
    if (month.length < 2) {
        month = '0' + month;
    }
    if (hour.length < 2) {
        hour = '0' + hour;
    }
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    if (second.length < 2) {
        second = '0' + second;
    }

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/**
 * Handles the request to send a file to the client.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
async function sendFile(request, response) {
    var pathname = request.path;

    var mimeType = mime.lookup(repositoryPath + pathname)

    try {
        var fileContents = fs.readFileSync(repositoryPath + pathname);
        console.log('Sending file "' + repositoryPath + pathname + '"...');

        response.writeHead(200, { 'Content-Type': mimeType });
        response.write(fileContents);
        response.end();
    } catch (e) {
        console.log('Error: File not found!');

        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not Found');
        response.end();
    }
}

/**
 * Deletes the "users" collection from the database.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
async function deleteUsuarios(request, response) {
    var pathname = request.path;

    var key = request.query.key;

    const query = { 'key': key };
    const options = {};

    const listaUsuarios = await usuarios.findOne(query, options);
    console.log(listaUsuarios);

    if (listaUsuarios != null) {
        try {
            usuarios.drop();

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write("Ok");
            response.end();
        } catch (e) {
            console.log('Error: Could not connect to the database!');

            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();

            return;
        }
    } else {
        console.log('Error: Invalid key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
}

/**
 * Deletes the "user" collection from the database.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
async function deleteUsuario(request, response) {
    var pathname = request.path;

    var key = request.query.key;

    const query = { 'key': key };
    const options = {};

    const listaUsuarios = await usuarios.findOne(query, options);
    console.log(listaUsuarios);

    if (listaUsuarios != null) {
        try {
            usuarios.deleteOne(query);
            console.log('User deleted!');

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write("Ok");
            response.end();
        } catch (e) {
            console.log('Error: Could not connect to the database!');

            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();

            return;
        }
    } else {
        console.log('Error: Invalid key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
}

/**
 * Deletes all data from the database.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
async function deleteAll(request, response) {
    var pathname = request.path;

    var key = request.query.key;

    const query = { 'key': key };
    const options = {};

    const listaUsuarios = await usuarios.findOne(query, options);
    console.log(listaUsuarios);

    if (listaUsuarios != null) {
        try {
            database.dropDatabase();

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write("Ok");
            response.end();
        } catch (e) {
            console.log('Error: Could not connect to the database!');

            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();

            return;
        }
    } else {
        console.log('Error: Invalid key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
}

app.use(express.text({ type: 'application/json' }));

/**
 * The HTTP server listeners.
 */
app.get('*', (request, response) => {
    sendFile(request, response);
});

app.post('/setUsuario', erpController.setUsuario);

app.post('/getListaUsuarios', erpController.getListaUsuarios);

app.post('/deleteUsuarios', (request, response) => {
    deleteUsuarios(request, response);
});

app.post('/deleteUsuario', (request, response) => {
    deleteUsuario(request, response);
});

app.post('/deleteAll', (request, response) => {
    deleteAll(request, response);
});

app.post('/login', loginController.Verificarlogin);

/**
 * Creates the HTTP server.
 */
const server = https.createServer(options, app);

/**
 * Starts the HTTP server.
 */
app.on('pronto', () => {
    server.listen(port, host, () => {
        console.log(`The server is running on https://${host}:${port}.`);
    });
})
