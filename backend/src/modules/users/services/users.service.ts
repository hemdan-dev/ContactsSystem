import { RootFilterQuery } from "mongoose";
import { IUsers } from "../interfaces";
import { UsersRepository } from "../repositories";

export class UsersService{
    private usersRepository: UsersRepository = new UsersRepository();
    constructor(){
        //
    }

    findOne(filter?: RootFilterQuery<IUsers>){
        return this.usersRepository.findOne(filter);
    }

    create(data: Partial<IUsers>){
        return this.usersRepository.create(data);
    }
}