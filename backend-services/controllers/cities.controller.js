const dateMethod = require("../helpers/dates");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 * get all cities
 * @param {*} req 
 * @param {*} res 
 */
async function getCities(req, res) {
    try {
        let showActiveCities = req.query.showActiveCities;
        let cityName = req.query.cityName;
        let options = {where:{}}
        if(showActiveCities) {
            options.where.status = 'Active';
        }
        if(cityName) {
            options.where.cityName = {
                [Op.like]: `%${cityName}%`        
            }
        }
        const result = await models.cities.findAll(options)
        res.send(result);
    }
    catch(error) {
        console.log("getCities():-", error)
        res.status(500).send({
            message: "Something went wrong..!",
            error: error
        })
    }
}

/**
 * create city record
 * @param {*} req 
 * @param {*} res 
 */
function createCity(req, res) {
    const cityInfo = {
        cityName: req.body.cityName,
        status: req.body.status,
        createdAt: dateMethod.currentDate(),
        updatedAt: dateMethod.currentDate()
    }

    models.cities.create(cityInfo)
        .then(response => {
            res.send({
                message: "City create successfully",
                result: response
            })
        })
        .catch(error => {
            res.status(500).send({
                message: "Something went wrong..!",
                error: error?.parent?.sqlMessage
            })
        }) ;

}

/**
 * get the city individual details 
 * @param {*} req 
 * @param {*} res 
 */
function getCityDetails(req, res) {
    const cityId = req.params.id;
    models.cities.findByPk(cityId)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.status(500).send({
                message: "Something went wrong..!",
                error: error
            });
        })
}

/**
 * update city info
 * @param {*} req 
 * @param {*} res 
 */
function updateCity(req, res) {
    const cityId = req.body.cityId;
    const cityInfo = {
        cityName: req.body.cityName,
        status: req.body.status
    }
    
    models.cities.update(cityInfo, {where: {cityId: cityId}})
        .then(response => {
            res.send({
                message: "City info updated successfully",
                response: response
            })
        })
        .catch(error => {
            res.status(500).send({
                message: "Something went wrong..!",
                error: error?.parent?.sqlMessage
            })
        });
}

/**
 * delete city record
 * @param {*} req 
 * @param {*} res 
 */
function deleteCity(req, res) {
    const cityId = req.params.id;
    models.cities.destroy({
                where: {cityId: cityId}
            })
            .then(response => {
                if (response == 1) {
                    res.send({
                      message: "City was deleted successfully!"
                    });
                } else {
                    res.send({
                      message: `Cannot delete City. Maybe City was not found!`
                    });
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: "Something went wrong",
                    error: error
                })
            })
}

module.exports = {
    cities: getCities,
    createCity: createCity,
    getCityDetails: getCityDetails,
    updateCity: updateCity,
    deleteCity: deleteCity
}