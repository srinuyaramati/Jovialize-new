const { raw } = require("mysql");
const models = require("./../models");
const commonMethods = require("../helpers/commons");
const Sequelize = require("sequelize");
const { sequelize } = require('../models');
const Op = Sequelize.Op;
const { QueryTypes } = require('sequelize');

/**
 * get the deals base on the city id or search title 
 * @param {*} req 
 * @param {*} res 
 */
async function getDeals(req, res) {
    // const cityName = req.params.cityName;
    let cityId = req.params.cityId;
    let searchValue = req.params.searchVal;
    try{
        if(cityId == '' || cityId == "null" || cityId == null) {
            const getCityID = await models.cities.findAll({raw: true, attributes:['cityId']});
            cityId = getCityID[0].cityId;
        }
        const options = {
            include:[
                {
                    attributes: ['imageName'],
                    model: models.dealImages,
                    as: 'allImages'
                }
            ],
            order: [['dealId', 'DESC']],
            where: {
                city: cityId,
                deleted: '0',
                status: 'Active',
                activeTo: {
                    [Op.gt]: new Date()
                }
            },
            limit: 20
        }
        if(searchValue != 'null') {
            options.where.title = {
                    [Op.like]: `%${searchValue}%`        
            }
            delete options.where.city;
            
        }
        const result = await models.deals.findAll(options);        
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Something went wrong",
            error: error
        })
    }
}

/** join with us request  */
async function joinWithUs(req, res) {
    try {
        const email = req.body.email;
        const cityId = req.body.cityId;
        const data = {
            email: email,
            cityId: cityId,
            userName: ""
        }
        const result = await models.users.findOne({raw: true, where: {email: email}});
        if(result) {
            if(result.status == 'Inactive') {
                data.status = "Active";
                data.subscription = "1";
                await models.users.update(data, {where: {email: email}});
                res.send({
                    message: "Your registration has been success. You may signin to access the application"
                });
            }
            else {
                res.status(500).send({
                    message: "Email already exist, please signin."
                });
            }
        } else {
            const createUser = await signUp(data);
            if(createUser) {
                res.send({
                    message: "Your registration has been success. You may signin to access the application"
                })
            }
        }
    } catch (error) {
        console.log("joinWithUs() - ", error)
        res.status(500).send({
            message: "Something went wrong",
            error: error
        })
    }
}

/**  */
async function dealInfo(req, res) {    
    try {
        const dealId = req.params.dealId;
        const options = {
            include:[
                {
                    attributes: ['imageName'],
                    model: models.dealImages,
                    as: 'allImages'
                }
            ],
            where: { dealId: dealId}
        }
        const result = await models.deals.findOne(options);
        // console.log(result)
        if(result) {
            res.send(result)
        }
        else {
            res.status(500).send({
                message: "Deal not available"
            })
        }
    } catch(error) {
        console.log(error)
        res.status(500).send({
            message: "Something went wrong",
            error: error
        })
    }
}

/**
 * create recently viewed deals
 * @param {*} req 
 * @param {*} res 
 */
async function insertRecentlyViewed(req, res) {
    try {
        const dealInfo = {
            userId: req.body.userId,
            dealId: req.body.dealId
        }
        const options = {
            where: {
                userId: dealInfo.userId,
                dealId: dealInfo.dealId
            }
        }
        const findRecord = await models.recentlyViewedDeals.findOne(options)
        // console.log("---", findRecord)
        let result;
        if(!findRecord) {
            result = await models.recentlyViewedDeals.create(dealInfo);
        } else {
            result = true
        }
        
        res.send(result)
    } catch(error) {
        res.status(500).send({
            message: "Something went wrong",
            error: error
        })
    }
}

async function dealImages(dealId) {
    return await models.dealImages.findAll({
        attributes: ["imageName"],
        raw: true, 
        where:{dealId: dealId}
    });
}

/**
 * get recently viewed deals
 * @param {*} req 
 * @param {*} res 
 */
async function getRecentlyViewedDeals(req, res) {
    try {
        // const userId = req.params.userId;    
        // const options = {
        //     include:[
        //         {
        //             attributes: ['title', 'shortDescription', 'dealPrice'],
        //             model: models.deals,
        //             as: 'recentlyViewedDeals'
        //         },
        //         {
        //             attributes: ['imageName'],
        //             model: models.dealImages,
        //             as: "dealImages"
        //         }
        //     ],
        //     order:[["id", "DESC"]],
        //     where: {userId: userId},
        //     raw: true,
        //     nest: true
        // }

        // const result = await models.recentlyViewedDeals.findAll(options);

        // const finalData = [];
        // if(result) {            
        //     const test = result.map(async(data, i) => {
        //         data.images = await dealImages(data.dealId);
        //         // console.log(data)
        //         return data;
        //     });
        //     console.log("---" , test)
        // }
        const data = await sequelize.query(`SELECT recently_viewed_deals.id, recently_viewed_deals.dealId, 
                        deals.title, deals.title, deals.shortDescription, deals.dealPrice, deals.dealOfferPrice, 
                        deal_images.imageName, cities.cityName
                        FROM recently_viewed_deals 
                        left outer join deals on recently_viewed_deals.dealId = deals.dealId
                        left outer join deal_images on deal_images.dealId = recently_viewed_deals.dealId
                        left outer join cities on deals.city = cities.cityId
                        where deals.status = 'Active' and deals.deleted = '0' and deals.activeTo > NOW() and cities.status = 'Active'
                        group by recently_viewed_deals.dealId 
                        order by recently_viewed_deals.id desc limit 10;`, {
            replacements: ['active'],
            type: QueryTypes.SELECT,
        });
        
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Something went wrong",
            error: error
        })
    }
}

