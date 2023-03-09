var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
let constants = require('../../utilities/constants');
const userModel = require('../../models/users.model');
router.get('/', async (req, res) => {
  if (req.session.userId) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
    if(userData && userData.status == true){
      res.render('dashboard', { title: 'dashboard' });
    }else{
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});
module.exports = router;
