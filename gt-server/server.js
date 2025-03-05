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

//sessões de login
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { middlewareGlobal, loginRequired } = require('./middlewares/middleware');

const sessionOptions = session({
    secret: config.sessionSecret,
    store: MongoStore.create({ mongoUrl: config.mongoServer }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(middlewareGlobal);

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

app.use(express.text({ type: 'application/json' }));

/**
 * The HTTP server listeners.
 */
app.get('/pagPrincipal.html', loginRequired, (request, response) => {
    sendFile(request, response);
});

app.get('/index.html', loginController.index);
app.post('/login/register', loginController.register);
app.post('/login/login', loginController.login);
app.get('/login/logout', loginController.logout);

app.post('/getListaUsuarios', erpController.getListaUsuarios);
app.post('/deleteUsuarios', erpController.deleteUsuarios);
app.post('/deleteUsuario', erpController.deleteUsuario);
app.post('/deleteAll', erpController.deleteAll);

app.get('*', (request, response) => {
    sendFile(request, response);
});

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