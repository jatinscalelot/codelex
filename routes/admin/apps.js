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
            const { acccount_name, package_name, banner_ADS, native_ADS, VPN_key, priority, application_name, app_open_ads, interstitial_ADS, rewarded_ADS, web_URL, privacy_policy} = req.body;
            let obj = {
                acccount_name : (acccount_name) ? acccount_name : '',
                package_name : (package_name) ? package_name : '',
                banner_ADS : (banner_ADS) ? banner_ADS : '',
                native_ADS : (native_ADS) ? native_ADS : '',
                VPN_key : (VPN_key) ? VPN_key : '',
                priority : (priority) ? priority : '',
                application_name : (application_name) ? application_name : '',
                app_open_ads : (app_open_ads) ? app_open_ads : '',
                interstitial_ADS : (interstitial_ADS) ? interstitial_ADS : '',
                rewarded_ADS : (rewarded_ADS) ? rewarded_ADS : '',
                web_URL : (web_URL) ? web_URL : '',
                privacy_policy : (privacy_policy) ? privacy_policy : '',
                createdBy : new mongoose.Types.ObjectId(userData._id),
                updatedBy : new mongoose.Types.ObjectId(userData._id),
                timestamp : Date.now()
            };
            let createdApp = await primary.model(constants.MODELS.apps, appModel).create(obj);
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
})
module.exports = router;
