import { Controller, Delete, Get, Patch, Post } from "../../../server/decorators";
import { Request, Response } from 'express';
import { AuthMiddleware } from "../../auth";
import { ContactsService } from "../services";
import { FilterOrganizer } from "../../../server/utils";

@Controller("contacts")
export class ContactsController {

    @Post('', AuthMiddleware)
    async createContact(req: Request, res: Response){
        //create services
        const contactsService = new ContactsService();
        //update contact data
        const createdContact = await contactsService.create(req.body);
        //send the created contact to the client
        res.json(createdContact);
    }

    @Get('', AuthMiddleware)
    async getContacts(req: Request, res: Response){
        const { offset, limit, where } = FilterOrganizer(req.query);
        //create services
        const contactsService = new ContactsService();
        //get the filtered contacts
        const contacts = await contactsService.find(where).skip(offset).limit(limit).sort({ createdAt: -1 });
        //send the contacts to the client
        res.json(contacts);
    }

    @Get('count', AuthMiddleware)
    async getContactsCount(req: Request, res: Response){
        const { where } = FilterOrganizer(req.query);
        //create services
        const contactsService = new ContactsService();
        //get the contacts count
        const count = await contactsService.count(where);
        //send the count to the client
        res.json({ count });
    }

    @Patch(':id', AuthMiddleware)
    async updateContact(req: Request, res: Response){
        const { id } = req.params;
        if(!id) return res.status(400).json({ error: 'Id is required' });
        //create services
        const contactsService = new ContactsService();
        //update contact data
        await contactsService.updateById(id, req.body);
        //send the success to the client
        res.status(204).json();
    }

    @Delete(':id', AuthMiddleware)
    async deleteContact(req: Request, res: Response){
        const { id } = req.params;
        if(!id) return res.status(400).json({ error: 'Id is required' });
        //create services
        const contactsService = new ContactsService();
        //delete contact data
        await contactsService.deleteById(id);
        //send the success to the client
        res.status(204).json();
    }
}