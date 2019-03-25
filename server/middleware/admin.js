let admin = (req, res, next) => {
    if(req.user.role === 0) {
        return res.send('You do not have permission.');
    }
    next();
}

module.exports = { admin };