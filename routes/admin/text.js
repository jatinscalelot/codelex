var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
let userModel = require('../../models/users.model');
let textModel = require('../../models/texts.model');
let constants = require('../../utilities/constants');
let responseManager = require('../../utilities/response.manager');
const mongoose = require('mongoose');
router.get('/', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData && userData.status == true) {
            res.render('text', { title: 'text' });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});
router.post('/get', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let textData = await primary.model(constants.MODELS.texts, textModel).find({}).lean();
        if(textData && textData.length > 0){
            return responseManager.onSuccess('text data...', textData[0] , res);
        }else{
            return responseManager.badrequest({message : 'Invalid user to update app, please try again'}, res);
        }
    } else {
        return responseManager.badrequest({message : 'Invalid user to update app, please try again'}, res);
    }
});
router.post('/set', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        const {textid, textdata } = req.body;
        let textData = await primary.model(constants.MODELS.texts, textModel).findById(textid).lean();
        if(textData){
            await primary.model(constants.MODELS.texts, textModel).findByIdAndUpdate(textid, {txt : textdata, updatedBy : new mongoose.Types.ObjectId(req.session.userId)});
            return responseManager.onSuccess('text data updated...', 1 , res);
        }else{
            return responseManager.badrequest({message : 'Invalid user to update text data, please try again'}, res);
        }
    } else {
        return responseManager.badrequest({message : 'Invalid user to update text data, please try again'}, res);
    }
})
module.exports = router;