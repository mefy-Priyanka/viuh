import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {
  public cdata :boolean =true;

  constructor() { }

  ngOnInit() {
  }
at(){
  this.cdata=!this.cdata;
}
}
