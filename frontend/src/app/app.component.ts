import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  providers: [],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  
  constructor(
    //
  ) {
    //
  }
}
