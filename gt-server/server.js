/**
 * Servidor de Arquivos Aurora Gt.
 *
 * Este serviço fornece suporte para servir arquivos e dados para a aplicação Gt Web.
 */

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const erpController = require('./controllers/erpControllers.js');
const loginController = require('./controllers/loginController.js');
const setorController = require('./controllers/SetorController.js');
const empresaController = require('./controllers/empresaController.js');
const atividadeController = require('./controllers/atividadeController.js');
const execucaoController = require('./controllers/execucaoController.js');

const fs = require('node:fs');
const https = require('https');
const path = require('path');
const mime = require('mime-types');
const express = require('express');
const app = express();

const config = JSON.parse(fs.readFileSync(__dirname + '/conf/config.json'));

const host = 'localhost';
const port = config.fileServerPort || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const repositoryPath = __dirname + '/' + config.repositoryPath;
const httpsKeyFile = __dirname + '/' + config.httpsKeyFile;
const httpsCertFile = __dirname + '/' + config.httpsCertFile;

mongoose.connect(config.mongoServer, {
    dbName: config.mongoDatabase,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Conectado ao banco de dados MongoDB: ${config.mongoDatabase}`);
    app.emit('pronto');
}).catch((e) => console.log(e));

// Sessões de login
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { middlewareGlobal, loginRequired } = require('./middlewares/middleware');

const sessionOptions = session({
    secret: config.sessionSecret,
    store: MongoStore.create({ mongoUrl: config.mongoServer }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 360,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(middlewareGlobal);

const flash = require('connect-flash');

app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

const options = {
    key: fs.readFileSync(httpsKeyFile),
    cert: fs.readFileSync(httpsCertFile)
};

const currentDate = new Date();

/**
 * Formata um objeto Date do JavaScript em uma string no formato "YYYY-MM-DD HH:mm:ss".
 *
 * @param {Date} date - A data a ser formatada.
 * @returns {string} - A string da data e hora formatada.
 */
function formatDateHour(date) {
    let day = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    let year = '' + date.getFullYear();
    let hour = '' + date.getHours();
    let minute = '' + date.getMinutes();
    let second = '' + date.getSeconds();

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
 * Lida com a requisição para enviar um arquivo para o cliente.
 *
 * @param {Object} request - O objeto de requisição HTTP.
 * @param {Object} response - O objeto de resposta HTTP.
 */
async function sendFile(request, response) {
    const pathname = request.path;
    const mimeType = mime.lookup(repositoryPath + pathname);

    try {
        const fileContents = fs.readFileSync(repositoryPath + pathname);
        console.log('Enviando arquivo "' + repositoryPath + pathname + '"...');

        response.writeHead(200, { 'Content-Type': mimeType });
        response.write(fileContents);
        response.end();
    } catch (e) {
        console.log('Erro: Arquivo não encontrado!');

        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not Found');
        response.end();
    }
}

app.use(express.text({ type: 'application/json' }));

/**
 * Listeners do servidor HTTP.
 */
app.get('/pagPrincipal', loginRequired, erpController.index);
app.get('/partials/:formulario', loginRequired, erpController.carregarFormulario);

// Rotas da entidade UsuarioERP
app.get('/index', loginController.index);
app.post('/login/register', loginController.register);
app.post('/login/login', loginController.login);
app.get('/login/logout', loginController.logout);
app.post('/getListaUsuarios', loginController.getListaUsuarios);
app.post('/deleteUsuarios', loginController.deleteUsuarios);
app.post('/deleteUsuario', loginController.deleteUsuario);
app.post('/deleteAll', loginController.deleteAll);

// Rotas da entidade Setor
app.post('/pagPrincipal/setor/register', loginRequired, setorController.register);
app.post('/setor/edit/:id', loginRequired, setorController.edit);
app.get('/setor/delete/:id', loginRequired, setorController.delete);
app.get('/setor/setores', loginRequired, setorController.getSetores);

// Rotas da entidade Empresa
app.post('/pagPrincipal/empresa/register', loginRequired, empresaController.register);
app.post('/empresa/edit/:id', loginRequired, empresaController.edit);
app.get('/empresa/delete/:id', loginRequired, empresaController.delete);
app.get('/empresa/empresas', loginRequired, empresaController.getEmpresas);

// Rotas da entidade Atividades
app.post('/pagPrincipal/atividade/register', loginRequired, atividadeController.register);
app.post('/atividade/edit/:id', loginRequired, atividadeController.edit);
app.get('/atividade/delete/:id', loginRequired, atividadeController.delete);
app.get('/atividade/atividades', loginRequired, atividadeController.getAtividades);

// Rotas da entidade Execuções
app.post('/pagPrincipal/execucao/register', loginRequired, execucaoController.register);
app.post('/execucao/edit/:id', loginRequired, execucaoController.edit);
app.get('/execucao/delete/:id', loginRequired, execucaoController.delete);
app.get('/execucao/execucoes', loginRequired, execucaoController.getExecucoes);


app.get('*', (request, response) => {
    sendFile(request, response);
});

/**
 * Cria o servidor HTTP.
 */
const server = https.createServer(options, app);

/**
 * Inicia o servidor HTTP.
 */
app.on('pronto', () => {
    server.listen(port, host, () => {
        console.log(`O servidor está rodando em https://${host}:${port}.`);
    });
});