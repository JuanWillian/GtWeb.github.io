const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const usuarioERPSchema = new mongoose.Schema({
    key: { type: String, required: true },
    usuario: { type: String, required: true },
    password: { type: String, required: true }
});

const UsuarioERPModel = mongoose.model('UsuarioERP', usuarioERPSchema);

class UsuarioERP {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.user = await UsuarioERPModel.findOne({ usuario: this.body.usuario });

        if (!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        }

        console.log(`Usuário encontrado: ${this.user.usuario}, Senha: ${this.user.password}, Key: ${this.user.key}`);

        const key = this.user.key;
        this.valida(key);
        if (this.errors.length > 0) return;

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register(key) {
        this.valida(key);
        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await UsuarioERPModel.create(this.body);
        console.log(`User inserted with the _id: ${this.user._id}.`);
    }

    async userExists() {
        this.user = await UsuarioERPModel.findOne({ usuario: this.body.usuario });
        if (this.user) this.errors.push('Usuário já existe.');
    }

    valida(key) {
        this.cleanUp();
        if (!keys.includes(key)) {
            this.errors.push('Key inválida.');
        }
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    cleanUp() {
        for (const atributo in this.body) {
            if (typeof this.body[atributo] !== 'string') {
                this.body[atributo] = '';
            }
        }

        this.body = {
            key: this.body.key,
            usuario: this.body.usuario,
            password: this.body.password
        };
    }
}

module.exports = { UsuarioERP, UsuarioERPModel };