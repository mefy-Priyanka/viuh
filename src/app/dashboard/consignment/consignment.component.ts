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
  fleetDetail = [];
  destinationlist: any = [];
  driverlist: any = [];
  consignerpay: any;
  postdata: any = [];
  employeelist: any;
  tconfig = [12, 19, 20, 24, 306, 450, 1];
  distance: any;
  totalval: number;
  ratelist: any = [];
  contactname: any;
  freight: any;
  arrayofobj: any = [];
  userdata: { name: string; id: string; };
  keyword = 'truck_number';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private companyService: CompanyService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    this.organisation = localStorage.getItem('organisation');
    this.userdata={
      name:localStorage.getItem('name'),
      id:localStorage.getItem('userId')
    }
    this.consignmentFormErrors = {
     
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
    
      diesel_expenses: {},
      driver_expenses: {},
      toll_expenses: {},
      product: {},
      consignment_date: {},
      truckid:{}
    };
    this.getConsignmentList();
  }
  selectEvent(data){
    console.log(data);
    this.consignmentForm.value.truckid=data._id;
    this.consignmentForm.controls['truckid'].setValue(data._id);
    console.log(this.consignmentForm.value.truckid)
    this.changetruck(data._id)

  }
 
  createconsignmentForm() {
    this.add()
    return this.formBuilder.group({

 
      consignor: ['', Validators.required],
      consignee: ['', Validators.required],
      reference_number: ['', Validators.required],
      truck_number: ['',],
      origin_place: ['', Validators.required],
      destination: ['', Validators.required],
      authorize_person: [this.userdata.name, Validators.required],
      price_type: ['', Validators.required],
      driver_license_number: ['', Validators.required],
      truckconfig: ['', Validators.required],
      driver_name: ['', Validators.required],
      truckid: ['', Validators.required],
      diesel_expenses: ['',],
      driver_expenses: ['',],
      toll_expenses: [''],
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

  upload(event, index) {
    console.log(this.userId)
    console.log(event + 'file upload' + index)
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
      this.arrayofobj[index].Challan_doc = result.upload._id
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
      console.log('consignment',this.consigmentDetail);
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

  apicall() {
  
    for (var i = 0; i < this.arrayofobj.length; i++) {
      this.arrayofobj[i].challan_date = new Date(this.arrayofobj[i].challan_date).toISOString()
    }
    var result = jQuery('.switch-input').is(':checked') ? true : false;

    console.log(this.consignmentForm.value)
    this.submitted = true;
    if (this.consignmentForm.valid) {
      console.log('sssssssssss')
      let data = {
        consignment: this.arrayofobj,
        consignor: this.consignmentForm.value.consignor,
        consignee: this.consignmentForm.value.consignee,
        consignment_date: new Date(this.consignmentForm.value.consignment_date).toISOString(),
        reference_number: this.consignmentForm.value.reference_number,
        truck_number: this.consignmentForm.value.truckid,
        origin_place: this.consignmentForm.value.origin_place,
        destination: this.consignmentForm.value.destination,
        authorize_person: this.userdata.id,
        driver_license_number: this.consignmentForm.value.driver_license_number,
        truck_confg: this.consignmentForm.value.truckconfig,
        driver_name: this.consignmentForm.value.driver_name,
        price_type  : this.consignmentForm.value.price_type,  
        distance:this.distance,  
        freight:this.freight,
        within_state:result,
        
        advance_payment: {
          diesel_expenses: this.consignmentForm.value.diesel_expenses,
          driver_expenses: this.consignmentForm.value.driver_expenses,
          toll_expenses: this.consignmentForm.value.toll_expenses,
        },
        userId: this.userId
      }
      console.log('let data be', data);
      this.userService.consignmentcreat(data).subscribe(value => {
        this.submitted = false;
        this.paymentdiesel()

        this.toastr.success( 'Consignment Successfully Created'),
            console.log('user', value)
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
      payment_date: new Date(this.consignmentForm.value.consignment_date).toISOString(),
      payment_mode: 'cash',
      fleetId: this.consignmentForm.value.truckid,
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
      payment_date: new Date(this.consignmentForm.value.consignment_date).toISOString(),
      payment_mode: 'cash',
      fleetId: this.consignmentForm.value.truckid,
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
      payment_date: new Date(this.consignmentForm.value.consignment_date).toISOString(),
      payment_mode: 'cash',
      fleetId: this.consignmentForm.value.truckid,
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
    
    this.consignmentForm.controls['destination'].setValue('');

    this.consignmentForm.controls['origin_place'].setValue('');
    this.consignmentForm.controls['consignee'].setValue('');

    this.destinationlist = [];

    this.companyService.getdestination(id).subscribe(result => {
      console.log(result);
      let some: any = result;
      for (var i = 0; i < some.result.length; i++) {
        for (var j = 0; j < some.result[i].details.length; j++) {
          this.destinationlist.push(some.result[i].details[j])
        }
      }

      // this.consignee=''
      // this.consignmentForm.value.consignee=''
      // console.log(this.consignee)
      // console.log(this.consignmentForm.value.consignee)
      console.log(this.destinationlist);
    },
      err => {
        console.log(err)
      })

    for (var k = 0; k < this.contactlist.length; k++) {
      if (this.contactlist[k]._id == id) {
        this.contactname = this.contactlist[k].name
        console.log(this.contactname)
      }
    }
    
  }
  chengeconsignee(data) {
    console.log(data)
    this.consignmentForm.controls['destination'].setValue('');
    this.consignmentForm.controls['origin_place'].setValue('');
    for (var j = 0; j < this.destinationlist.length; j++) {
      if (this.destinationlist[j].location_name == data) {
        this.distance = this.destinationlist[j].km;
        this.consignmentForm.value.destination=this.destinationlist[j].location_name;
        this.consignmentForm.value.origin_place=this.destinationlist[j].point_of_origin;

        this.consignmentForm.controls['destination'].setValue(this.destinationlist[j].location_name);
        this.consignmentForm.controls['origin_place'].setValue(this.destinationlist[j].point_of_origin);

        console.log(this.consignmentForm.value.origin_place)
        console.log(this.distance)
        if (this.destinationlist[j].freight) {
          this.freight = this.destinationlist[j].freight
          console.log(this.freight)
        }
      }
    }
  }


  choosedriver(id){
    this.consignmentForm.controls['driver_license_number'].setValue('');
    
    for (var j = 0; j < this.driverlist.length; j++) {
      if (this.driverlist[j]._id == id) {
        console.log(this.driverlist[j])
        if(this.driverlist[j].licence){
          this.consignmentForm.controls['driver_license_number'].setValue(this.driverlist[j].licence.number);
          console.log(this.consignmentForm.value.driver_license_number)

        }
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
  submit() {
    
    this.submitted = true;
    console.log(this.consignmentForm.valid)
    console.log(this.consignmentForm.value)
    if (this.consignmentForm.valid) {

      this.totalval = 0;
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
        console.log(temp[temp.length - 1])
        if (temp[temp.length - 1]) {
          if (temp[temp.length - 1].price_type == 'fdz') {
            console.log(parseFloat(this.consignmentForm.value.truckconfig), parseFloat(temp[temp.length - 1].rate), parseFloat(temp[temp.length - 1].to_km))
            this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate);
          }
          else if (temp[temp.length - 1].price_type == 'bfdz') {
            console.log(parseFloat(this.consignmentForm.value.truckconfig), parseFloat(temp[temp.length - 1].rate), parseFloat(this.distance))
            this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.distance);
          }
        }



      }
      else if (this.consignmentForm.value.truckconfig == 306 || this.consignmentForm.value.truckconfig == 450) {
        if (temp[temp.length - 1]) {
          if (temp[temp.length - 1].price_type == 'fdz') {
            this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate);
          }
          else if (temp[temp.length - 1].price_type == 'bfdz') {
            this.totalval = parseFloat(this.consignmentForm.value.truckconfig) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.distance) * 2;
          }
        }

      }
      if (this.contactname.match('emami')) {
        var net =0;
        for (var i = 0; i < this.arrayofobj.length; i++) {
          net = net + parseInt(this.arrayofobj[i].net_wt)
        }

        console.log(parseFloat(this.freight),net)
        this.totalval = parseFloat(this.freight) * net;
      }
      // alert(this.totalval)
      this.consignmentForm.value.amount = this.totalval
      console.log(this.totalval)
      if (this.totalval == 0) {
        let xx = confirm('there is no rate defined')
        if (xx) {
          this.apicall()
        }
      }
      else {
        alert(this.consignmentForm.value.amount)
        this.apicall()
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

  add() {
    let temp = {
      challan_number: '',
      Challan_doc: '',
      gross_wt: '',
      tare_wt: '',
      net_wt: '',
      product: '',
      challan_date: ''
    }
    this.arrayofobj.push(temp)

    console.log(this.arrayofobj)

  }
  del(i){
    this.arrayofobj.splice(i,1)
  }
}
