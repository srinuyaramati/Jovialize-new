const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET_CODE);
        req.userData = decodedToken;
        next();
    }
    catch(error) {
        return res.status(400).send({
            message: "Invalid or expireed token",
            error: error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}