import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _snackBar: MatSnackBar,
  ) {}

  showMessage(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }
}
