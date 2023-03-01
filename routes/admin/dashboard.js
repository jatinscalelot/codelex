var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
router.get('/', async (req, res) => {
  if (req.session.userId) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
    if(userData && userData.status == true){
      res.redirect("/dashboard");
    }else{
      res.render('login', { layout: false, title: 'Express' });
    }
  } else {
    res.render('dashboard', { title: 'dashboard' });
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
module.exports = router;
