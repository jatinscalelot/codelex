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
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});
router.get('/edit', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData && userData.status == true) {
            res.render('apps/edit', { title: 'apps' });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
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
router.post('/list', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { limit, page, search } = req.body;
        let regex = new RegExp(search, 'i');
        primary.model(constants.MODELS.apps, appModel).paginate({
            $or: [{ acccount_name: regex }, { package_name: regex }, { banner_ADS: regex }, { native_ADS: regex }, { VPN_key: regex }, { priority: regex }, { application_name: regex },
                { app_open_ads: regex },{ interstitial_ADS: regex },{ rewarded_ADS: regex },{ web_URL: regex },{ privacy_policy: regex },{ frequency: regex }
            ]
        }, {
            page,
            limit: parseInt(limit),
            sort: { _id : -1 },
            lean: true
        }).then((appslist) => {
            return responseManager.onSuccess("Apps List", appslist, res);
        }).catch((err) => {
            return responseManager.onError(err, res);
        });
    } else {
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/changeadx_status_1', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid, adx_status_1 } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            if(existingData.adx_status_1 == true){
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_1 : false, all_status : false});
                return responseManager.onSuccess("status updated", 1, res);
            }else{
                if(existingData.adx_status_2 == true && existingData.adx_status_3 == true && existingData.vpn_status == true && existingData.web_url_status == true){
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_1 : true, all_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }else{
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_1 : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }                
            }
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/changeadx_status_2', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid, adx_status_2 } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            if(existingData.adx_status_2 == true){
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_2 : false, all_status : false});
                return responseManager.onSuccess("status updated", 1, res);
            }else{
                if(existingData.adx_status_1 == true && existingData.adx_status_3 == true && existingData.vpn_status == true && existingData.web_url_status == true){
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_2 : true, all_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }else{
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_2 : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }                
            }
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/changeadx_status_3', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid, adx_status_3 } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            if(existingData.adx_status_3 == true){
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_3 : false, all_status : false});
                return responseManager.onSuccess("status updated", 1, res);
            }else{
                if(existingData.adx_status_1 == true && existingData.adx_status_2 == true && existingData.vpn_status == true && existingData.web_url_status == true){
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_3 : true, all_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }else{
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_3 : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }                
            }
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/changevpn_status', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid, vpn_status } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            if(existingData.vpn_status == true){
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {vpn_status : false, all_status : false});
                return responseManager.onSuccess("status updated", 1, res);
            }else{
                if(existingData.adx_status_1 == true && existingData.adx_status_2 == true && existingData.adx_status_3 == true && existingData.web_url_status == true){
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {vpn_status : true, all_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }else{
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {vpn_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }                
            }
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/changeweb_url_status', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid, web_url_status } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            if(existingData.web_url_status == true){
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {web_url_status : false, all_status : false});
                return responseManager.onSuccess("status updated", 1, res);
            }else{
                if(existingData.adx_status_1 == true && existingData.adx_status_2 == true && existingData.adx_status_3 == true && existingData.vpn_status == true){
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {web_url_status : true, all_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }else{
                    await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {web_url_status : true});
                    return responseManager.onSuccess("status updated", 1, res);
                }                
            }
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/changeall_status', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid, all_status } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            if(existingData.all_status == true){
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_1 : false, adx_status_2 : false, adx_status_3 : false, vpn_status : false, web_url_status : false, all_status : false});
                return responseManager.onSuccess("status updated", 1, res);
            }else{
                await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(aid, {adx_status_1 : true, adx_status_2 : true, adx_status_3 : true, vpn_status : true, web_url_status : true, all_status : true});
                return responseManager.onSuccess("status updated", 1, res);        
            }
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/removeapp', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).lean();
        if(existingData){
            await primary.model(constants.MODELS.apps, appModel).findByIdAndRemove(aid);
            return responseManager.onSuccess("App removed", 1, res);
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/getone', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const { aid } = req.body;
        let existingData = await primary.model(constants.MODELS.apps, appModel).findById(aid).select('-createdBy -updatedBy -timestamp -createdAt -updatedAt -__v').lean();
        if(existingData){
            return responseManager.onSuccess("App removed", existingData, res);
        }else{
            return responseManager.unauthorisedRequest(res);
        } 
    }else{
        return responseManager.unauthorisedRequest(res);
    }
});
router.post('/update', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if(userData && userData.status == true){
            const { appid, appdata } = req.body;
            appdata.updatedBy = new mongoose.Types.ObjectId(userData._id);
            await primary.model(constants.MODELS.apps, appModel).findByIdAndUpdate(appid, appdata);
            return responseManager.onSuccess('App added successfully...', { appid: appid }, res);
        }else{
            return responseManager.badrequest({message : 'Invalid user to update app, please try again'}, res);
        }
    } else {
        return responseManager.badrequest({message : 'Invalid user to update app, please try again'}, res);
    }
});
module.exports = router;
