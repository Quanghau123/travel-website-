import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); // Giải mã JWT
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ errCode: 1, message: "You do not have permission to access this resource" });
        }
        next();
    };
};

export default { authenticate, authorize };
