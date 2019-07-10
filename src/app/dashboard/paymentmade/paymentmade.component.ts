import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CompanyService } from 'src/app/service/company.service';

import { SharedService } from 'src/app/service/shared.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paymentmade',
  templateUrl: './paymentmade.component.html',
  styleUrls: ['./paymentmade.component.css']
})
export class PaymentmadeComponent implements OnInit {
  billlists: any;
  amount = 0;
  description = '';
  id: any;
  userdata:any;
  firstaccountid: any;
  constructor(private userService: UserService,  private SharedService :SharedService, private companyService: CompanyService,private toastr: ToastrService,) { }

  ngOnInit() {
    this.billlist();
  }


  billlist() {
    console.log(localStorage.getItem('SuperAdmin'))
    this.companyService.getbill(localStorage.getItem('SuperAdmin')).subscribe(data => {

      let result: any = {}
      result = data;
      this.billlists = result.result
      console.log(this.billlists);
    },
      error => {
        console.log(error);

      })
  }

  pay(data) {
    this.userdata=data;
    this.id=data._id;
    // this.getaccount()
  }
  submit(){
    let data={
      billId:this.id,
      amount_paid:this.amount
    }
    console.log(data);
    this.companyService.paybill(data).subscribe(result=>{
      console.log(result);
      this.toastr.success('Awesome!', 'bill detail saved suceesfully');
      this.createjournal()
      this.billlist();
      document.getElementById("cancel").click();
    },
    err=>{
      console.log(err);
      this.toastr.error('oops!', 'server error');

    })
  }
  cancel(){
    this.amount=0;
    this.id=0;
    document.getElementById("cancel").click();

  }

  getaccount(){
    var accounttype='Asset'
    var parent='Customer';
   
    let datas={
      accounttype:accounttype,
      account:this.userdata.customerId.name,
      parent:parent
    }
    console.log(datas)
      this.userService.accountbytype(datas).subscribe(result => {
        console.log(result);
        let something:any;
        something=result
        this.firstaccountid=something.result[0]._id
        console.log(this.firstaccountid)
      },
        err => {
          console.log(err)
  
        })
    }



  createjournal(){
    
    let data={
      date:new Date().toISOString(),
      reference:'5d1af5eafbe2953ecca6f2da',
      notes:'',
      total:this.amount,
      userId:localStorage.getItem('userId'),
      detail:[{
        accountId:'5d2583ef8de29212f49cf200',
        credit:this.amount,
        description:'description'
      },
      {
        accountId:"5d2590fc7c8f70150cbca388",
        debit:this.amount,
        description:'description'
      }
    ]
  }
  console.log(data);

  this.userService.journalcreat(data).subscribe(result => {
    console.log(result);
    this.toastr.success('Awesome!', 'Journal created suceesfully');
    console.log(result);
    this.SharedService.abc('journal');
   
  },
    err => {
      console.log(err)
      this.toastr.error('Error!', 'Server Error')

    })
  }
}
