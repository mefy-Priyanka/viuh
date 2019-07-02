import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public sharenav:any;

  constructor(private SharedService: SharedService) {
    this.SharedService.abcd.subscribe(abc => {
      console.log('sddddfjddsfd',abc);
      this.sharenav=abc;
      console.log(this.sharenav)
    });



   }

  ngOnInit() {
  }

}
