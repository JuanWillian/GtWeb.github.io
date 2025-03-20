const Produto = require('../models/produtoModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.register();

    if (produto.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: produto.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Produto registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar Produto.' });
  }
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Produto não encontrado.' });
    const produto = new Produto(req.body);
    await produto.edit(req.params.id);

    if (produto.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: produto.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Produto editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar produto.' });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Produto não encontrado.' });

    const produto = await Produto.delete(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado.' });

    req.session.save(() => res.status(200).json({ message: 'Produto apagado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

exports.getProdutos = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const produtos = await Produto.buscaProdutos(key, page, limit);
    const totalProdutos = await Produto.countDocuments(key);
    res.json({ produtos, totalProdutos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};
