import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-petrolformvoucherlist',
  templateUrl: './petrolformvoucherlist.component.html',
  styleUrls: ['./petrolformvoucherlist.component.css']
})
export class PetrolformvoucherlistComponent implements OnInit {
  lists: any = [];
  actual_diesel: any;
  actual_date: any;
  confirmed: any;
  actual_amount: any;
  trucklist: any = [];
  truckaccountid: any;
  vendorlist: any = []
  firstaccountid: any;
  date: any;
  selecteddata: any;
  startDate: any;
  endDate: any;
  status = 'pending'
  htmllist = []
  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getdieselvoucher();
    this.gettruck();
    this.vendorList()
  }
  add() {
    this.SharedService.abc('petrol')
  }
  getdieselvoucher() {
    let data = {
      // date: this.date,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    this.userService.getdieselvoucher(data).subscribe(result => {
      console.log(result);
      let somethidng: any = result;
      this.lists = somethidng.result;
      this.choosestatus('pending')
    },
      err => {
        console.log(err)
      })
  }
  update(data) {
    console.log(data);
    this.selecteddata = data
    this.truckaccount(data.truckId._id);
    this.getvendoraccount(data.pump_name._id);

  }

  vendorList() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'vendor'
    }
    this.CompanyService.getvendor(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.vendorlist = result.result
      console.log(this.vendorlist);
    },
      error => {
        console.log(error);

      })
  }

  getvendoraccount(data) {
    console.log(data);
    var accounttype = 'Liability'
    var account = '';
    var parent = 'Account Payable';


    for (var i = 0; i < this.vendorlist.length; i++) {
      if (this.vendorlist[i]._id == data) {
        account = this.vendorlist[i].name;
        break;
      }
    }


    let datas = {
      accounttype: accounttype,
      account: account,
      parent: parent,
      superAdminId: localStorage.getItem('SuperAdmin')

    }
    console.log(datas);

    this.userService.accountbytype(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      if (something.result.length != 0) {
        this.firstaccountid = something.result[0]._id
      }
      console.log(this.firstaccountid)
    },
      err => {
        console.log(err)

      })
  }


  gettruck() {

    this.CompanyService.getfleetlist(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data);
      let something: any;
      something = data;
      this.trucklist = something.result

    },
      err => {
        console.log(err);
      })
  }

  truckaccount(data) {
    console.log(data);
    var accounttype = 'Expense'
    var account = '';
    var parent = 'Fleets';

    console.log(this.trucklist)
    for (var i = 0; i < this.trucklist.length; i++) {
      if (this.trucklist[i]._id == data) {
        account = this.trucklist[i].truck_number;
        break;
      }
    }
    console.log('account+'+account)
    if (account == '') {
      alert('some error occored');
      return;
    }
    document.getElementById('openmodel').click()
    let datas = {
      accounttype: accounttype,
      account: account,
      parent: parent,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    console.log(datas);

    this.userService.accountbytype(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      if (something.result.length != 0) {
        this.truckaccountid = something.result[0]._id
      }
      console.log(this.truckaccountid)
    },
      err => {
        console.log(err)

      })
  }



  // submitedit() {
  //   this.getpetrolprice(this.actual_date)


  //   let data = {
  //     actual_diesel: this.actual_diesel,
  //     actual_date: this.actual_date,
  //     confirmed: true,
  //     actual_amount: this.actual_amount*parseFloat(this.actual_diesel)
  //   }
  //   console.log(data)
  // }

  submitedit() {
    let data = {
      date: this.actual_date,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    this.userService.getpetrol(data).subscribe(result => {
      console.log(result);
      let somethidng: any = result;




      for (var i = 0; i < somethidng.result.length; i++) {
        console.log('sjhfvcbh')
        for (var j = 0; j < somethidng.result[i].user.length; j++) {

          if (this.selecteddata.pump_name._id == somethidng.result[i].user[j].vendorId._id) {

            this.actual_amount = somethidng.result[i].user[j].diesel_price
            this.save()
            return
          }
          // else {
          //   alert('make sure every thing is all right');
          //   return;
          // }
        }
      }
      alert('please rate not listed');
      return;

    },
      err => {
        console.log(err)
      })
  }


  save() {
    let data = {
      actual_diesel: this.actual_diesel,
      actual_date: new Date(this.actual_date).toISOString(),
      confirmed: true,
      actual_amount: this.actual_amount * parseFloat(this.actual_diesel),
      dieselId: this.selecteddata._id
    }
    console.log(data)
    this.userService.updatedieselvoucher(data).subscribe(result => {
      console.log(result);
      this.creatjournal()
      this.getdieselvoucher()
      document.getElementById('cancels').click();
    },
      err => {
        console.log(err)
      })
  }

  creatjournal() {
    let data = {
      date: new Date(this.actual_date).toISOString(),
      reference: this.selecteddata.driverId,
      notes: '',
      total: this.actual_amount * parseFloat(this.actual_diesel),
      userId: localStorage.getItem('userId'),
      detail: [{
        accountId: this.firstaccountid,
        credit: this.actual_amount * parseFloat(this.actual_diesel),
        description: 'description'
      },
      {
        accountId: this.truckaccountid,
        debit: this.actual_amount * parseFloat(this.actual_diesel),
        description: 'description'
      }
      ]
    }
    console.log(data);

    this.userService.journalcreat(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Journal created suceesfully');
      console.log(result);


    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }
  datewiselist() {

    if (this.startDate == '' || this.endDate == '') {
      alert('please provide dates');
      return
    }
    let data = {
      startDate: this.startDate,
      endDate: this.endDate,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    this.userService.getdieselvoucherdates(data).subscribe(result => {
      console.log(result);
      let somethidng: any = result;
      this.lists = somethidng.result;
      this.choosestatus('pending')

    },
      err => {
        console.log(err)
      })
  }

  choosestatus(status) {
    console.log(status)
    this.status = status;
    var pending = [];
    var confirmed = [];
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].confirmed) {
        confirmed.push(this.lists[i])
      }
      else {
        pending.push(this.lists[i])
      }
    }

    if (this.status == 'pending') {
      this.htmllist = pending
    }
    else if (this.status == 'confirmed') {
      this.htmllist = confirmed
    }
  }

}
