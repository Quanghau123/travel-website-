import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [process.env.URL_REACT];

const checkAllowedOrigin = (req, res, next) => {
    const origin = req.headers.origin || '';
    const referer = req.headers.referer || '';

    console.log('Origin:', origin);
    console.log('Referer:', referer);

    const isAllowed = allowedOrigins.some((allowed) =>
        origin.includes(allowed) || referer.includes(allowed)
    );

    if (!isAllowed) {
        return res.status(403).json({
            message: 'Access denied: You are not allowed to access this API',
        });
    }

    next();
};

export default checkAllowedOrigin;
