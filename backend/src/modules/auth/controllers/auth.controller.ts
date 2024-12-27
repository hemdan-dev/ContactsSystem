import { AuthMiddleware } from "../middlewares";
import { Controller, Get, Post } from "../../../server/decorators";
import { Request, Response } from 'express';
import { UsersService } from "../../users";
import { AuthService } from "../services";

@Controller("auth")
export class AuthController {
    @Post('login')
    async login(req: Request, res: Response){
        //destuct the user data from the body
        const { username, password } = req.body;
        //load the users service
        const usersService = new UsersService();
        //load the auth service
        const authService = new AuthService();
        //find the user by username
        const user = await usersService.findOne({ username });
        if(!user) return res.status(400).json({ error: 'Cannot find the user' });
        //compare the password
        const comparePassword = await authService.comparePassword(password, user.password);
        if(!comparePassword) return res.status(400).json({ error: 'Invalid password' });
        //clone the user object and delete the password from the user
        const clonedUser = JSON.parse(JSON.stringify(user));
        delete clonedUser.password;
        //generate the token
        const token = authService.generateToken(user._id);
        res.json({ user: clonedUser, token });
    }

    @Get('me', AuthMiddleware)
    me(req: Request, res: Response){
        res.json(req.body.user);
    }
}