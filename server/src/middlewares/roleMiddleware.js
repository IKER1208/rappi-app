const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes' });
        }
        next();
    };
};

module.exports = roleMiddleware;
