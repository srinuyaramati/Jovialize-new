const dateMethod = require("../helpers/dates");
const models = require("../models");

/**
 * get all roles
 * @param {*} req 
 * @param {*} res 
 */
async function getAllRoles(req, res) {
    try{
        const options = {
            where: {
                deleted: "0"
            }
        }
        const response = await models.roles.findAll(options);
        res.send(response);
    }
    catch(error) {
        res.status(500).send({
            message: "Something went wrong",
            error: error
        });
    }
}

/**
 * Create Role
 * @param {*} req 
 * @param {*} res 
 */
function createRole(req, res) {
    const roleInfo = {
        roleName: req.body.roleName
    }
    
    models.roles.create(roleInfo)
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
function updateRole(req, res) {
    const roleId = req.body.roleId;
    const roleInfo = {
        roleName: req.body.roleName
    }
    
    models.roles.update(roleInfo, {where: {roleId:roleId}})
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

module.exports = {
    getAllRoles: getAllRoles,
    createRole: createRole,
    updateRole: updateRole
}