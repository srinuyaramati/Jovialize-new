const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const statusCodes = require("../config/statusCodes");
const models = require("../models");
const jwt = require("jsonwebtoken");
const { logger } = require("../utils/loggers");
const { SMTP_CONFIG, generateSixDigitNumber } = require("../utils/common");
const URL = require("../config/consts");

/**
 * Admin login
 * @param {*} req 
 * @param {*} res 
 */
async function login(req, res) {
  try {
    logger.logger.info("Login request started"); //log
    const email = req.body.email;
    const password = req.body.password;
    const options = {
      raw: true,
      where: {
        email: email,
        deletedStatus: "0"
      }
    }
    const user = await models.admin.findOne(options);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        jwt.sign({
          email: user.email,
          userId: user.adminUserId
        }, process.env.JWT_TOKEN_SECRET_CODE, { expiresIn: Math.floor(Date.now() / 1000) + (30 * 60) }, function (error, jwtToken) {
          // Set the cookie
          // res.cookie('Bearer', jwtToken, {
          //     httpOnly: true,
          //     secure: true
          // });
          res.send({
            message: "Login successful",
            token: jwtToken,
            userId: user.adminUserId,
            // entityId: user.entityId
            role: user.roleId,
            cityId: user.cityId
          })
        })
      } else {
        res.status(401).send({
          message: "Invalid password"
        })
      }
    } else {
      res.status(statusCodes.invalidAuthentication).send({
        message: "Invalid credentials..!"
      })
    }
  }
  catch (error) {
    console.log(error)
    res.status(statusCodes.invalidAuthentication).send({
      message: "Something went wrong..!",
      error: error.message
    })
  }

}

function logout(req, res) {
  res.status(statusCodes.succss).clearCookie('Bearer');
  res.status(200).send({
    message: "Logout successful"
  })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function sampleMail(req, res) {
  try {
    // Create a transporter object using the default SMTP transport    
    // Set up email data
    let transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host, //"smtp-relay.brevo.com",
      port: SMTP_CONFIG.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_CONFIG.auth.user, // generated brevo user
        pass: SMTP_CONFIG.auth.pass, // generated brevo password
      },
    });
    let info = await transporter.sendMail({
      from: "gowrisankar.yeturi@gmail.com", // sender address
      to: "ygs.shetty@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations", // plain text body
    });
    res.send({
      message: info
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong..!",
      error: error,
    })
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function forgotPassword(req, res) {
  try {

    const email = req.body.email;
    const user = await models.admin.findOne({ where: { email: email } });

    if (user) {
      var transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host, //"smtp-relay.brevo.com",
        port: SMTP_CONFIG.port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: SMTP_CONFIG.auth.user, // generated brevo user
          pass: SMTP_CONFIG.auth.pass, // generated brevo password
        },
      });

      var mailOptions = {
        from: "gowrisankar.yeturi@gmail.com", // sender address
        subject: "Reset your password", // Subject line
        text: "", // plain text body
      }
      const verificationCode = generateSixDigitNumber();
      await models.admin.update({ verificationCode: verificationCode }, { where: { email: email } });

      mailOptions.html = `<div>
                                <p>Dear Customer,</p>
                                <p>Greetings from Jovialize.!</p>
                                <p>You have requested to reset your password. <a href='${URL.ADMIN_APP}/authentication/resetPassword?email=${user.email}&verificationCode=${verificationCode}'>Click here</a> to change the password.</p><br /><br />
                                <p>
                                    Thanks,
                                    Jovialize.
                                </p>
                        </div>`;
      mailOptions.to = user?.email;
      await transporter.sendMail(mailOptions);
      res.send({
        message: "We have send a re-set password link to your E-mail"
      })
    }
    else {
      res.status(500).send({
        message: "Email does'nt exist..!",
      })
    }
  }
  catch (error) {
    console.log("forgotPassword(): ", error)
    res.status(500).send({
      message: "Something went wrong..!",
      error: error,
    })
  }
}

/** */
async function resetPassword(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const verificationCode = req.body.verificationCode;
    if (email && password && verificationCode) {
      const user = await models.admin.findOne({ where: { email: email, verificationCode: verificationCode } });
      if (user) {
        let bcryptPassword = user.password = await bcrypt.hash(password, 10);
        await models.admin.update({ verificationCode: "", password: bcryptPassword }, { where: { email: email } });
        res.send({
          message: "Your password has been successfully reset."
        })
      }
      else {
        res.status(500).send({
          message: "Email and verification code not correct..!"
        })
      }

    }
    else {
      res.status(500).send({
        message: "There is no proper input data..!"
      })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Something went wrong..!",
      error: error,
    })
  }

}

module.exports = {
  login: login,
  logout: logout,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  sampleMail: sampleMail
}