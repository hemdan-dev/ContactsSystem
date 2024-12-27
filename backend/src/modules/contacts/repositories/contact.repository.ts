import { RootFilterQuery } from "mongoose";
import { Repository } from "../../../interfaces";
import { IContacts } from "../interfaces";
import { ContactsModel } from "../schemas";

export class ContactsRepository implements Repository<IContacts> {
    find(filter: RootFilterQuery<IContacts> = {}) {
        return ContactsModel.find<IContacts>(filter);
    }

    findOne(filter?: RootFilterQuery<IContacts>) {
        return ContactsModel.findOne<IContacts>(filter);
    }

    create(data: Partial<IContacts>): Promise<IContacts> {
        return ContactsModel.create(data);
    }

    count(filter?: RootFilterQuery<IContacts> | undefined): Promise<number> {
        return ContactsModel.countDocuments(filter);
    }

    updateById(id: string, entity: Partial<IContacts>) {
        return ContactsModel.findByIdAndUpdate(id, entity);
    }

    deleteById(id: string) {
        return ContactsModel.findByIdAndDelete(id);
    }
}