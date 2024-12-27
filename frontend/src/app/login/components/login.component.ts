import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services';
import { UtilsService } from '../../shared/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, UtilsService]
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService,
  ){}

  ngAfterViewInit() {
    //
  }

  async ngOnInit() {
    const data = localStorage.getItem('token');
    if(data) this.router.navigate(['/contacts']);
  }

  async login() {
    try{
      await this.authService.login(this.username, this.password);
      //redirect to the contacts page
      this.router.navigate(['/contacts']);
    }catch(error: any){
      //if the error is 400 then show the error message from the server
      if(error?.status === 400){
        this.utilsService.showMessage(error?.error?.error, 'Close');
      }else{//else just show the generic error message
        this.utilsService.showMessage('Something went wrong', 'Close');
      }
    }
  }
}
