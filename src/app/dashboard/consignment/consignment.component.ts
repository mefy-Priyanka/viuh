import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { CompanyService } from 'src/app/service/company.service';
import { ToastrService } from 'ngx-toastr';
// import * as new Date from 'new Date';
import * as $ from 'jquery';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {
  public cdata: boolean = true;
  userId: string;
  role: string;
  organisation: string;
  consignmentFormErrors: {};
  consignmentForm: any;
  chalandoc: any;
  submitted = false;
  consigmentDetail = [];
  contactlist = [];
  fleetDetail = []
  destinationlist: any = [];
  driverlist: any = [];
  consignerpay: any;
  postdata: any = [];
  employeelist: any;
  tconfig = [12, 19, 20, 24, 306, 450, 1];
  distance: any;
  totalval: number;
  ratelist: any = [];
  constructor(private formBuilder: FormBuilder, private userService: UserService, private companyService: CompanyService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    this.organisation = localStorage.getItem('organisation');

    this.consignmentFormErrors = {
      tl_number: {},
      location_number: {},
      challan_number: {},
      challan_date: {},
      consignor: {},
      consignee: {},
      reference_number: {},
      truck_number: {},
      origin_place: {},
      destination: {},
      authorize_person: {},
      price_type: {},

      driver_license_number: {},
      truckconfig: {},
      driver_name: {},
      amount:{},
      gross_wt: {},
      tare_wt: {},
      net_wt: {},
      diesel_expenses: {},
      driver_expenses: {},
      toll_expenses: {},
      product: {},
      consignment_date: {}
    };
    this.getConsignmentList();
  }

  createconsignmentForm() {
    return this.formBuilder.group({

      tl_number: ['', Validators.required],
      location_number: ['', Validators.required],
      challan_number: ['', Validators.required],
      challan_date: ['', Validators.required],
      consignor: ['', Validators.required],
      consignee: ['', Validators.required],
      reference_number: ['', Validators.required],
      truck_number: ['', Validators.required],
      origin_place: ['', Validators.required],
      destination: ['', Validators.required],
      authorize_person: ['', Validators.required],
      price_type: ['', Validators.required],
      driver_license_number: ['', Validators.required],
      truckconfig: ['', Validators.required],
      driver_name: ['', Validators.required],
      amount:['',Validators.required],
      gross_wt: [''],
      tare_wt: [''],
      net_wt: ['',],
      diesel_expenses: ['',],
      driver_expenses: ['',],
      toll_expenses: [''],
      product: ['', Validators.required],
      consignment_date: ['', Validators.required],
    });
  }

  onconsignmentFormValuesChanged() {
    for (const field in this.consignmentFormErrors) {
      if (!this.consignmentFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.consignmentFormErrors[field] = {};
      // Get the control
      const control = this.consignmentForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.consignmentFormErrors[field] = control.errors;
      }
    }
  }


  ngOnInit() {
    this.getrate()
    this.employeeList()
    this.getfleetList();
    this.driverList()
    this.consignmentForm = this.createconsignmentForm()
    this.consignmentForm.valueChanges.subscribe(() => {
      this.onconsignmentFormValuesChanged();
    });
    this.customerList();
  }
  at() {
    this.cdata = !this.cdata;
  }

  upload(event, type) {
    console.log(this.userId)
    console.log(event + 'file upload' + type)
    // console.log(event.target)
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.companyService.fileUpload(formData).subscribe(response => {

      this.toastr.success('Great !', 'File Successfully Uploaded'),
        console.log(response);
      let result: any = {};
      result = response;
      this.chalandoc = result.upload._id
    }, err => {
      console.log(err);
      this.toastr.error('oops !', 'File Upload Failed');
    });
  }

  getConsignmentList() {
    this.userService.consignmentList(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.consigmentDetail = result.result
      console.log(this.consigmentDetail);
    },
      error => {
        console.log(error);

      })
  }

  getfleetList() {
    this.companyService.getfleetlist(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.fleetDetail = result.result

    },
      error => {
        console.log(error);

      })
  }

  submit() {
    this.calculation1();
    return;
    console.log(this.consignmentForm.value)
    this.submitted = true;
    console.log(this.consignmentForm.valid)
    if (this.consignmentForm.valid) {
      console.log('sssssssssss')
      let data = {
        tl_number: this.consignmentForm.value.tl_number,
        location_number: this.consignmentForm.value.location_number,
        challan_number: this.consignmentForm.value.challan_number,
        challan_date: new Date(this.consignmentForm.value.challan_date).toISOString(),
        consignor: this.consignmentForm.value.consignor,
        consignee: this.consignmentForm.value.consignee,
        consignment_date: new Date(this.consignmentForm.value.consignment_date).toISOString(),
        reference_number: this.consignmentForm.value.reference_number,
        truck_number: this.consignmentForm.value.truck_number,
        origin_place: this.consignmentForm.value.origin_place,
        destination: this.consignmentForm.value.destination,
        authorize_person: this.consignmentForm.value.authorize_person,
        driver_license_number: this.consignmentForm.value.driver_license_number,
        truck_confg: this.consignmentForm.value.truckconfig,
        driver_name: this.consignmentForm.value.driver_name,
        amount:this.consignmentForm.value.amount,
        challan_doc: this.chalandoc,
        quantity: {
          gross_wt: this.consignmentForm.value.gross_wt,
          tare_wt: this.consignmentForm.value.tare_wt,
          net_wt: this.consignmentForm.value.net_wt,
        },
        advance_payment: {
          diesel_expenses: this.consignmentForm.value.diesel_expenses,
          driver_expenses: this.consignmentForm.value.driver_expenses,
          toll_expenses: this.consignmentForm.value.toll_expenses,
        },
        product: this.consignmentForm.value.product,
        userId: this.userId
      }
      console.log('let data be', data);
      this.userService.consignmentcreat(data).subscribe(value => {
        this.submitted = false;
        this.paymentdiesel()

        this.toastr.success('Congo!', 'Consignment Successfully Created'),
          //   console.log('user', value)
          // let result: any = {}
          // result = value
          // this.consignmentForm.reset();
          // this.toastr.success('Awesome!', 'Account created successfully');
          this.getConsignmentList();
        this.at();
      },
        err => {
          console.log(err)
          this.submitted = false;
          this.toastr.error('Error!', 'Server Error')
        })
    }

  }

  paymentdiesel() {
    let data = {
      ownerId: this.postdata.ownerId,
      contractId: this.postdata.contractId,
      payment_date: new Date(this.consignmentForm.value.challan_date).toISOString(),
      payment_mode: 'cash',
      fleetId: this.consignmentForm.value.truck_number,
      payment: "diesel_price",
      amount_paid: this.consignmentForm.value.diesel_expenses,
      userId: localStorage.getItem('userId')
    }



    console.log(data);

    this.userService.creatvoucher(data).subscribe(result => {
      this.paymentdriver()
    },
      err => {
        console.log(err)
      })
  }

  paymentdriver() {
    let data = {
      ownerId: this.postdata.ownerId,
      contractId: this.postdata.contractId,
      payment_date: new Date(this.consignmentForm.value.challan_date).toISOString(),
      payment_mode: 'cash',
      fleetId: this.consignmentForm.value.truck_number,
      payment: 'driver_expense',
      amount_paid: this.consignmentForm.value.driver_expenses,
      userId: localStorage.getItem('userId')
    }
    console.log(data)
    this.userService.creatvoucher(data).subscribe(result => {
      this.paymenttoll()
    },
      err => {
        console.log(err)
      })
  }

  paymenttoll() {
    let data = {
      ownerId: this.postdata.ownerId,
      contractId: this.postdata.contractId,
      payment_date: new Date(this.consignmentForm.value.challan_date).toISOString(),
      payment_mode: 'cash',
      fleetId: this.consignmentForm.value.truck_number,
      payment: 'toll_price',
      amount_paid: this.consignmentForm.value.toll_expenses,
      userId: localStorage.getItem('userId')
    }
    console.log(data)
    this.userService.creatvoucher(data).subscribe(result => {

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
    this.companyService.getcustomer(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.contactlist = result.result
      console.log(this.contactlist);
    },
      error => {
        console.log(error);

      })
  }
  driverList() {

    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'driver'
    }
    this.companyService.getcustomer(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.driverlist = result.result
      console.log(this.driverlist);
    },
      error => {
        console.log(error);

      })
  }
  employeeList() {

    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'employee'
    }
    this.companyService.getcustomer(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.employeelist = result.result
      console.log(this.driverlist);
    },
      error => {
        console.log(error);

      })
  }

  onChangeObj(id) {
    this.destinationlist = [];
    this.companyService.getdestination(id).subscribe(result => {
      console.log(result);
      let some: any = result;
      for (var i = 0; i < some.result.length; i++) {
        for (var j = 0; j < some.result[i].details.length; j++) {
          this.destinationlist.push(some.result[i].details[j])
        }
      }

      console.log(this.destinationlist)
    },
      err => {
        console.log(err)
      })

  }
  chengeconsignee(data) {
    for (var j = 0; j < this.destinationlist.length; j++) {
      if (this.destinationlist[j].location_name == data) {
        this.distance = this.destinationlist[j].km;
        console.log(this.distance)
      }
    }
  }
  getrate() {
    this.userService.getrate(localStorage.getItem('SuperAdmin')).subscribe(data => {
      let result: any = {}
      result = data;
      this.ratelist = result.result
      console.log(this.driverlist);
    },
      error => {
        console.log(error);

      })
  }
  calculation1() {
    var temp: any = [];
    console.log(this.ratelist);
    var result = jQuery('.switch-input').is(':checked') ? true : false;
    for (var i = 0; i < this.ratelist.length; i++) {
      if (this.ratelist[i].truck_confg == this.consignmentForm.value.truckconfig) {
        if (result == this.ratelist[i].within_state) {
          if (this.ratelist[i].price_type == this.consignmentForm.value.price_type) {
            if (((new Date(this.ratelist[i].effactive_date_from).getTime()) <= (new Date(this.consignmentForm.value.consignment_date).getTime()) && (new Date(this.ratelist[i].effactive_date_to).getTime()) >= (new Date(this.consignmentForm.value.consignment_date).getTime()))) {
              console.log('config and price type and date and state matched')
              temp.push(this.ratelist[i]);
              console.log(temp)
            }
          }
        }
      }
    }



    if (this.consignmentForm.value.truckconfig == 12 || this.consignmentForm.value.truckconfig == 19 || this.consignmentForm.value.truckconfig == 20 || this.consignmentForm.value.truckconfig == 24) {

      if (temp[temp.length - 1].price_type == 'fdz') {
        console.log(parseFloat(this.consignmentForm.value.truckconfig), parseFloat(temp[temp.length - 1].rate), temp[temp.length - 1].to_km, parseFloat(temp[temp.length - 1].to_km))
        this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate);
      }
      else if (temp[temp.length - 1].price_type == 'bfdz') {
        console.log(parseFloat(this.consignmentForm.value.truckconfig), parseFloat(temp[temp.length - 1].rate), parseFloat(this.distance))
        this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.distance);
      }


    }
    else if (this.consignmentForm.value.truckconfig == 306 || this.consignmentForm.value.truckconfig == 450) {

      if (temp[temp.length - 1].price_type == 'fdz') {
        this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate);
      }
      else if (temp[temp.length - 1].price_type == 'bfdz') {
        this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.distance) * 2;
      }

    }
    else if (this.consignmentForm.value.truckconfig == 1) {
      this.totalval = parseFloat(this.distance) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.consignmentForm.onconsignmentFormValuesChanged.net_wt);
    }
    // alert(this.totalval)
    this.consignmentForm.value.amount=this.totalval




  }
  calculation() {
    console.log(this.ratelist);
    // var result = document.getElementsByClassName("switch-input")[0].checked ? 'yes' : 'no'
    var result = jQuery('.switch-input').is(':checked') ? true : false;
    console.log(result)
    for (var i = 0; i < this.ratelist.length; i++) {
      // console.log(i)

      if (this.ratelist[i].truck_confg == this.consignmentForm.value.truckconfig) {

        // console.log('config true')
        // console.log(result, this.ratelist[i].within_state)
        if (result == this.ratelist[i].within_state) {
          // console.log(i);
          // console.log('fromkm' + this.ratelist[i].from_km, 'dista' + this.distance, 'tokm' + this.ratelist[i].to_km)
          console.log(this.ratelist[i].from_km <= this.distance, this.distance < this.ratelist[i].to_km)
          if (parseInt(this.ratelist[i].from_km) <= parseInt(this.distance) && parseInt(this.distance) < parseInt(this.ratelist[i].to_km)) {
            // console.log('distance true')

            if ((this.ratelist[i].effactive_date_from <= this.consignmentForm.value.consignment_date && this.ratelist[i].effactive_date_to >= this.consignmentForm.value.consignment_date)) {
              // console.log('date true')
              alert('rate is ------' + this.ratelist[i].rate);
              var rate = 10;
              if (this.consignmentForm.value.truckconfig == 12 || this.consignmentForm.value.truckconfig == 19 || this.consignmentForm.value.truckconfig == 20 || this.consignmentForm.value.truckconfig == 24) {
                this.totalval = this.consignmentForm.value.truckconfig * rate * this.distance;
              }
              else if (this.consignmentForm.value.truckconfig == 306 || this.consignmentForm.value.truckconfig == 450) {
                if (this.distance <= 100) {
                  this.totalval = this.consignmentForm.value.truckconfig * rate * this.distance;
                }
                else {
                  this.totalval = this.consignmentForm.value.truckconfig * rate * this.distance * 2;
                }
              }
              else if (this.consignmentForm.value.truckconfig == 1) {
                this.totalval = this.distance * rate;
              }
              alert(this.totalval)
              return
            }

          }
        }
      }
    }

  }
  changetruck(id) {
    console.log(id)
    for (var i = 0; i < this.fleetDetail.length; i++) {
      if (this.fleetDetail[i]._id == id) {
        if (this.fleetDetail[i].contractId) {
          this.consignerpay = this.fleetDetail[i].contractId._id;
          console.log(this.consignerpay)
          this.postdata.contractId = this.consignerpay
          this.postdata.ownerId = null
          return
        }
        else if (this.fleetDetail[i].ownId) {
          this.consignerpay = this.fleetDetail[i].ownId._id
          this.postdata.ownerId = this.consignerpay
          this.postdata.contractId = null

          return
        }
      }
    }
  }

}
