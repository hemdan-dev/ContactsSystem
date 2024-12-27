import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { AuthService } from '../../login/services';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  headers = { "Authorization": "" };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.headers = {
      "Authorization": "Bearer " + (this.authService.getToken() ?? ""),
    }
  }

  getContacts(sort: string, order: SortDirection, page: number, where: any): Observable<any> {
    const href = environment.apiUrl + '/contacts';
    let requestUrl = `${href}?count=${5}&offset=${5 * page}`;
    if(where) requestUrl += `&where=${JSON.stringify(where)}`;

    return this.http.get<any>(requestUrl, {headers: this.headers});
  }

  getContactsCount(where: any){
    const href = environment.apiUrl + '/contacts/count';
    let requestUrl = `${href}`;
    if(where) requestUrl += `?where=${JSON.stringify(where)}`;
    return this.http.get<any>(requestUrl, {headers: this.headers});
  }

  createContact(contact: any){
    const href = environment.apiUrl + '/contacts';
    return this.http.post<any>(href, contact, {headers: this.headers});
  }

  updateContact(id: string, contact: any){
    const href = environment.apiUrl + '/contacts/' + id;
    return this.http.patch<any>(href, contact, {headers: this.headers});
  }

  deleteContact(id: string){
    const href = environment.apiUrl + '/contacts/' + id;
    return this.http.delete<any>(href, {headers: this.headers});
  }
}