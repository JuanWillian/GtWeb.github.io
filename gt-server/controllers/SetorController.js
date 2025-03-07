const Setor = require('../models/SetorModel');

exports.register = async (req, res) => {
  try {
    const setor = new Setor(req.body);
    await setor.register();

    if (setor.errors.length > 0) {
      req.flash('errors', setor.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Setor registrado com sucesso.');
    req.session.save(() => res.redirect(`/setor/index/${setor.setor._id}`));
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render('404');

  const setor = await Setor.buscaPorId(req.params.id);
  if (!setor) return res.render('404');

  res.render('pagPrincipal', { setores: await Setor.buscaSetores(), setor });
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.render('404');
    const setor = new Setor(req.body);
    await setor.edit(req.params.id);

    if (setor.errors.length > 0) {
      req.flash('errors', setor.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Setor editado com sucesso.');
    req.session.save(() => res.redirect(`/setor/index/${setor.setor._id}`));
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render('404');

  const setor = await Setor.delete(req.params.id);
  if (!setor) return res.render('404');

  req.flash('success', 'Setor apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};