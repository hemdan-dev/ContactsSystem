import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users";
const jwt = require('jsonwebtoken');

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //check for a token or authentication method
        const authHeader = req.headers['authorization'];
        //if the header dpsn't have a auth throw error
        if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
        //get the token from the bearer
        const token = authHeader.split(' ')[1];
        //check if the token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //if the decoded data is empty throw error
        if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
        //load the users service
        const usrsService = new UsersService();
        //find the user by id
        const user = await usrsService.findOne({ _id: decoded.id }).select('-password');
        //add the user to the body
        req.body.user = user;
        next();
    }catch(err: any){
        console.log(err.message);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}