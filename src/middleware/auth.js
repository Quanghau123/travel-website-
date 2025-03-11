import jwt from 'jsonwebtoken';

// Middleware kiểm tra token hợp lệ hay không
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ errCode: 1, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ errCode: 1, message: 'Invalid token format' });
        }

        // Giải mã token và gán thông tin user vào req
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secretKey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ errCode: 1, message: 'Unauthorized' });
    }
};

// Middleware kiểm tra quyền truy cập
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ errCode: 1, message: 'Unauthorized' });
        }

        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                errCode: 1,
                message: "You do not have permission to access this resource"
            });
        }

        next();
    };
};

export default { authenticate, authorize };
