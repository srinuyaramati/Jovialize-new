const imageUploader = require("../helpers/imageUploader");
const models = require("../models");
const fs = require('fs');
const path = require('path');

/**
 * get all cities
 * @param {*} req 
 * @param {*} res 
 */
async function getBanners(req, res) {
    try {
        const result = await models.banners.findAll({
            attributes: ['id', 'bannerName']
        });
        res.send(result);
    }
    catch(error) {
        console.log("getBanners()", error)
        res.status(400).send({
            message: "Something went wrong..!",
            error: error
        });
    }
}

// Function to move a file
const moveFile = (source, destination) => {
    // Use fs.rename to move the file
    fs.rename(source, destination, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        throw error
      } else {
        console.log(`File moved successfully from ${source} to ${destination}`);
        return true;
      }
    });
  };

async function bannerImageUpload(req, res) {
    try {
        imageUploader.upload(req, res, function(err) {
            if(err) {                
                res.status(500).send({
                    message: "Something went wrong..!",
                    error: err
                })
            }
            else {
                const sourcePath = path.join('assets/dealImages', req.file.filename); // Adjust the file name
                const destinationPath = path.join('assets/banners', req.file.filename);
                moveFile(sourcePath, destinationPath);
                const image = {
                    bannerName: req.file.filename
                }
                models.banners.update(image, {where: {id: req.body.imageId}})
                    .then(response => {
                        res.send({
                            message: "Banner info updated successfully",
                            response: req.file.filename
                        })
                    })
                    .catch(error => {
                        res.status(500).send({
                            message: "Something went wrong..!",
                            error: error?.parent?.sqlMessage
                        })
                    });
            }
        })
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    banners: getBanners,
    bannerUpload: bannerImageUpload
}