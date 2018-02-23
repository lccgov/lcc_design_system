var express = require('express');
var router = express.Router();
var util = require('util');

router.get('/', function (req, res) {
  res.render('index')
})

// Example routes - feel free to delete these

// Passing data into a page

router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name': 'Foo' })
})

// Branching

router.get('/examples/over-18', function (req, res) {
  // get the answer from the query string (eg. ?over18=false)
  var over18 = req.query.over18

  if (over18 === 'false') {
    // redirect to the relevant page
    res.redirect('/examples/under-18')
  } else {
    // if over18 is any other value (or is missing) render the page requested
    res.render('examples/over-18')
  }
})

// add your routes here
router.post('/generators/webchat', function(req, res) {
    var site_name = req.body.site_name,
        eeid = req.body.eeid;  

    res.redirect(util.format('/generators/webchat-result?site_name=%s&eeid=%s', site_name, eeid))
});

router.get('/generators/webchat-result', function(req, res) {
    var site_name = req.query.site_name,
        eeid = req.query.eeid;  

    res.locals.site_name = site_name;
    res.locals.eeid = eeid;

    res.render('generators/webchat-result');
});

module.exports = router
