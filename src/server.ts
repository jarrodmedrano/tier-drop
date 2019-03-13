import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import UserRouter from "./router/UserRouter";


//Server Class
class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        //DB Config
        const MONGO_URI = require("./config/keys").mongoURI;

        mongoose.connect(MONGO_URI);

        //config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/users', UserRouter);
    }
}

export default new Server().app;