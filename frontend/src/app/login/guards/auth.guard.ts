import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const httpClient = inject(HttpClient);
  //first check if the token is saved in the local storage or not
  const userToken = localStorage.getItem('token');
  //if not just redirect to the login page
  if(!userToken){
    router.navigate(['./login']);
    return false;
  }
  //now lets check if the token is valid or not
  firstValueFrom(httpClient.get(environment.apiUrl + '/auth/me', {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })).then((user: any) => {
    //if the token is valid then just return true
    return true;
  }).catch(() => {
    //if the token is invalid then just redirect to the login
    router.navigate(['./login']);
    return false;
  });
  return true;
};
