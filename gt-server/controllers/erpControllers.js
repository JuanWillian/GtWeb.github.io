<<<<<<< HEAD

=======
>>>>>>> 6c3369f9173959b9a590dee4442366683acc84fd
const fs = require('node:fs');
const path = require('path');
const UsuarioERP = require('../models/usuarioERP');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

/**
 * Registers a new user or update an existing one in the database.
 */
exports.setUsuario = async (request, response) => {
  const key = request.query.key;

  if (keys.includes(key)) {
    try {
      const body = request.body;
      console.log(body);

      const query = { usuario: body.usuario };

      const listaUsuarios = await UsuarioERP.findOne(query);
      console.log(listaUsuarios);

      if (listaUsuarios == null) {
        const newUser = new UsuarioERP(body);
        const result = await newUser.save();
        console.log(`User inserted with the _id: ${result._id}.`);
      } else {
        const updateDoc = {
          key: body.key,
          usuario: body.usuario,
          senha: body.senha
        };

        const result = await UsuarioERP.updateOne(query, updateDoc, { upsert: true });
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s).`);
      }

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write("Ok");
      response.end();
    } catch (e) {
      console.log('Error: Could not connect to the database!', e);

      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.write('500 Internal Server Error');
      response.end();
    }
  } else {
    console.log('Error: Invalid key!');

    response.writeHead(401, { 'Content-Type': 'text/plain' });
    response.write('401 Unauthorized');
    response.end();
  }
};

/**
 * 
 */
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
}

exports.deleteUsuario = async (request, response) => {
  var key = request.query.key;

  const query = { 'key': key };
  const options = {};

  const listaUsuarios = await UsuarioERP.findOne(query, options);
  console.log(listaUsuarios);

  if (listaUsuarios != null) {
    try {
      await UsuarioERP.deleteOne(query);
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

exports.deleteUsuarios = async (request, response) => {
  var pathname = request.path;

  var key = request.query.key;

  const query = { 'key': key };
  const options = {};

  const listaUsuarios = await UsuarioERP.findOne(query, options);
  console.log(listaUsuarios);

  if (listaUsuarios != null) {
    try {
      await UsuarioERP.collection.drop();

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

exports.deleteAll = async (request, response) => {
  var key = request.query.key;

  const query = { 'key': key };
  const options = {};

  const listaUsuarios = await UsuarioERP.findOne(query, options);
  console.log(listaUsuarios);

  if (listaUsuarios != null) {
    try {
      await mongoose.connection.dropDatabase();

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
>>>>>>> 6c3369f9173959b9a590dee4442366683acc84fd
}