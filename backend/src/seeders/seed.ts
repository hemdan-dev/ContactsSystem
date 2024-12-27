import "reflect-metadata";
import dotenv from "dotenv";
import { AuthService } from "../modules/auth";
import { UsersService } from "../modules/users";
import { DatabaseInitializer } from "../server/utils";
import { ContactsService } from "../modules/contacts";
dotenv.config();

(async () => {
    console.log("Seeding is started");
    //init the database 
    await DatabaseInitializer.initDatabase();
    //load the services
    const usersService = new UsersService();
    const authService = new AuthService();
    const contactsService = new ContactsService();
    //check if we have a user with user 1
    const user1 = await usersService.findOne({ username: "user1" });
    //if the user dosn't exist just create it
    if(!user1){
        await usersService.create({
            username: "user1",
            password: await authService.hashPassword("user1"),
        });
    }
    //check if we have a user with user 2
    const user2 = await usersService.findOne({ username: "user2" });
    //if the user dosn't exist just create it
    if(!user2){
        await usersService.create({
            username: "user2",
            password: await authService.hashPassword("user2"),
        });
    }
    //check if we have less than a contacts
    const contactsCount = 7;
    const contacts = await contactsService.count({});
    if(contacts < contactsCount){
        //create contacts
        for(let i = 0; i < contactsCount; i++){
            await contactsService.create({
                name: `contact ${i}`,
                phone: `phone ${i}`,
                address: `address ${i}`,
                notes: `notes ${i}`
            });
        }
    }
    console.log("Seeding is done");
    //close the app
    process.exit(0);
})()