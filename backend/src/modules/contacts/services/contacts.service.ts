import { RootFilterQuery } from "mongoose";
import { IContacts } from "../interfaces";
import { ContactsRepository } from "../repositories";

export class ContactsService{
    private contactsRepository: ContactsRepository = new ContactsRepository();
    constructor(){
        //
    }

    find(filter?: RootFilterQuery<IContacts>){
        return this.contactsRepository.find(filter);
    }

    findOne(filter?: RootFilterQuery<IContacts>){
        return this.contactsRepository.findOne(filter);
    }

    create(data: Partial<IContacts>){
        return this.contactsRepository.create(data);
    }

    count(filter?: RootFilterQuery<IContacts>){
        return this.contactsRepository.count(filter);
    }

    updateById(id: string, entity: Partial<IContacts>){
        return this.contactsRepository.updateById(id, entity);
    }

    deleteById(id: string){
        return this.contactsRepository.deleteById(id);
    }
}