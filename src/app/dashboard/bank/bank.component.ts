import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  public bank: boolean = true;
  public bankList: boolean = true;
  
  constructor() { }

  ngOnInit() {
  }
  submit(){
    this.bank=!this.bank;
  }
  listBank(){
    this.bankList=!this.bankList;
  }
}
