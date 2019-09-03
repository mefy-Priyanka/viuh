import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-paymentreceived',
  templateUrl: './paymentreceived.component.html',
  styleUrls: ['./paymentreceived.component.css']
})
export class PaymentreceivedComponent implements OnInit {
  invoicelists: any;
  amount = 0;
  description = '';
  id: any;

  submitdata: any = {
    amount_paid: '',
    paymentDate: '',
    departmental_deduction: '',
    tds: '',
    shortage: '',
    gst_tds: '',
    ccms: ''
  };
  userdata = {
    items_details: [],
    customerId: { name: '', _id: '' },
    _id: ''
  };
  firstaccountid: any;
  consignmentNumber = '';
  selectedconsignment: any = { amount: 0 };
  constructor(private userService: UserService, private SharedService: SharedService, private companyService: CompanyService, private toastr: ToastrService, ) { }

  ngOnInit() {
    this.invoicelist();
  }
  consignment() {
    console.log(this.consignmentNumber)
    console.log("userdata", this.userdata)
    console.log("userdata", this.userdata.items_details)
    for (let i = 0; i < this.userdata.items_details.length; i++) {
      if (this.userdata.items_details[i]._id == this.consignmentNumber) {
        this.selectedconsignment = this.userdata.items_details[i];
      }
    }
    console.log(this.selectedconsignment)
  }

  invoicelist() {
    console.log(localStorage.getItem('SuperAdmin'))
    this.companyService.getinvoice(localStorage.getItem('SuperAdmin')).subscribe(data => {

      let result: any = {}
      result = data;
      this.invoicelists = result.result
      console.log(this.invoicelists);
    },
      error => {
        console.log(error);

      })
  }
  submitmodal() {
    var amount_status = 'incomplete'
    if (parseInt(this.selectedconsignment.amount) - parseInt(this.submitdata.amount_paid) < 1) {
      amount_status = 'complete'
    }

    let data = {
      invoiceId: this.userdata._id,
      amount_paid: this.submitdata.amount_paid,
      paymentDate: new Date(this.submitdata.paymentDate).toISOString(),
      due_amount: parseInt(this.selectedconsignment.amount) - parseInt(this.submitdata.amount_paid),
      itemId: this.selectedconsignment._id,
      amount_status: amount_status,
      departmental_deduction: this.submitdata.departmental_deduction,
      tds: this.submitdata.tds,
      shortage: this.submitdata.shortage,
      gst_tds: this.submitdata.gst_tds,
      ccms: this.submitdata.ccms
    }
    console.log(data)
    this.companyService.invoiceupdate(data).subscribe(data => {
      this.toastr.success('success', 'invoice updated successfully');
      document.getElementById("cancel").click();

      this.submitdata = '';
      this.selectedconsignment = ''
      this.userdata = {
        items_details: [],
        customerId: { name: '', _id: '' },
        _id: ''
      };
    },
      error => {
        console.log(error);
        this.toastr.error('oops', 'server error')

      })

  }
  pay(data) {
    this.userdata = data;
    console.log("userdata", this.userdata)
    this.id = data._id;
    this.getaccount()
  }
  submit() {
    let data = {
      invoiceId: this.id,
      amount_paid: this.amount
    }
    console.log(data);
    this.companyService.paidinvoice(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'invoice detail saved suceesfully');
      this.createjournal()
      this.invoicelist();
      document.getElementById("cancel").click();
    },
      err => {
        console.log(err);
        this.toastr.error('oops!', 'server error');

      })
  }
  cancel() {
    this.amount = 0;
    this.id = 0;
    document.getElementById("cancel").click();

  }

  getaccount() {
    var accounttype = 'Asset'
    var parent = 'Customers';

    let datas = {
      accounttype: accounttype,
      account: this.userdata.customerId.name,
      parent: parent
    }
    console.log(datas)
    this.userService.accountbytype(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      this.firstaccountid = something.result[0]._id
      console.log(this.firstaccountid)
    },
      err => {
        console.log(err)

      })
  }



  createjournal() {

    let data = {
      date: new Date().toISOString(),
      reference: this.userdata.customerId._id,
      notes: '',
      total: this.amount,
      userId: localStorage.getItem('userId'),
      journal_base: 'bank',
      detail: [{
        accountId: this.firstaccountid,
        credit: this.amount,
        description: 'description'
      },
      {
        accountId: "5d2583ef8de29212f49cf200",
        debit: this.amount,
        description: 'description'
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
