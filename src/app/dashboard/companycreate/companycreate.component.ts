import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companycreate',
  templateUrl: './companycreate.component.html',
  styleUrls: ['./companycreate.component.css']
})
export class CompanycreateComponent implements OnInit {

  fieldinput:boolean=true;
  imagefile:boolean=false;
  constructor() { }
  showContent(){
    this.fieldinput=false;
    this.imagefile=true;
      }

  ngOnInit() {
  }

}
