var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
let userModel = require('../../models/users.model');
let appModel = require('../../models/apps.model');
let constants = require('../../utilities/constants');
let responseManager = require('../../utilities/response.manager');
const mongoose = require('mongoose');
router.get('/', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData && userData.status == true) {
            res.render('apps/list', { title: 'apps' });
        } else {
            res.render('login', { layout: false, title: 'Express' });
        }
    } else {
        res.render('login', { layout: false, title: 'Express' });
    }
});
router.post('/', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if(userData && userData.status == true){
            const { appdata } = req.body;
            appdata.createdBy = new mongoose.Types.ObjectId(userData._id);
            appdata.updatedBy = new mongoose.Types.ObjectId(userData._id);
            appdata.timestamp = Date.now();
            let createdApp = await primary.model(constants.MODELS.apps, appModel).create(appdata);
            return responseManager.onSuccess('App added successfully...', { appid: createdApp._id }, res);
        }else{
            return responseManager.badrequest({message : 'Invalid user to add app, please try again'}, res);
        }
    } else {
        return responseManager.badrequest({message : 'Invalid user to add app, please try again'}, res);
    }
});
router.get('/create', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData && userData.status == true) {
            res.render('apps/create', { title: 'apps' });
        } else {
            res.render('login', { layout: false, title: 'Express' });
        }
    } else {
        res.render('login', { layout: false, title: 'Express' });
    }
});
module.exports = router;
