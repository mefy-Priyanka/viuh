import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
  styleUrls: ['./journalist.component.css']
})
export class JournalistComponent implements OnInit {
  journalist: boolean=true;;

  constructor(private SharedService :SharedService) { }

  ngOnInit() {
  }
  addjournal() {
    this.journalist = false;
    this.SharedService.abc('journalcreate');
    // this.SharedService.abc('contractordetail');

    console.log("hi t");
  }
}
