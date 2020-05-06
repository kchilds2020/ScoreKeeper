const auth = (req, res, next) => {
    console.log(req.method);
    console.log('auth middleware');
    next();
};

module.exports = { auth };