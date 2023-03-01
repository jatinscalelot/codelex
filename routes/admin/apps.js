var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
let userModel = require('../../models/users.model');
let appModel = require('../../models/apps.model');
router.get('/', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData && userData.status == true) {
            res.redirect("/apps");
        } else {
            res.render('apps/list', { layout: false, title: 'Express' });
        }
    } else {
        res.render('apps/list', { title: 'apps' });
    }
});
router.post('/', async (req, res) => {
    if (req.session.userId) {
        // let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        // let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        // if(userData && userData.status == true){
        //   res.redirect("/home");
        // }else{
        //   res.render('login', { layout: false, title: 'Express' });
        // }
    } else {
        console.log('req.body', req.body);
        // res.render('login', { layout: false, title: 'Express' });
    }
});
router.get('/create', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData && userData.status == true) {
            res.redirect("/apps");
        } else {
            res.render('apps/create', { layout: false, title: 'Express' });
        }
    } else {
        res.render('apps/create', { title: 'apps' });
    }
})
module.exports = router;
