var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
let userModel = require('../../models/users.model');
let appModel = require('../../models/apps.model');
let constants = require('../../utilities/constants');
let responseManager = require('../../utilities/response.manager');
const mongoose = require('mongoose');
router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { application_name } = req.body;
    if(application_name && application_name != '' && application_name != 0){
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let appData = await primary.model(constants.MODELS.apps, appModel).findOne({ application_name : { '$regex': new RegExp(application_name, "i") }}).lean();
        if(appData){
            return responseManager.onSuccess('App found, Here is your app data...', appData, res);
        }else{
            return responseManager.onSuccess('App not found with given name, Try again with other name...', {}, res);
        }
    }else{
        return responseManager.badrequest({ message: 'Invalid application name please try again with valid name...' }, res);
    }
});
module.exports = router;