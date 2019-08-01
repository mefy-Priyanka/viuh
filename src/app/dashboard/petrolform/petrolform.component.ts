import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import * as moment from 'moment';
import { UserService } from 'src/app/service/user.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-petrolform',
  templateUrl: './petrolform.component.html',
  styleUrls: ['./petrolform.component.css']
})
export class PetrolformComponent implements OnInit {
  // petrolFormErrors: {};
  petrolForm: FormGroup;
  submitted: boolean;
  petrols = [];
  openbool: boolean;
  driverlist = [];
  trucklist = [];
  petrolFormErrors: { pumpname: any; truckno: any; date: any; diesel: any; other: any; driver: any; };
  vendorlist: any;
  firstaccountid: any;
  dieselrate: any;
  truckaccountid: any;
  lists: any = [];
  total: any;
  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) {
    this.petrolFormErrors = {
      pumpname: {},
      truckno: {},
      date: {},
      diesel: {},
      other: {},
      driver: {}
    };
  }

  ngOnInit() {
    this.petrolForm = this.createAccountForm()

    this.petrolForm.valueChanges.subscribe(() => {
      this.onpetrolFormValuesChanged();
    });
    this.gettruck();
    this.getdriver();
    this.vendorList();
    // this.getdiesel()
    // this.getpetrolprice()
  }


  createAccountForm() {
    return this.formBuilder.group({
      pumpname: ['', Validators.required],
      truckno: ['', Validators.required],
      driver: ['', Validators.required],
      date: ['', Validators.required],
      diesel: ['', Validators.required],
      other: [''],
    });
  }

  onpetrolFormValuesChanged() {
    for (const field in this.petrolFormErrors) {
      if (!this.petrolFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.petrolFormErrors[field] = {};
      // Get the control
      const control = this.petrolForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.petrolFormErrors[field] = control.errors;
      }
    }
  }
  createpayment() {

    this.submitted = true;

    if (this.petrolForm.valid) {

      let data = {
        pumpname: this.petrolForm.value.pumpname,
        truckno: this.petrolForm.value.truckno,
        driver: this.petrolForm.value.driver,
        date: moment(this.petrolForm.value.date).toISOString,
        diesel: this.petrolForm.value.diesel,
        other: this.petrolForm.value.other,
        userId: localStorage.getItem('userId')
      }
      console.log('let data be', data);
      this.CompanyService.creatpetrom(data).subscribe(value => {
        this.submitted = false;
        this.toastr.success('Congo!', 'account Successfully Created'),
          console.log('user', value)
        let result: any = {}
        result = value
        // this.submit();
        this.petrolForm.reset();

        this.SharedService.abc('journal');
      },
        err => {
          console.log(err)
          this.submitted = false;

          this.toastr.error('Error!', 'Server Error')
        })
    }

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

  getdriver() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'driver'
    }
    this.CompanyService.getdriver(data).subscribe(data => {
      console.log(data);
      let something: any;
      something = data;
      this.driverlist = something.result
    },
      err => {
        console.log(err);
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

  onChangeObj(data) {
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
  // getdiesel() {
  //   let something: any;
  //   let i = 0;
  //   this.CompanyService.getdiesel(localStorage.getItem('SuperAdmin')).subscribe(result => {
  //     console.log(result);
  //     something = result;
  //     this.dieselrate = something.result[something.result.length - 1].diesel_price;  
  //   },
  //     err => {
  //       console.log(err)
  //     })

  // }
  submit() {
    this.userService.getpetrol(localStorage.getItem('SuperAdmin')).subscribe(result => {
      console.log(result);
      let somethidng: any = result;
      this.lists = somethidng.result;
      console.log(this.lists)
      console.log(this.petrolForm.value.pumpname)
      console.log(this.lists.length)

      for (var i = 0; i < this.lists.length; i++) {
        console.log('sjhfvcbh')
        console.log(this.lists[i].user, this.lists[i].user.length)
        for (var j = 0; j < this.lists[i].user.length; j++) {

          console.log(this.lists[i].user[j].vendorId);
          if (this.petrolForm.value.pumpname == this.lists[i].user[j].vendorId._id) {

            this.total = this.lists[i].user[j].diesel_price
            this.final();
            return
          }
          // else {
          //   alert('make sure every thing is all right');
          //   return;
          // }
        }

      }

      alert('make sure every thing is all right');
      return
    },
      err => {
        console.log(err);
        this.toastr.error('oops', 'server error')
      })
  }

  final() {
    var total = this.total * parseFloat(this.petrolForm.value.diesel)
    console.log(total)
    let data = {
      date: new Date().toISOString(),
      reference: this.petrolForm.value.driver,
      notes: '',
      total: total,
      userId: localStorage.getItem('userId'),
      detail: [{
        accountId: this.firstaccountid,
        credit: total,
        description: 'description'
      },
      {
        accountId: this.truckaccountid,
        debit: total,
        description: 'description'
      }
      ]
    }
    console.log(data);

    this.userService.journalcreat(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Journal created suceesfully');
      console.log(result);
      this.createpayment();


    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }

}

