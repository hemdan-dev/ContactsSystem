import { Routes } from '@angular/router';
import { authGuard } from './login/guards';
import { LoginComponent } from './login/components/login.component';
import { ContactsComponent } from './contacts/components/contacts-list/contacts-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [],
    },
    {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [authGuard],
    },
];
