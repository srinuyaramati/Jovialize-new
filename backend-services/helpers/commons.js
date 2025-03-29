const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Helper function to generate JWT token
async function generateJWTToken(payload) {
    try {        
        const secretKey = process.env.JWT_TOKEN_SECRET_CODE || "deals";
        const tokenExpire = process.env.JWT_TOKEN_EXPIRY || Math.floor(Date.now() / 1000) + (30 * 60) ;    
        const token = jwt.sign(payload, secretKey, { expiresIn: tokenExpire }); // Use environment variables for secret key and token expiry    
        return token;
    } catch (error) {
        throw error
    }    
};


module.exports = {
    generateJWTToken
}