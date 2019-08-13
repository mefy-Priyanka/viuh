import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  contactlist: any = [];
  customer = '';
  state: any;
  truckconfig = '';
  fromkm = '';
  tokm = '';
  rate = '';
  unit = '';
  startdate = '';
  enddate = '';
  loader = false;
  ratelist: any = [];
  tconfig = [12, 19, 20, 24, 306, 450, 1];
  units = ['ton', 'kl', 'kl/km', 'cyl', 'cyl/rtkm']

  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.customerList();
    this.getratelist();
  }
  getratelist() {
    this.userService.getrate(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data);
      let something: any = data;
      this.ratelist = something.result
    },
      err => {
        console.log(err)
      })
  }
  customerList() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'customer'
    }
    this.CompanyService.getcustomer(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.contactlist = result.result
      console.log(this.contactlist);
    },
      error => {
        console.log(error);

      })
  }

  submit() {
    if (new Date(this.startdate) > new Date(this.enddate)) {
      alert('please provide correct date');
      return;
    }
    if (this.state == 'true') {
      this.state = true
    }
    else if (this.state == 'true') {
      this.state = false
    }
    var start: any
    var distance: any;
    console.log(this.ratelist.length)
    if(this.ratelist.length==0){
      this.callapi();
      return;
    }
    for (var i = 0; i < this.ratelist.length; i++) {
      console.log(i, this.ratelist[i].customerId._id, this.customer)
      if (this.ratelist[i].customerId._id == this.customer) {
        console.log((this.ratelist[i].within_state), (this.state), (this.ratelist[i].truck_confg), (this.truckconfig))
        
        if ((this.ratelist[i].within_state == this.state) && (this.ratelist[i].truck_confg == this.truckconfig)) {
          start = this.checkdate(this.ratelist[i].effactive_date_from, this.ratelist[i].effactive_date_to);

          console.log(start)
          if (start) {
           
            distance = this.checkdistance(this.ratelist[i].from_km, this.ratelist[i].to_km)
            if (distance) {
              this.callapi();
              return
            }
            else {
              alert('Effective dates already exists');
              return;
            }
          }
          else {
            alert('Please check from and to km');
            return;
          }
        }
        else {
         this.callapi();
         return
        }
      }
    }
  }

  checkdistance(formkm, tokm) {
    console.log(formkm, tokm)
    console.log((formkm ), this.fromkm, (this.tokm) , (tokm ),(this.fromkm)  ,(this.tokm))

    if ((formkm < this.fromkm && formkm < this.tokm) || (tokm > this.fromkm && tokm > this.tokm)) {
      console.log('okk distance');
      return true;
    }
    else {
      console.log('lies in distance')
      return false
    }
  }
  checkdate(start, end) {
    var datasdate = new Date(start);
    var dataedate = new Date(end);
    var startdate = new Date(this.startdate);
    var enddate = new Date(this.enddate)
    console.log(datasdate < startdate && dataedate > startdate), (datasdate < enddate && dataedate > enddate);
    if ((datasdate < startdate && datasdate < enddate) || (dataedate > startdate && dataedate > enddate)) {
      console.log('all ok');
      return true;
    }

    else {
      console.log('lies in dates');
      return false;
    }
  }
  callapi() {

   

    
    // return;
    let data = {
      customerId: this.customer,
      from_km: this.fromkm,
      to_km: this.tokm,
      rate: this.rate,
      within_state: this.state,
      unit: this.unit,
      truck_confg: this.truckconfig,
      effactive_date_from: new Date(this.startdate),
      effactive_date_to: new Date(this.enddate),
      userId: localStorage.getItem('SuperAdmin')
    }
    // console.log(data);
    // this.reset()
    console.log(data);
    this.userService.saverate(data).subscribe(result => {
      console.log(data);
      this.loader = false;
      this.toastr.success('congrets', 'Rate Updates Successfully');
      this.reset();
      this.getratelist();
    }, err => {
      console.log(err);
      this.loader = false;
      this.toastr.error('oops', 'Some error Occured')

    })
  }
  reset() {
    this.customer = '';
    this.state = '';
    this.truckconfig = '';
    this.fromkm = '';
    this.tokm = '';
    this.rate = '';
    this.unit = '';
    this.startdate = '';
    this.enddate = '';
  }

  selectcustomer(id) {
    var cname = "";
    for (var i = 0; i < this.contactlist.length; i++) {
      if (id == this.contactlist[i]._id) {
        cname = this.contactlist[i].name
        break
      }
    }
    console.log(cname)
  }
}
