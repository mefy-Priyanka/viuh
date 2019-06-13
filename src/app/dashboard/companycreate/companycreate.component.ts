import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-companycreate',
  templateUrl: './companycreate.component.html',
  styleUrls: ['./companycreate.component.css']
})
export class CompanycreateComponent implements OnInit {

  fieldinput: boolean = true;
  imagefile: boolean = false;
  public loader: boolean = false;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  userId: string;
  inputdata: any = [];
  maindata = {
    road_registration_certificate: {},
    gst: {},
    tradeLicense_A: {},
    tradeLicense_B: {},
    pan: {},
    tan: {},
    professional_tax: {},
    pf: {},
    esi: {},
    itr: [],
    registration_certificate:[],
    balance_sheet: [],
    msme:[],
    userId: localStorage.getItem('userId')
  };

  docss: any = {};
  constructor(
    private router: Router, private companyService:
      CompanyService, private toastr: ToastrService, private SharedService: SharedService) {
    this.userId = localStorage.getItem('userId');

  }
  showContent() {
    console.log(this.inputdata)
    this.fieldinput = false;
    this.imagefile = true;
  }
  ngOnInit() {

  }

  /*******************************FILE UPLOAD SECTION**********************/
  upload(event, type) {
    console.log(this.userId)
    console.log(event + 'file upload' + type)
    console.log(event.target)
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.loader = true;
    this.companyService.fileUpload(formData).subscribe(response => {
      this.loader = false;
      this.toastr.success('Great !', 'File Successfully Uploaded'),
        console.log(response);
      let result: any = {};
      result = response;
      if (type == "companyLogo") {

        Object.assign(this.maindata, { companyLogo: result.upload._id })
      }
      else if (type == "tradeLicenseAId") {
        Object.assign(this.maindata.tradeLicense_A, { doc: result.upload._id })

      }
      else if (type == "tradeLicenseBId") {
        Object.assign(this.maindata.tradeLicense_B, { doc: result.upload._id })

      }
      else if (type == "gstId") {
        Object.assign(this.maindata.gst, { doc: result.upload._id })

      }
     
      else if (type == "panId") {
        Object.assign(this.maindata.pan, { doc: result.upload._id })

      }
      else if (type == "regId") {
        Object.assign(this.maindata.registration_certificate,{ doc: result.upload._id })

      }

      else if (type == "msme") {
        Object.assign(this.maindata.msme,{ doc: result.upload._id })

      }


      else if (type == "road_registration_certificatedoc") {
        Object.assign(this.maindata.road_registration_certificate, { doc: result.upload._id })

      }
      else if (type == "tandoc") {
        Object.assign(this.maindata.tan, { doc: result.upload._id })

      }
      else if (type == "balsheet1doc") {
        let data = {
          financial_year: '2015',
          doc: result.upload._id
        }
        this.maindata.balance_sheet.push(data)

      }
      else if (type == "balsheet2doc") {
        let data = {
          financial_year: '2016',
          doc: result.upload._id
        }
        this.maindata.balance_sheet.push(data)

      }
      else if (type == "balsheet3doc") {
        let data = {
          financial_year: '2017',
          doc: result.upload._id
        }
        this.maindata.balance_sheet.push(data)

      }
      else if (type == "balsheet4doc") {
        let data = {
          financial_year: '2018',
          doc: result.upload._id
        }
        this.maindata.balance_sheet.push(data)

      }
      else if (type == "balsheet5doc") {
        let data = {
          financial_year: '2019',
          doc: result.upload._id
        }
        this.maindata.balance_sheet.push(data)

      }
      else if (type == "itr1doc") {
        let data = {
          financial_year: '2015',
          doc: result.upload._id
        }
        this.maindata.itr.push(data)

      }
      else if (type == "itr2doc") {
        let data = {
          financial_year: '2016',
          doc: result.upload._id
        }
        this.maindata.itr.push(data)

      }
      else if (type == "itr3doc") {
        let data = {
          financial_year: '2017',
          doc: result.upload._id
        }
        this.maindata.itr.push(data)

      }
      else if (type == "itr4doc") {
        let data = {
          financial_year: '2018',
          doc: result.upload._id
        }
        this.maindata.itr.push(data)

      }
      else if (type == "itr5doc") {
        let data = {
          financial_year: '2019',
          doc: result.upload._id
        }
        this.maindata.itr.push(data)

      }
    }, err => {
      console.log(err);
      this.loader = false;
      this.toastr.error('oops !', 'File Upload Failed');

    });
  }


  keyup(data, key) {
    if (data != '') {
      if (key == 'email') {
        Object.assign(this.maindata, { email: data })
      }
      if (key == 'address') {
        Object.assign(this.maindata, { address: data })
      }
      if (key == 'phoneNumber') {
        Object.assign(this.maindata, { phoneNumber: data })
      }
      if (key == 'pan') {
        Object.assign(this.maindata.pan, { number: data })
      }
      if (key == 'gst') {
        Object.assign(this.maindata.gst, { number: data })
      }
      if (key == 'tradeLicense_A') {
        Object.assign(this.maindata.tradeLicense_A, { number: data })
      }
      if (key == 'tradeLicense_B') {
        Object.assign(this.maindata.tradeLicense_B, { number: data })
      }
      if (key == 'road_registration_certificate') {
        Object.assign(this.maindata.road_registration_certificate, { number: data })
      }
      if (key == 'registration_certificate') {
        Object.assign(this.maindata.registration_certificate, { number: data })
      }
      if (key == 'invoice_number') {
        Object.assign(this.maindata, { invoice_number: data })
      }
      if (key == 'msme') {
        Object.assign(this.maindata.msme, { invoice_number: data })
      }
      
      
      if (key == 'tan') {
        Object.assign(this.maindata.tan, { number: data })
      }

      if (key == 'pf') {
        Object.assign(this.maindata.pf, { number: data })
      }
      if (key == 'esi') {
        Object.assign(this.maindata.esi, { number: data })
      }
      if (key == 'professional_tax') {
        Object.assign(this.maindata.professional_tax, { number: data })
      }
      if (key == 'organisation') {
        Object.assign(this.maindata, { organisation: data })
      }

    }
    console.log(this.maindata)
  }
  FormSubmit() {

    console.log(this.maindata)
    // this.companyService.createCompany(this.maindata).subscribe(value => {
    //   this.toastr.success('Congo!', 'Successfully Created'),
    //     console.log('user', value)
    //   let result: any = {}
    //   result = value
    //   this.loader = false;
    //   this.SharedService.abc('companylist');
    // },
    //   err => {
    //     console.log(err)
    //   })
  }
}


