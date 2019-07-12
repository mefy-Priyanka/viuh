import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mefyflow';
  userId: string;
  constructor(private router: Router,) {
    this.userId = localStorage.getItem('userId');   /************** LOGIN USER ID FECTCH FROM LOCAL STORAGE****/
    console.log('ssssssssssssssssssssssssssssssssssssssss')

    if(!this.userId){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/dashboard'])
    }
  }
}
