import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
public  bill:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  createbill(){
    this.bill=!this.bill;
  }
}
