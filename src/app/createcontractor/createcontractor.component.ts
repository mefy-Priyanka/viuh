import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createcontractor',
  templateUrl: './createcontractor.component.html',
  styleUrls: ['./createcontractor.component.css']
})
export class CreatecontractorComponent implements OnInit {
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
