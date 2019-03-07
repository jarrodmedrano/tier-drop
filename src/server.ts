import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';


//Server Class
class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        //set up mongoose
        const MONGO_URI = 'mongodb://localhost/test';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        //config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}))
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);

    }
}

export default new Server().app;