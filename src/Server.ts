import cookieParser from 'cookie-parser';
import express from 'express';

import * as expressHbs from 'express-handlebars';

import logger from 'morgan';
import path from 'path';

import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import session from 'express-session';

import Env from './env';
import { AppRouter } from './AppRouter';

import './routes/_router';

var MySQLStore = require('express-mysql-session')(session);


var sessionStore = new MySQLStore(Env.db);


var multer = require('multer');
var upload = multer();


const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));


app.use(upload.array()); 




app.use(
    session(
        {
            secret:Env.sessionSecret,
            store: sessionStore, 
            saveUninitialized: false,
            resave: true
        }
    )
);

const hbs = expressHbs.create({
    helpers: require('./shared/helpers')(),
    defaultLayout: 'layout',
    partialsDir: ['src/views/partials'],
    extname:'.hbs'
});
app.engine('.hbs',hbs.engine);
app.set('view engine', '.hbs');


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.use(AppRouter.getInstance);


export default app;
