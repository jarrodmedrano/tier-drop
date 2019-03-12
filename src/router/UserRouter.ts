import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetUsers(req: Request, res: Response): void {

        User.find({}).then((data) => {
            const status = res.statusCode;

            res.json({
                status,
                data
            })
        }).catch((err) => {
            const status = res.statusCode;

            res.json({
                status,
                err
            })
        })
    }

    public GetUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOne({username}).populate('posts', 'title content').then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            })
        }).catch((err) => {
            const status = res.statusCode;

            res.json({
                status,
                err
            })
        })
    }


    public CreateUser(req: Request, res: Response): void {
        const user: string = req.body.user;
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const posts: string[] = req.body.posts;


        const post = new User({
            user,
            username,
            email,
            password,
            posts
        });

        post.save()
            .then((data) => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
    }

    public UpdateUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOneAndUpdate({ username }, req.body).then((data) => {

            const status = res.statusCode;

            res.json({
                status,
                data
            });

        }).catch((err) => {

            const status = res.statusCode;
            res.json({
                status,
                err
            })
        })
    }

    public DeleteUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOneAndRemove({ username }).then((data) => {

            const status = res.statusCode;

            res.json({
                status,
                data
            });

        }).catch((err) => {

            const status = res.statusCode;
            res.json({
                status,
                err
            })
        })
    }

    routes() {
        this.router.get('/', this.GetUsers);
        this.router.get('/:username', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }

}

//export
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;