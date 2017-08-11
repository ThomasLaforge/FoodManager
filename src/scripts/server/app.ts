// Libs and tools
import * as http        from 'http';
import * as fs          from 'fs';
import * as express     from 'express';
import * as _           from 'lodash';
import * as bodyParser  from 'body-parser';
let colors = require('colors');
// Modules
import { Database }     from '../modules/database'
let db = new Database();
db.getCategories({}, (err, res) => {
    console.log('get categories', err, res)
});
// db.addCategory({ name : 'viande' }, (err, res) => {
//     console.log('add category', err, res)
// });
// Server
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let port = process.env.PORT || 8080;
var router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.header("Access-Control-Allow-Origin", "*");
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.route('/categories')
    .post(function(req, res) {
        // db.addCategory({ name : 'viande' }, (err, res) => {
        //     console.log('add category', err, res)
        // });
    })
    .get( function(req, res) {
        db.getCategories({}, (err, response) => {
            console.log('get categories', err, response)
            res.json({ categories: response });    
        });
    })
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
process.stdout.write('\x1Bc'); 
console.log(colors.green('-------------- Server started on localhost: %s --------------'), port);