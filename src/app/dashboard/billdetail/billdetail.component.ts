import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-billdetail',
  templateUrl: './billdetail.component.html',
  styleUrls: ['./billdetail.component.css']
})
export class BilldetailComponent implements OnInit {

  billdetail: any = [];
  constructor(private SharedService: SharedService, ) {
    this.SharedService.somedata.subscribe(data => {
      console.log('data', data);
      this.billdetail = data.data;
      console.log(this.billdetail)
    });
  }

  ngOnInit() {
  }

}
