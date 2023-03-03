var express = require('express');
var router = express.Router();
let mongoConnection = require('../../utilities/connections');
let responseManager = require('../../utilities/response.manager');
let helper = require('../../utilities/helper');
let userModel = require('../../models/users.model');
let constants = require('../../utilities/constants');
router.get('/', async (req, res) => {
  if (req.session.userId) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
    if (userData && userData.status == true) {
      res.redirect("/home");
    } else {
      res.render('login', { layout: false, title: 'Express' });
    }
  } else {
    res.render('login', { layout: false, title: 'Express' });
  }
});
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (req.session.userId) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
    if (userData && userData.status == true) {
      return response.onSuccess('Login successful', { userid: req.session.userId }, res);
    } else {
      if (email && password) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          let primary = mongoConnection.useDb(constants.DEFAULT_DB);
          let userData = await primary.model(constants.MODELS.users, userModel).findOne({ email: email }).lean();
          if (userData && userData.status == true) {
            let desPass = await helper.passwordDecryptor(userData.password);
            if (desPass == password) {
              req.session.userId = userData._id;
              return responseManager.onSuccess('Login successful', { userid: userData._id.toString }, res);
            } else {
              return responseManager.onSuccess('Invalid password..., Please try again with valid password', 0, res);
            }
          } else {
            return responseManager.onSuccess('Invalid email..., Please try again with valid email', 0, res);
          }
        } else {
          return responseManager.onSuccess('Invalid email..., Please try again with valid email', 0, res);
        }
      } else {
        return responseManager.onSuccess('Invalid email and password..., Please try again !', 0, res);
      }
    }
  } else {
    if (email && password) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findOne({ email: email }).lean();
        if (userData && userData.status == true) {
          let desPass = await helper.passwordDecryptor(userData.password);
          if (desPass == password) {
            req.session.userId = userData._id;
            return responseManager.onSuccess('Login successful', { userid: userData._id.toString }, res);
          } else {
            return responseManager.onSuccess('Invalid password..., Please try again with valid password', 0, res);
          }
        } else {
          return responseManager.onSuccess('Invalid email..., Please try again with valid email', 0, res);
        }
      } else {
        return responseManager.onSuccess('Invalid email..., Please try again with valid email', 0, res);
      }
    } else {
      return responseManager.onSuccess('Invalid email and password..., Please try again !', 0, res);
    }
  }
});
module.exports = router;
