import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { catchError, firstValueFrom, map, merge, startWith, switchMap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ContactsService, FiltersService, LiveContactsUpdateService } from '../../services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { UtilsService } from '../../../shared/services';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    DatePipe,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  providers: [ContactsService, FiltersService, UtilsService, LiveContactsUpdateService]
})
export class ContactsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'phone', 'address','notes' ,'createdAt' , 'actions'];
  data: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isError = false;
  whereFilter: any;
  filterValue = "";
  oldContactData: any;

  constructor(
    public dialog: MatDialog,
    private contactsService: ContactsService,
    public filtersService: FiltersService,
    private utilsService: UtilsService,
    private liveContactsUpdateService: LiveContactsUpdateService,
  ) {}

  ngAfterViewInit() {
    //get contacts count
    this.getContactsCount();

    //if the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.contactsService!.getContacts(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.whereFilter,
          ).pipe(catchError(async () => null));
        }),
        map(data => {
          //change the loading state
          this.isLoadingResults = false;
          this.isError = data === null;

          if (data === null) {
            return [];
          }
          //add edit property to the data
          data.map((contact: any) => { contact.edit = false; return contact; });
          return data;
        }),
      )
      .subscribe(data => ((this.data as any) = data));
  }

  ngOnInit() {
    this.liveContactsUpdateService.contacts$.subscribe((updatedContact: any) => {
      console.log("Updated contact: ", updatedContact);
      //update the contact in the list
      //find the updated contact in the current shown users
      const index = this.data.findIndex((contact: any) => contact._id === updatedContact._id);
      //if found just update the data
      if(index !== -1) Object.entries(updatedContact).forEach(([key, value]) => this.data[index][key] = value);
    });
  }

  addEmptyContact(){
    const emptyContact = {
      _id: "",
      name: "",
      phone: "",
      address: "",
      notes: "",
      createdAt: new Date().toISOString(),
      edit: true,
    }
    this.data.unshift(emptyContact);
    this.data = [...this.data];
    console.log("Empty contact: ", emptyContact);
  }

  editContact(contact: any, index: number){
    //if the contact is already in edit mode, return
    if(this.oldContactData) return this.utilsService.showMessage("Please save the old contact data first", "close");
    //clone the original data
    this.oldContactData = JSON.parse(JSON.stringify(contact));
    //set the contact to edit mode
    contact.edit = true;
  }

  async deleteContact(contact: any, index: number){
    //confirm the delete before deletation
    if(!confirm("Are you sure you want to delete this contact?")) return;
    //delete the contact
    await firstValueFrom(this.contactsService.deleteContact(contact._id));
    this.getConactsData();
  }

  async saveContact(contact: any, index: number){ 
    const { _id, edit, ...contactData } = contact;
    if(_id){
      await this.updateContact(contact, index);
    }else{
      await this.createContact(contactData);
    }
  }

  async createContact(contact: any){
    await firstValueFrom(this.contactsService.createContact(contact));
    this.getConactsData();
  }

  async updateContact(contact: any, index: number){
    const { _id, edit, ...contactData } = contact;
    await firstValueFrom(this.contactsService.updateContact(_id, contactData));
    //tell othe users about the update contact
    this.liveContactsUpdateService.updateContact({ _id, ...contactData });
    //set the contact to not edit mode
    contact.edit = false;
    //remove the saved old data
    this.oldContactData = null;
  }

  cancelEdit(contact: any, index: number){
    if(!contact._id) {
      this.data.splice(index, 1);
      this.data = [...this.data];
      return;
    }
    contact.edit = false;
    //restore the old data
    Object.entries(this.oldContactData).forEach(([key, value]) => contact[key] = value);
    //remove the saved old data
    this.oldContactData = null;
  }

  changeSelectedFilter(filter: string) {
    this.filtersService.setSelectedFilter(filter);
    this.filtersService.setSelectedProperty(filter);
  }

  setCondetion(condetion: string) {
    this.filtersService.setSelectedCondetion(condetion);
  }

  addToFilter() {
    if(this.filterValue === "") return this.utilsService.showMessage("Please enter a value to filter by", "close");
    if(this.filtersService.getSelectedCondetion() === "") return this.utilsService.showMessage("Please select the condetion to filter by", "close");
    if(this.filtersService.getSelectedProperty() === "") return this.utilsService.showMessage("Please select the column to filter by", "close");
    const newFilter = this.filtersService.addToFilter(this.filterValue);
    this.whereFilter = newFilter;
    this.getConactsData();
  }

  removeFilter(filter: any){
    const newFilter = this.filtersService.removeFromWhereFilter(filter);
    this.whereFilter = newFilter;
    this.getConactsData();
  }

  getConactsData(){
    this.isLoadingResults = true;
    this.getContactsCount();

    firstValueFrom(
      this.contactsService.getContacts(this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.whereFilter
      )
    ).then(data => {
      //add edit property to the data
      data.map((contact: any) => { contact.edit = false; return contact; });
      this.data = data;
      this.isLoadingResults = false;
    })
    .catch(() => {
      this.isLoadingResults = false;
      this.isError = true;
    });
  }

  getContactsCount(){
    //get contacts count
    firstValueFrom(this.contactsService.getContactsCount(this.whereFilter))
    .then(data => {
      this.resultsLength = data.count;
    })
    .catch(() => {
      this.isLoadingResults = false;
      this.isError = true;
    });
  }
}
