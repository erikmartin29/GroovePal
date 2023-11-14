const Koa = require('koa');
const app = new Koa();

// environment variables
require('dotenv').config();
const PORT = process.env.API_PORT;

// database management
require('./database/MigrateDatabase')
    .createTables()
    .then( logs => {
        console.log(logs);
        console.log('database creation complete')
    }).catch( error => {
        console.log('Error in database migration', error);
    });

// cross-origin support
const cors = require('@koa/cors');
app.use(cors({
    credentials: true,
    exposeHeaders: ['Access-Token', 'Cookie']
}));  

// body parser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// load error handling middleware
app.use( async (ctx, next) => {
    return next().catch( error => {
        if ( error.status === 401 ) {
            console.log('sending 401 to the client')
            ctx.body = 'JWT token expired'
        } else {
            console.log('one of the modules in the chain fired an exception.');
            console.log(`the error was ${error}`);
        }
    });
});

// load api routes
require('./router/default.router')(app);

app.listen(PORT, () => {
    console.log(`api server listening on port: ${PORT}`);
});
