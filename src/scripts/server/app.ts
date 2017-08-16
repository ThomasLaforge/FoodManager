// Libs and tools
import * as http        from 'http';
import * as fs          from 'fs';
import * as express     from 'express';
import * as _           from 'lodash';
import * as bodyParser  from 'body-parser';
import * as cors        from 'cors';
import * as nedb        from 'nedb';
import * as expressNedbRest from 'express-nedb-rest';
import * as colors from 'colors';

// create  NEDB datastores
const dbDir = './databases/'
let dbSuffix = '.db'

let categoriesDatastore = new nedb({ filename: dbDir + 'categories' + dbSuffix,  autoload: true });
categoriesDatastore.ensureIndex({fieldName : 'name', unique: true })
const linesDatastore = new nedb({ filename: dbDir + 'lines' + dbSuffix,  autoload: true });
const productsDatastore = new nedb({ filename: dbDir + 'products' + dbSuffix,  autoload: true });
const placesDatastore = new nedb({ filename: dbDir + 'places' + dbSuffix,  autoload: true });

// create rest api router and connect it to datastore  
let restApi = expressNedbRest();
restApi.addDatastore('categories', categoriesDatastore);
restApi.addDatastore('lines', linesDatastore);
restApi.addDatastore('products', productsDatastore);
restApi.addDatastore('places', placesDatastore);

// Server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/api', restApi);

let port = process.env.PORT || 8080;
app.listen(port);
process.stdout.write('\x1Bc'); 
console.log(colors.green('-------------- Server started on localhost: %s --------------'), port);