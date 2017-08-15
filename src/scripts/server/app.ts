// Libs and tools
import * as http        from 'http';
import * as fs          from 'fs';
import * as express     from 'express';
import * as _           from 'lodash';
import * as bodyParser  from 'body-parser';
import * as cors        from 'cors';

let colors = require('colors');
// Modules
import { Database }     from '../modules/database'
let db = new Database();
// db.categories.find({}).then( (res) => {
//     console.log('all categories', res)
// })
// db.addCategory({ name : 'viande' }, (err, res) => {
//     console.log('add category', err, res)
// });
// Server
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
let port = process.env.PORT || 8080;
var router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // for local dev
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.route('/categories')
    .post( (request, response) => {
        console.log('req data', request.body)
        db.categories.insert({ name : request.body.name + Date.now() }).then( (res) => {
            console.log('category added')
            response.json({ categories: res });
        }).catch(err => {
            console.log('err on add category', err)
        })
    })
    .get( (req, res) => {
        db.categories.find({}).then( (categories) => {
            console.log('all categories', categories)
            res.json({ categories: categories });    
        }).catch(err => {
            console.log('err on add category', err)
        });
    })
router.route('/categories/:category_id')
    .delete( (request, response) => {
        db.categories.remove(request.params.category_id).then( (res) => {
            console.log('remove category', res)
        }).catch(err => {
            console.log('err on remove category', err)
        })
    })

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome our api!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
process.stdout.write('\x1Bc'); 
console.log(colors.green('-------------- Server started on localhost: %s --------------'), port);