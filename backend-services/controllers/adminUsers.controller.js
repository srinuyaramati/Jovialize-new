const dateMethod = require("../helpers/dates");
const models = require("../models");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const commonFunctions = require("../utils/common");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getAllUsers(req, res) {
    try {
        let searchValue = req.query.userName;
        let limit =  parseInt(req.query.limit);
        let offset =  parseInt(req.query.offset);
        const options = {
            attributes:['adminUserId', 'userName', 'email', 'status', 'roleId', 'cityId', 'entityId'],
            include: [
                {
                    attributes: ['cityName'],
                    model: models.cities,
                    as: 'cities'
                },
                {
                    attributes: ['roleName'],
                    model: models.roles,
                    as: 'roles'
                }
            ],
            where: { deletedStatus: '0' },
        }
        if(limit) {
            options.limit = limit
        }
        if(offset) {
            options.offset = offset
        }
        if(searchValue) {
            options.where.userName = {
                [Op.like]: `%${searchValue}%`
            }
        }
        const result = await models.admin.findAndCountAll(options)
        return res.send(result);
    }
    catch(error) {
        res.status(400).send({
            message: "Something went wrong",
            error: error
        });
    }
    
}

/**
 * Create user
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
    try {
        const passwordSaltKey = commonFunctions.generateSixDigitNumber()
        const userInfo = { 
            userName: req.body.userName,
            email: req.body.email,
            passwordSaltKey: passwordSaltKey,
            roleId: req.body.roleId,        
            status: req.body.status,
            cityId: req.body.cityId,
            // entityId: req.body.entityId
        }
        if(req.body.password) {
            userInfo.password = await bcrypt.hash(req.body.password, 10);
        }
        const result = await models.admin.create(userInfo);
        return res.send(result);
    }
    catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Something went wrong",
            error: error
        });
    }
}

/**
 * Update user
 * @param {*} req 
 * @param {*} res 
 */
async function updateUser(req, res) {
  try {
    const adminUserId = req.body.adminUserId;
    const userInfo = {
        userName: req.body.userName,
        status: req.body.status,
        roleId: req.body.roleId,
        cityId: req.body.cityId,
        // entityId: req.body.entityId
    }
        
    if(req.body.password) {
        userInfo.password = await bcrypt.hash(req.body.password, 10);
    }
    if(req.body.userRole) userInfo.roleId = req.body.userRole;
    const user = await models.admin.findByPk(adminUserId);
    if(user) {
        const result = await user.update(userInfo)
        return res.send({message: "User updated successfully", data: result})
    }
    else {
        return res.status(400).send({message: "User not available"});
    }
    
  }
  catch(error) {
    console.log(error)
    res.status(400).send({
        message: "Something went wrong",
        error: error
    });
  }
    
}

/**
 * Get user individual details
 * @param {*} req 
 * @param {*} res 
 */
async function getUserDetails(req, res) {
  try {
    const adminUserId = req.params.id;
    const result = await models.admin.findByPk(adminUserId);
    if(result) {
        return res.send(result);
    }
    else {
        return res.status(400).send({
                    message: "No user available with this ID"
                });
    }
  }
  catch(error) {
    console.log("getUserDetails()", error)
    return res.status(400).send({
        message: "Something went wrong",
        error: error
    });
  }
}

/**
 * Delete user
 * @param {*} req 
 * @param {*} res 
 */
async function deleteUser(req, res) {
    try {
        console.log(req.body)
        const adminUserId = req.params.id;
        const roleId = req.body.roleId;
        const deletedStatus = req.body.deletedStatus;
        if(roleId == 1) {
            const userInfo = {
                deletedStatus: deletedStatus
            }
            const user = await models.admin.findByPk(adminUserId);

            if(user) {
                const result = await user.update(userInfo)
                return res.send({message: "User was deleted successfully..!", data: result})
            }
            else {
                return res.status(400).send({message: "User not available"});
            }
        }
        else {
            res.status(400).send({
                message: "You dont have a permissions"
            });
        }
    }
    catch(error) {
        console.log("deleteUser()", error)
        res.status(400).send({
            message: "Something went wrong..!",
            error: error
        });
    }
}

async function getAppUsers(req, res) {
    try {
        let searchValue = req.query.userEmail;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let cityId = parseInt(req.query.cityId);
        const options = {
            raw: true,
            nest: true,
            attributes: ['email', 'status', 'subscription'],
            include: [{
                        attributes: ['cityName'],
                        model: models.cities,
                        as: 'userCities'
                    }],
            where: {}
        };
        if(searchValue) {
            options.where.email = {
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
            options.where.cityId = cityId;
          }
        const users = await models.users.findAndCountAll(options);
        res.send(users);
    }
    catch(error) {
        console.log(error)
        res.status(500).send({
            message: "Something went wrong...!",
            error: error
        })
    }
    
}

module.exports = {
    users: getAllUsers,
    createUser: createUser,
    updateUser: updateUser,
    getUserDetails: getUserDetails,
    deleteUser: deleteUser,
    getAppUsers: getAppUsers
}