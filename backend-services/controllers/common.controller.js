const models = require("../models");

async function dashboardCardInfo(req, res) {
    try {        
        const dealsCount = await models.deals.findAndCountAll();
        const usersCount = await models.users.findAndCountAll();
        const citiesCount = await models.cities.findAndCountAll();
        res.send({
            deals: dealsCount.count,
            users: usersCount.count,
            cities: citiesCount.count
        });
    } catch(error) {
        res.status().send({
            message: "Something went wrong..!",
            error: errot
        })
    }
}

module.exports = {
    dashboardCardInfo: dashboardCardInfo
}