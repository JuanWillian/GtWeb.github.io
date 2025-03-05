<<<<<<< HEAD

=======
>>>>>>> 6c3369f9173959b9a590dee4442366683acc84fd
const fs = require('node:fs');
const path = require('path');
const mongoose = require('mongoose');
const { UsuarioERPModel } = require('../models/usuarioERP');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.getListaUsuarios = async (request, response) => {
<<<<<<< HEAD
    var key = request.query.key;

    if (typeof (key) != 'undefined') {
        if (keys.includes(key)) {
            try {
                const query = { 'key': key };
                const options = {
                    sort: { data: -1 },
                    projection: { _id: 0 }
                };

                const cursor = UsuarioERP.find(query).sort(options.sort).select(options.projection);

                if ((await UsuarioERP.countDocuments(query)) === 0) {
                    console.log('Erro: Nenhum usuário cadastrado!');

                    response.writeHead(400, { 'Content-Type': 'text/plain' });
                    response.write('400 Bad Request');
                    response.end();
                } else {
                    var UsuarioERPList = [];

                    for await (const doc of cursor) {
                        UsuarioERPList.push(doc);
                    }

                    console.log(JSON.stringify(UsuarioERPList));
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(UsuarioERPList));
                    response.end();
                }
            } catch (e) {
                console.log('Error: Could not connect to the database!');

                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.write('500 Internal Server Error');
                response.end();

                return;
            }
        } else {
            console.log('Error: Unregistred key!');

            response.writeHead(401, { 'Content-Type': 'text/plain' });
            response.write('401 Unauthorized');
            response.end();
        }
    } else {
        console.log('Error: Undefined key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
=======
  var key = request.query.key;

  if (typeof (key) != 'undefined') {
    if (keys.includes(key)) {
      try {
        const query = { 'key': key };
        const options = {
          sort: { data: -1 },
          projection: { _id: 0 }
        };

        console.log('Connecting to the database...');
        const cursor = UsuarioERPModel.find(query).sort(options.sort).select(options.projection);

        if ((await UsuarioERPModel.countDocuments(query)) === 0) {
          console.log('Erro: Nenhum usuário cadastrado!');

          response.writeHead(400, { 'Content-Type': 'text/plain' });
          response.write('400 Bad Request');
          response.end();
        } else {
          var UsuarioERPList = [];

          for await (const doc of cursor) {
            UsuarioERPList.push(doc);
          }

          console.log(JSON.stringify(UsuarioERPList));
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(UsuarioERPList));
          response.end();
        }
      } catch (e) {
        console.log('Error: Could not connect to the database!', e);

        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write('500 Internal Server Error');
        response.end();

        return;
      }
    } else {
      console.log('Error: Unregistred key!');

      response.writeHead(401, { 'Content-Type': 'text/plain' });
      response.write('401 Unauthorized');
      response.end();
    }
  } else {
    console.log('Error: Undefined key!');

    response.writeHead(401, { 'Content-Type': 'text/plain' });
    response.write('401 Unauthorized');
    response.end();
  }
};

exports.deleteUsuario = async (request, response) => {
  var key = request.query.key;

  const query = { 'key': key };
  const options = {};

  const listaUsuarios = await UsuarioERPModel.findOne(query, options);
  console.log(listaUsuarios);

  if (listaUsuarios != null) {
    try {
      await UsuarioERPModel.deleteOne(query);
      console.log('User deleted!');

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write("Ok");
      response.end();
    } catch (e) {
      console.log('Error: Could not connect to the database!', e);

      response.writeHead(500, { 'Content-Type': 'text/plain' });
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
};

exports.deleteUsuarios = async (request, response) => {
  var pathname = request.path;

  var key = request.query.key;

  const query = { 'key': key };
  const options = {};

  const listaUsuarios = await UsuarioERPModel.findOne(query, options);
  console.log(listaUsuarios);

  if (listaUsuarios != null) {
    try {
      await UsuarioERPModel.collection.drop();

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write("Ok");
      response.end();
    } catch (e) {
      console.log('Error: Could not connect to the database!', e);

      response.writeHead(500, { 'Content-Type': 'text/plain' });
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
};

exports.deleteAll = async (request, response) => {
  var key = request.query.key;

  const query = { 'key': key };
  const options = {};

  const listaUsuarios = await UsuarioERPModel.findOne(query, options);
  console.log(listaUsuarios);

  if (listaUsuarios != null) {
    try {
      await mongoose.connection.dropDatabase();

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write("Ok");
      response.end();
    } catch (e) {
      console.log('Error: Could not connect to the database!', e);

      response.writeHead(500, { 'Content-Type': 'text/plain' });
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