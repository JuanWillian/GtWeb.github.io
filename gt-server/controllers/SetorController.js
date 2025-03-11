const Setor = require('../models/SetorModel');

exports.register = async (req, res) => {
  try {
    const setor = new Setor(req.body);
    await setor.register();

    if (setor.errors.length > 0) {
      req.flash('errors', setor.errors);
      req.session.save(() => res.status(400).json({ errors: setor.errors }));
      return;
    }

    req.flash('success', 'Setor registrado com sucesso.');
    req.session.save(() => res.status(200).json({ message: 'Setor registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar setor.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Setor não encontrado.' });
    const setor = new Setor(req.body);
    await setor.edit(req.params.id);

    if (setor.errors.length > 0) {
      req.flash('errors', setor.errors);
      req.session.save(() => res.status(400).json({ errors: setor.errors }));
      return;
    }

    req.flash('success', 'Setor editado com sucesso.');
    req.session.save(() => res.status(200).json({ message: 'Setor editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar setor.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Setor não encontrado.' });

  const setor = await Setor.delete(req.params.id);
  if (!setor) return res.status(404).json({ error: 'Setor não encontrado.' });

  req.flash('success', 'Setor apagado com sucesso.');
  req.session.save(() => res.status(200).json({ message: 'Setor apagado com sucesso.' }));
  return;
};

