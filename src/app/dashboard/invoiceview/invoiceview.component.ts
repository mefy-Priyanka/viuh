import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-invoiceview',
  templateUrl: './invoiceview.component.html',
  styleUrls: ['./invoiceview.component.css']
})
export class InvoiceviewComponent implements OnInit {
  invoicedetail:any=[];
  constructor( private SharedService :SharedService,) {
    this.SharedService.somedata.subscribe(data => {
      console.log('data',data);
      this.invoicedetail=data.data;
      console.log(this.invoicedetail)
    });
   }

  ngOnInit() {
  }

}
