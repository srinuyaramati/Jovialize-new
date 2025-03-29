const { body } = require('express-validator');

const login = [
                body('email').isEmail().withMessage("Not a valid e-mail address"),
                body('password').notEmpty().withMessage("Password is required"),
            ];
const forgotPassword = [
    body('email').isEmail().withMessage("Not a valid e-mail address"),
];

const resetPassword = [
    body('email').isEmail().withMessage("Not a valid e-mail address"),
    body('password').notEmpty().withMessage("Password is required"),
    body('verificationCode').notEmpty().withMessage("Verification code is missed"),
]

const schema = {
    login: login,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
}

module.exports = schema;