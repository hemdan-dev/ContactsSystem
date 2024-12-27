import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { AuthService } from '../../login/services';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LiveContactsUpdateService {
    private socket: Socket | undefined;
    private contactsSubject = new BehaviorSubject<any[]>([]);
    contacts$ = this.contactsSubject.asObservable();

    constructor(
        //
    ) {
        this.socket = io(environment.apiUrl);
        this.listenToSocket();
        this.listenToContactsUpdates();
    }

    listenToSocket(){
        if(!this.socket) return;
        this.socket.on('connect', () => {
        console.log("Connected to server");
        const transport = this.socket?.io.engine.transport.name; // in most cases, "polling"
        console.log("Transport: ", transport);

        this.socket?.io.engine.on("upgrade", () => {
            const upgradedTransport = this.socket?.io.engine.transport.name; // in most cases, "websocket"
            console.log("Upgraded transport: ", upgradedTransport);
        });
        });
    }

    listenToContactsUpdates(){
        this.socket?.on('contact-update', (updatedContact: any) => {
            this.contactsSubject.next(updatedContact);
        });
    }

    updateContact(contact: any){
        this.socket?.emit('update-contact', contact);
    }
}