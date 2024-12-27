import { RootFilterQuery } from "mongoose";
import { Repository } from "../../../interfaces";
import { IUsers } from "../interfaces";
import { UsersModel } from "../schemas";

export class UsersRepository implements Repository<IUsers> {

    findOne(filter?: RootFilterQuery<IUsers>) {
        return UsersModel.findOne<IUsers>(filter);
    }

    create(data: Partial<IUsers>): Promise<IUsers> {
        return UsersModel.create(data);
    }
}