const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();
const bodyParser = require('koa-bodyparser');

require('dotenv').config();

const PORT = process.env.API_PORT;

// sync database database
require('./database/MigrateDatabase')()
.then( () => {
    console.log('*Migration Complete*');
});

app.use(cors({
    credentials: true,
    exposeHeaders: ['Access-Token', 'Cookie']
})); // cross-origin support 
app.use(bodyParser());

// load middleware
app.use( async (ctx, next) => {
    return next().catch( error => {
        if ( error.status === 401 ) {
            console.log('sending 401 to the client')
            ctx.status = 401;
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
