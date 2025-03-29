const { body } = require('express-validator');

const deals = [
        body('title')
            .notEmpty().withMessage("Title should not empty")
            .isLength({ max: 80 }).withMessage("Title must be between 1 and 80 characters long"),
        body('shortDescription')
            .notEmpty()
            .withMessage("Short description should not be empty"),
        body('longDescription')
            .notEmpty()
            .withMessage("Long description should not be empty"),
        body('dealPrice')
            .notEmpty().withMessage("Deal pricde should not be empty")
            .isInt().withMessage("Deal pricde mush be number"),            
        body('activeFrom')
            .notEmpty()
            .withMessage("Active from date should not be empty"),
        body('activeTo')
            .notEmpty()
            .withMessage("Active to date should not be empty"),
        body('city')
            .notEmpty().withMessage("City should not be empty")
            .isInt().withMessage("City must be number"),
        body('contactEmail')
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ max: 65 }).withMessage("Email length should not more than 65 characters")
            .isEmail().withMessage("Invalid Email format"),
        body('contactNumber')
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ min:10, max: 10 }).withMessage("Invalid phone number pattern") 
            .isInt().withMessage("Contact number must be number")
]

const addDeal = deals;
const editDeal = () => {

    const dealId = body('dealId')
                    .notEmpty().withMessage("DealId should not empty")
                    .isInt().withMessage("Invalid DealId pattern")
    let result = deals.push(dealId);
    console.log("Hi")
    console.log(deals)
    return result;
}
const schema = {
    addDeal: addDeal,
    updateDeal: editDeal
}

module.exports = schema;