exports.middlewareGlobal = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    console.log('Usuário não logado.');
    return res.redirect('/index.html');
  }
  next();
};