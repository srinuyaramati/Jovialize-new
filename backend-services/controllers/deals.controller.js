const imageUploader = require("../helpers/imageUploader");
const { deleteFileFromSystem } = require("../helpers/removeFiles");
const models = require("./../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 * Get all deals for the admin
 * @param {*} req 
 * @param {*} res 
 */
async function getAllDeals(req, res) {
    try {
        let searchValue = req.query.dealTitle;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let cityId = parseInt(req.query.cityId);
        const options = {
          include: [
                  {
                      attributes: ['cityName'],
                      model: models.cities,
                      as: 'cities'
                  }
              ],
              order:[
                  ["dealId","DESC"]
              ],
              where: {
                  deleted: '0'
              }
        }
        if(searchValue) {
          options.where.title = {
                  [Op.like]: `%${searchValue}%`        
          }
        }
      
        if(limit) {
          options.limit = limit
        }
        if(offset) {
          options.offset = offset
        }
        if(cityId) {
            options.where.city = cityId;
        }

        const result = await models.deals.findAndCountAll(options);
        // console.log(result)
        const list = result.rows;
        if(list.length != 0) {
            list.map((data) => {
                data.checked = false;
                return data;
            })
            result.rows = list;
        }
        res.send(result);
    }
    catch(error) {
        console.log("getAllDeals():", error)
        res.status(400).send({
          message: "Something went wrong",
          error: error
        });
    }
}

async function dealImages(dealId) {
    return await models.dealImages.findAll({where: {dealId: dealId}});
}
/**
 * Get individual deal
 * @param {*} req 
 * @param {*} res 
 */
function getIndividualDeal(req, res) {
    const dealId = req.params.dealId;
    models.deals.findByPk(dealId, {
        include: [
            {
                attributes: ['cityName'],
                model: models.cities,
                as: 'cities'
            }
        ]
    })
        .then(response => {
            if(response) {
                res.send(response);
            }
            else {
                res.status(400).send({
                    message: "No Deal with given ID"
                });    
            }
        }) 
        .catch(error => {
            res.status(400).send({
                message: "Something went wrong",
                error: error
            });
        });
}

/**
 * Update deal
 * @param {*} req 
 * @param {*} res 
 */
async function updateDeal(req, res) {
    try {
        const dealId = req.body.dealId;
        res.send({
                    message: "Deal successfully update",
                    data: dealId
                })
        // const dealCheck = await models.deals.findByPk(dealId);
        // if(dealCheck) {
        //     const update = await dealCheck.update(req.body);
        //     res.send({
        //         message: "Deal successfully update",
        //         data: update
        //     })
        // }
        // else {
        //     res.status(500).send({
        //         message: "Invalid deal id"
        //     })
        // }
    }
    catch(error) {
        res.status(400).send({
            message: "Something went wrong..!",
            error: error
        });
    }
}

/**
 * Get deals based on city
 * @param {*} req 
 * @param {*} res 
 */
function cityBasedDeals(req, res) {
    const cityId = req.params.cityId;
    models.deals.findAll({where: {city: cityId}})
        .then(response => {
            res.send(response);
        }) 
        .catch(error => {
            res.status(400).send({
                message: "Something went wrong",
                error: error
            });
        });
}

/**
 * delete individual deal
 * @param {*} req 
 * @param {*} res 
 */
function deleteDeal(req, res) {
    const dealId = req.body.dealId;
    const roleId = req.body.roleId;
    if(roleId == 1) {
        models.deals.destroy({where: {dealId:dealId}})
            .then(response => {
                if (response == 1) {
                    res.send({
                      message: "Deal was deleted successfully!"
                    });
                } else {
                    res.send({
                      message: `Cannot delete Deal. Maybe Deal was not found!`
                    });
                }
            })
            .catch(error => {
                res.status(400).send({
                    message: "Something went wrong",
                    error: error
                });
            });
    }
    else {
        res.status(400).send({
            message: "Something went wrong..!"
        });
    }
}

function deleteImages(data, dealIds) {
    data.forEach(element => {
        // Remove the file
        let filePath = `assets/dealImages/${element.imageName}`
        deleteFileFromSystem(filePath);
    });
    return models.dealImages.destroy({where: {dealId:dealIds}})
}

/**
 * delete multiple deals
 * @param {*} req 
 * @param {*} res 
 */
function deleteMultipleDeals(req, res) {
    try {
        const dealIds = req.body.dealIds;
        const roleId = req.body.roleId;
        const userId = req.body.userId;
        if(roleId == 1) { 
            dealIds.forEach(async (id) => {
                const dealCheck = await models.deals.findByPk(id);
                if(dealCheck) {
                    await dealCheck.update({deleted: '1', deletedBy: userId});
                }
            })
            res.send({
                message: "Deals was deleted successfully..!"
            });

            // models.dealImages.findAll({raw: true, where: {dealId:dealIds}})
            //     .then((response) => deleteImages(response, dealIds))
            //     .then(() => {
            //         models.deals.destroy({where: {dealId:dealIds}})
            //             .then(response => {
            //                 if (response) {
            //                     res.send({
            //                         message: "Deals was deleted successfully!"
            //                     });
            //                 } else {
            //                     res.send({
            //                         message: `Cannot delete Deal. Maybe Deal was not found!`
            //                     });
            //                 }
            //             })
            //             .catch(error => {
            //                 console.log("deleteMultipleDeals():", error)
            //                 res.status(400).send({
            //                     message: "Something went wrong",
            //                     error: error
            //                 });
            //             });
            //     })
            //     .catch(error => {
            //         console.log("deleteMultipleDeals():", error)
            //         res.status(400).send({
            //             message: "Something went wrong",
            //             error: error
            //         });
            //     })
        }
        else {
            res.status(500).send({
                message: "You dont have permissions!"
            });
        }
    }
    catch(error) {
        res.status(400).send({
            message: "Something went wrong..!"
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function createDeal(req, res) {
    try {
        const dealInfo = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            status: req.body.status,
            dealPrice: req.body.dealPrice,
            activeFrom: req.body.activeFrom,
            activeTo: req.body.activeTo,
            city: req.body.city,
            // entityId: req.body.entityId,
            createdBy: req.body.createdBy,
            contactEmail: req.body.contactEmail,
            contactNumber: req.body.contactNumber,
            dealAuthorName: req.body.dealAuthorName,
            dealAuthorDesignation: req.body.dealAuthorDesignation,
            customerServiceAvailable: req.body.customerServiceAvailable,
            dealOfferPrice: req.body.dealOfferPrice
        }
        const create = await models.deals.create(dealInfo);
        res.status(200).send({
            message: "Deal create successfully",
            result: create
        });
    }
    catch(error) {
        res.status(500).send({
            message: "Something went wrong..!",
            error: error
        });
    }
}

/**
 * Upload deal images individual
 * @param {*} req 
 * @param {*} res 
 */
function uploadImage(req, res) {
    imageUploader.upload(req, res, function(err) {
        if(err) {
            res.status(500).send({
                message: "Something went wrong..!",
                error: err
            })
        }
        else {
            let imageData = {
                dealId: req.body.dealId,
                imageName: req.file.filename,
                imageOrder: req.body.imageOrder
            }
            // console.log("imageData:-", imageData)
            models.dealImages.create(imageData)
                .then(response => {
                    res.status(200).send({
                        message: "Deal image uploaded successfully",
                        result: response
                    });
                })
                .catch(error => {
                    res.status(500).send({
                        message: "Something went wrong..!",
                        error: error
                    });
                });
        }        
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getDealImages(req, res) {
    let dealId = req.params.dealId;
    models.dealImages.findAll({
        attributes: ['imageName', 'imageId'],
        order:[
            ["imageOrder","ASC"]
        ],
        where: {dealId:dealId}})
        .then(response => {
            // console.log(response)
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send({
                message: "Something went wrong..!",
                error: error
            });
        })
}

/**
 * delete multiple deal images
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function deleteDealMultipleImages(req, res) {
    try {
        // console.log(req.body)
        let ids = req.body.imageIndexes;
        const result = await models.dealImages.destroy({where:{imageId: ids}});
        if(result) {
            res.send({message: "Successfully images deleted"});
        } else {
            res.status(500).send({
                message: "Something went wrong..!",
                error: error
            });    
        }
        
    }
    catch(error) {
        res.status(500).send({
            message: "Something went wrong..!",
            error: error
        });
    }
}
module.exports = {
    getAllDeals: getAllDeals,
    cityBasedDeals: cityBasedDeals,
    createDeal:createDeal,
    uploadImage: uploadImage,
    updateDeal: updateDeal,
    deleteDeal: deleteDeal,
    deleteMultipleDeals: deleteMultipleDeals,
    getIndividualDeal: getIndividualDeal,
    getDealImages: getDealImages,
    deleteDealMultipleImages: deleteDealMultipleImages
}