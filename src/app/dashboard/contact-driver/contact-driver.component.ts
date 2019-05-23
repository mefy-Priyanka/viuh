import { Component, OnInit } from '@angular/core';
import { SharedService } from '../.././service/shared.service';

@Component({
  selector: 'app-contact-driver',
  templateUrl: './contact-driver.component.html',
  styleUrls: ['./contact-driver.component.css']
})
export class ContactDriverComponent implements OnInit {
  sharenav1: any;

  constructor(private SharedService: SharedService) { 
    // this.SharedService.subpage.subscribe(pagedata => {
    //   console.log('sddddfjddsfd',pagedata);
    //   this.sharenav1=pagedata;
    // });
  }

  ngOnInit() {
  }

}