async function signUp(requestData) {
    try{
        const data = {
            email: requestData.email,
            status: "Active",
            roleId: requestData.roleId,
            cityId: requestData.cityId,
            // entityId: requestData.entityId,
            userName: requestData.userName
        }
        
        const result = await models.users.create(data);
        return result;
    } catch(error) {
        throw error
    }    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function login(req, res) {
    try{
        let email = req.body.email;
        const options = {
            raw: true,
            where: {
                email: email,
                status: "Active"
            }
        }
        const result = await models.users.findOne(options);
        if(!result) {
            res.status(500).send({
                message: "User email doesn't exist, please join now"
            });
        } else {
            const payload = {
                email: result.email,
                userId: result.userId
            }
            const token = await commonMethods.generateJWTToken(payload);
            res.send({
                token: token,
                userId: result.userId,
                userType: "4",
                message: "Signin success",
                email: result.email
            })
        }
    } catch(error) {
        console.log("Login function:-", error)
        res.status(500).send({
            message: "Something went wrong",
            error: error
        })
    }
} 

/** get trending deals */
async function trending(req, res) {
    try {
        // const options = {
        //     attributes: [
        //         'dealId',
        //         [sequelize.fn('COUNT', sequelize.col('*')), 'count']
        //     ],
        //     include:[
        //         {
        //             attributes: ['title', 'shortDescription', 'dealPrice', 'dealOfferPrice'],
        //             model: models.deals,
        //             as: 'recentlyViewedDeals'
        //         },
        //         {
        //             attributes: ['imageName'],
        //             model: models.dealImages,
        //             as: "dealImages"
        //         }
        //     ],
        //     order: [["id", "DESC"]],
        //     group: 'dealId',
        //     raw: true,
        //     nest: true,
        //     limit: 10
        // }
        // const result = await models.recentlyViewedDeals.findAll(options);

        const trendingData = await sequelize.query(`select recently_viewed_deals.id, recently_viewed_deals.dealId, count(*), 
                        deals.title, deals.dealPrice, deals.dealOfferPrice, deals.status, deals.shortDescription, deals.city, cities.cityName
                        from recently_viewed_deals 
                        left outer join deals on recently_viewed_deals.dealId = deals.dealId
                        left outer join cities on deals.city = cities.cityId
                        where deals.status = 'Active' and deals.deleted = '0' and deals.activeTo > NOW() and cities.status = 'Active'
                        group by recently_viewed_deals.dealId 
                        order by count(*) desc limit 10;`, {
            replacements: ['active'],
            type: QueryTypes.SELECT,
        });

        const data = trendingData.map( async(element) => {
            let image = await models.dealImages.findOne({
                attributes: ['imageName'],
                raw:true,
                where: {dealId: element.dealId}
            })
            
            element.imageName = image?image.imageName:'';
            console.log(element)
            return element;
        });
        const results = await Promise.all(data);
        return res.send(results);
    } catch(error) {
        console.log(error)
        res.status(500).send({
            message: "",
            error: error
        })
    }
}

/** deal search input filter request */
async function dealSearch(req, res) {
    try {
        let cityId = req.query.cityId;
        let searchValue = req.query.searchVal;
        const options = {
            raw: true,
            order: [['dealId', 'DESC']],
            where: {
                deleted: '0',
                status: 'Active',
                activeTo: {
                    [Op.gt]: new Date()
                }
            },
            limit: 20
        }
        if(searchValue) {
            options.where.title = {
                    [Op.like]: `%${searchValue}%`        
            }            
        }
        if(cityId != 0) {
            options.where.city = cityId
        }
        const deals = await models.deals.findAll(options);
        res.send(deals);
    }
    catch(error) {
        // console.log(error)
        res.status(500).send({
            message: "Something went wrong..!"
        })
    }
}

/**
 * for app user unsubscribe using mail id
 * @param {*} req 
 * @param {*} res 
 */
async function unsubscribe(req, res) {
    try {
        let email = req.body.email;
        const result = await models.users.findOne({where: {email: email}});
        if(!result) {
            res.status(500).send({
                message: "User email doesn't exist, please check you email"
            });
        } else {
            const updateInfo = {
                status: "Inactive",
                subscription: "0"
            }
            const update = await models.users.update(updateInfo, {where: {email: email}})
            if(update) {
                res.send({
                    message: "Unsubscription successfully updated"
                });
            }
            else {
                res.status(500).send({
                    message: "Something went wrong..!"
                })
            }
        }
    }
    catch(error) {
        res.status(500).send({
            message: "Something went wrong..!"
        })
    }
}
module.exports = {
    deals: getDeals,
    joinWithUs: joinWithUs,
    dealInfo: dealInfo,
    insertRecentlyViewed: insertRecentlyViewed,
    getRecentlyViewedDeals: getRecentlyViewedDeals,
    login: login,
    trending: trending,
    dealSearch: dealSearch,
    unsubscribe: unsubscribe
}