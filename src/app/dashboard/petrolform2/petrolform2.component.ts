import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { CompanyService } from 'src/app/service/company.service';

import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-petrolform2',
  templateUrl: './petrolform2.component.html',
  styleUrls: ['./petrolform2.component.css']
})
export class Petrolform2Component implements OnInit {
  vendorlist = [];
  vendor = '';
  rate = 0;
  alllist: any = [];
  rateerr: boolean;
  vendorererr: boolean;
  vendors: any;
  final: any = [];
  addeddata: any = [];
  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.vendorList();

  }

  getpetrolprice() {
    var matches = [];

    this.userService.getpetrol(localStorage.getItem('SuperAdmin')).subscribe(result => {
      console.log(result);
      let something: any = result;

      for (var i = 0; i < something.result.length; i++) {
        console.log('data', something.result[i].user.length, i)

        for (var j = 0; j < something.result[i].user.length; j++) {
          console.log('ssssssss')
          console.log('data', something.result[i].user[j].vendorId)
          this.addeddata.push(something.result[i].user[j].vendorId)
        }
      }
      console.log(this.addeddata)





      for (var o = 0; o < this.vendorlist.length; o++) {
        for (var oo = 0; oo < this.addeddata.length; oo++) {
          console.log(this.vendorlist[o].name,this.addeddata[oo].name)
          if(this.vendorlist[o].name==this.addeddata[oo].name){
            this.vendorlist.splice(o,1);
          
          }
        }

      }
      console.log(this.vendorlist)
    },
      err => {
        console.log(err)
      })
  }

  vendorList() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'vendor'
    }
    this.CompanyService.getvendor(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.vendors = result.result
      this.vendorlist = result.result
      console.log(this.vendorlist);
      this.getpetrolprice()
    },
      error => {
        console.log(error);

      })
  }

  changevendor() {
    this.vendorererr = false;
  }
  changerate() {
    this.rateerr = false;
  }

  name(id) {
    for (var i = 0; i < this.vendors.length; i++) {
      console.log(id, this.vendors[i]._id)
      if (this.vendors[i]._id == id) {
        console.log(this.vendors[i].name)
        return this.vendors[i].name
      }
    }
  }

  add() {
    console.log(this.vendor)
    if (this.vendor == '') {
      this.vendorererr = true;
      return;
    }

    if (this.rate == 0 || this.rate == NaN) {

      this.rateerr = true
      return;
    }
    let x = this.name(this.vendor)
    console.log(x)
    let data = {
      rate: this.rate,
      pump: this.vendor,
      name: x
    }
    let datt = {
      diesel_price: this.rate,
      vendorId: this.vendor
    }
    this.final.push(datt)
    console.log(data)

    this.alllist.push(data);
    for (var i = 0; i < this.vendorlist.length; i++) {
      if (this.vendorlist[i]._id == this.vendor) {
        this.vendorlist.splice(i, 1);
        console.log(this.alllist)
        console.log(this.vendorlist)
        this.vendor = ''
        this.rate = 0
        return;
      }
    }

  }

  submit() {
    let data = {
      user: this.final,
      userId: localStorage.getItem('userId'),
      date: new Date().toISOString()
    }
    console.log(data)
    this.userService.petrolsetprice(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Congo!', 'Price Updated Successfully');
      this.SharedService.abc('')
    },
      err => {
        console.log(err)
      })
  }
}
