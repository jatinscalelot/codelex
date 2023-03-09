var express = require('express');
var router = express.Router();
router.get('/', async (req, res) => {
    req.session.destroy();
    var goto = process.env.APP_URI;
    res.writeHead(302, { 'Location': goto });
    res.end();
});
module.exports = router;