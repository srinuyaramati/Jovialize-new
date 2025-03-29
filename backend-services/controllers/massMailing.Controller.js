const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const dateMethod = require("../helpers/dates");
const models = require("../models");
const { SMTP_CONFIG } = require("../utils/common");
const URL = require("../config/consts");
const Op = Sequelize.Op;

const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
/**
 * method for subscribed users
 */
async function getSubscribedUsers() {
    const data = await models.users.findAll({
        raw:true,
        attributes: ["email"],
        where: {
            status: "Active",
            // roleId: 4,
            subscription: '1'
        }
    })
    return data;
}

/**
 * get the mailing deals
 */
async function getMailingDeals(startDate) {
    // const data = await models.deals.findAndCountAll({
    //     raw: true,
    //     nest: true,
    //     include: [
    //         {
    //             attributes: ['cityName'],
    //             model: models.cities,
    //             as: 'cities'
    //         },
    //         {
    //             attributes: ["imageName"],
    //             model: models.dealImages,
    //             as: "images"
    //         }
    //     ],
    //     attributes:['dealId', 'title', 'shortDescription', 'longDescription',  'dealPrice', 'activeFrom', 'activeTo', 'city'],
    //     where: {
    //         createdAt: {
    //             [Op.between]: [startDate, dateMethod.currentDate()]
    //         },
    //         status: 'Active'
    //     }
    // });

    const data = await sequelize.query(`SELECT deals.dealId, deals.city, deals.createdAt, deals.title, deals.dealPrice, cities.cityName, images.imageName, count(*) FROM deals LEFT OUTER JOIN cities ON deals.city = cities.cityId LEFT OUTER JOIN deal_images AS images ON deals.dealId = images.dealId WHERE deals.createdAt BETWEEN '${startDate}' AND '${dateMethod.currentDate()}' AND deals.status = 'Active' group by deals.dealId;`, {
      replacements: ['active'],
      type: QueryTypes.SELECT,
    });
    return data;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function sendMassMailing(req, res) {
  try {
    const currentDate = new Date(); 
    const dealsFrom = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startDate = new Date(dealsFrom).toISOString().split('T')[0];

    const deals = await getMailingDeals(startDate);
    const users = await getSubscribedUsers();
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
        subject: "This Week's Top 20", // Subject line
        text: "Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations", // plain text body
    }
    
    if(users && deals) {
      let dealContent = '';
      deals.forEach((data) => {
        dealContent += `<div style="margin-top: 30px;">
                          <img src="${URL.BACKEND_SERVICES_URL}/dealImages/${data?.imageName}" />
                          <a style="text-align: left;line-height: 1.4; color: #0555af; text-decoration: none; font-weight: bold;" 
                             href="${URL.WEBAPP_URL}/dealInfo?cityName=${data?.cityName}&locationId=${data?.city}&dealId=${data?.dealId}">
                            <p style="margin: 5px 0;">${data?.title}</p>
                          </a>
                          <p style="margin-top: 0; text-align: left;font-size: 16px; line-height: 1.4; color: #666666;">City: ${data?.cityName}</p>
                        </div>`;
      })
      mailOptions.html = `<div style="text-align: center; font-family: Arial, sans-serif; max-width: 500px; width: 100%; overflow: hidden; margin: 0 auto;">
                            <div style="background-color:#000;"><img src="http://92.205.183.4:4000/images/logo.png" /></div>
                            <p style="font-size: 16px; text-transform:uppercase">THIS WEEK'S TOP 20®</p>
                            <p style="font-size:16px;">Every week we search more than 2,000 companies worldwide for their very best deals and compile the 
                                <span style="text-decoration: none; color: #0555af; font-weight: bold;">Jovialize Top 20®</span>.
                            </p>
                            <div style="position: relative; margin-top: 40px; font-weight: bold; font-size: 18px;">
                                <hr />
                                <div style="position: absolute;top: -10px;background-color: #FFF;left: 40%;padding: 0 10px;">The Top 20®</div>
                                <div style="clear: both;"></div>
                            </div>
                            ${dealContent}
                            <hr />
                            <div style="font-size: 12px;color: #999999;">
                                <p>You are receiving this email as part of the membership you signed up for with this address:</p>
                                <p>You can modify your email options or unsubscribe at any time.</p>
                                <p>We use cookies to optimise your user experience on Jovialize.</p>
                                <p>Do not respond to this message. We cannot accept replies to this address.</p>
                            </div>
                        </div>`;
            users.forEach( async(data) => {
                mailOptions.to = data?.email;
                await transporter.sendMail(mailOptions);
            })
      const payload = {
        dealsFrom: startDate,
        dealsTo: dateMethod.currentDate(),
        createdBy: req.body.createdBy
      }
      const updatingDBData = await models.massMailing.create(payload);
      res.status(200).send({
                    message: "Success",
                    response: updatingDBData
                });
    }
    else {
        res.status(500).send({
            message: "Latest deals are not available"
        });
    }
        // attachments: [
        //     {
        //         filename: '1717341325752-2-image-png.png',
        //         path: 'http://92.205.183.4:6001/dealImages/1717341325752-2-image-png.png',
        //         cid: 'uniq-mailtrap.png'
        //     }
        // ]
    }
    catch(error) {
        console.log("Error:-", error)
        res.status(500).send({
                        message: "Something went wrong..!",
                        error: error
                    })
    }
    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function checkMassMailStatus(req, res) {
    models.massMailing.findAll({
        limit: 1,
        order: [
            ["id", "DESC"]
        ]
    })
    .then(response => {
        res.status(200).send(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = {
    sendMassMailing: sendMassMailing,
    checkMassMailStatus: checkMassMailStatus
}