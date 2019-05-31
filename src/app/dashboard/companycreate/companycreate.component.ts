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
  companyForm: FormGroup;
  companyFormErrors: any;
  fieldinput: boolean = true;
  imagefile: boolean = false;
  public loader: boolean = false;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  userId: string;
  companyId: any;
  tradeId: any;
  gst: any;
  invoice: any;
  pan: any;
  reg: any;
  docss:any={};
  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
      CompanyService, private toastr: ToastrService, private SharedService: SharedService) {
    this.userId = localStorage.getItem('userId');
    // **********Company form errors
    this.companyFormErrors = {
      email: {},
      companyName: {},
      road_registration_certificateno: {},
      road_registration_certificatedoc: {},

      regNo: {},
      regId: {},
      gstNo: {},
      gstId: {},
      tradeLicenseANo: {},
      tradeLicenseAId: {},
      tradeLicenseBNo: {},
      tradeLicenseBId: {},
      invoiceNo: {},
      invoiceId: {},
      panCard: {},
      panId: {},
      tandoc: {},
      tanno: {},

      professional_taxNo: {},
      professional_taxDoc: {},
      pfno: {},
      pfDoc: {},
      esino: {},
      esiDoc: {},


      itr1doc: {},
      itr1no: {},
      itr2doc: {},
      itr2no: {},
       itr3doc: {},
      itr3no: {},
       itr4doc: {},
      itr4no: {},
       itr5doc: {},
      itr5no: {},


      balsheet1doc: {},
      balsheet1no: {},
      balsheet2doc: {},
      balsheet2no: {},
      balsheet3doc: {},
      balsheet3no: {},
      balsheet4doc: {},
      balsheet4no: {},
      balsheet5doc: {},
      balsheet5no: {},



      Address: {},
      companyLogo: {},
      currency: {},
      phoneNumber: {}
    };
    // **********Company form errors end
  }
  // ******************** div toggle
  showContent() {
    this.fieldinput = false;
    this.imagefile = true;
  }
  // ******************** div toggle end
  ngOnInit() {
    this.companyForm = this.createCompanyForm()

    this.companyForm.valueChanges.subscribe(() => {
      this.onCompanyFormValuesChanged();
    });
  }
  /******************************IT CATCHES ALL CHANGES IN FORM******************/
  onCompanyFormValuesChanged() {
    for (const field in this.companyFormErrors) {
      if (!this.companyFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.companyFormErrors[field] = {};
      // Get the control
      const control = this.companyForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.companyFormErrors[field] = control.errors;
      }
    }
  }
  // ***************Company Form
  createCompanyForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    
      companyName: ['',Validators.required],
      road_registration_certificateno: ['',Validators.required],
      road_registration_certificatedoc: ['',Validators.required],

      regNo: ['',Validators.required],
      regId: ['',Validators.required],
      gstNo: ['',Validators.required],
      gstId: ['',Validators.required],
      tradeLicenseANo: ['',Validators.required],
      tradeLicenseAId: ['',Validators.required],
      tradeLicenseBNo: ['',Validators.required],
      tradeLicenseBId:['',Validators.required],
      invoiceNo: ['',Validators.required],
      invoiceId: ['',Validators.required],
      panCard: ['',Validators.required],
      panId: ['',Validators.required],
      tandoc: ['',Validators.required],
      tanno: ['',Validators.required],

      professional_taxNo: ['',Validators.required],
      professional_taxDoc: ['',Validators.required],
      pfno: ['',Validators.required],
      pfDoc: ['',Validators.required],
      esino: ['',Validators.required],
      esiDoc: ['',Validators.required],

      itr1doc: ['',Validators.required],
      itr2doc: ['',Validators.required],
       itr3doc:['',Validators.required],
       itr4doc:['',Validators.required],
       itr5doc: ['',Validators.required],

      balsheet1doc:['',Validators.required],
      balsheet2doc: ['',Validators.required],
      balsheet3doc: ['',Validators.required],
      balsheet4doc:['',Validators.required],
      balsheet5doc: ['',Validators.required],

      Address:['',Validators.required],
      companyLogo: ['',Validators.required],
      currency: ['',Validators.required],
      phoneNumber: ['',Validators.required],
    });
  }
  // ***************Company Form end
  // *****************************Company form submit***************************
  FormSubmit() {
    console.log(this.docss)
    console.log(this.companyForm.value)
    this.submitted = true;
    // this.loader = true;
    if (this.companyForm.valid) {
      let data = {
        email: this.companyForm.value.email,
        organisation:localStorage.getItem('organisation'),
        companyName: this.companyForm.value.companyName,
        road_registration_certificate:{
          number:this.companyForm.value.road_registration_certificateno,
          doc:this.docss.road_registration_certificatedoc
        },
        regNo: this.companyForm.value.regNo,
        regId: this.reg,
        gstNo: this.companyForm.value.gstNo,
        gstId: this.gst,
        tradeLicenseNo: this.companyForm.value.tradeLicenseNo,
        tradeLicenseId: this.tradeId,
        invoiceNo: this.companyForm.value.invoiceNo,
        invoiceId: this.invoice,
        panCard: this.companyForm.value.panCard,
        panId: this.pan,
        Address: this.companyForm.value.Address,
        companyLogo: this.companyId,
        currency: this.companyForm.value.currency,
        phoneNumber: this.companyForm.value.phoneNumber,
        userId: this.userId

      }
      // this.companyService.createCompany(data).subscribe(value => {
      //   this.submitted = false;
      //   this.toastr.success('Congo!', 'Successfully Created'),
      //     console.log('user', value)
      //   let result: any = {}
      //   result = value
      //   this.companyForm.reset();
      //   this.loader = false;
      //   this.SharedService.abc('companylist');
      // },
      //   err => {
      //     console.log(err)
      //     this.submitted = false;
      //     this.loader = false;
      //     this.toastr.error('Error!', 'Server Error')
      //     this.companyForm.reset();
      //   })
      console.log("data", data);
    }
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
        this.companyForm.value.companyLogo = result.upload._id;

        Object.assign(this.docss,{companyLogo:result.upload._id})
      }
      else if (type == "tradeLicenseAId") {
        this.companyForm.value.tradeLicenseAId = result.upload._id;
        Object.assign(this.docss,{tradeLicenseAId:result.upload._id})

      }
      else if (type == "tradeLicenseBId") {
        this.companyForm.value.tradeLicenseBId = result.upload._id;
        Object.assign(this.docss,{tradeLicenseBId:result.upload._id})

      }
      else if (type == "gstId") {
        this.companyForm.value.gstId = result.upload._id;
        Object.assign(this.docss,{gstId:result.upload._id})

      }
      else if (type == "invoiceId") {
        this.companyForm.value.invoiceId = result.upload._id;
        Object.assign(this.docss,{invoiceId:result.upload._id})

      }
      else if (type == "panId") {
        this.companyForm.value.panId = result.upload._id;
        Object.assign(this.docss,{panId:result.upload._id})

      }
      else if (type == "regId") {
        this.companyForm.value.regId = result.upload._id;
        Object.assign(this.docss,{regId:result.upload._id})

      }
      else if (type == "road_registration_certificatedoc") {
        this.companyForm.value.road_registration_certificatedoc = result.upload._id;
        Object.assign(this.docss,{road_registration_certificatedoc:result.upload._id})

      }
      else if (type == "tandoc") {
        this.companyForm.value.tandoc = result.upload._id;
        Object.assign(this.docss,{tandoc:result.upload._id})

      }
      else if (type == "balsheet1doc") {
        this.companyForm.value.balsheet1doc = result.upload._id;
        Object.assign(this.docss,{balsheet1doc:result.upload._id})

      }
      else if (type == "balsheet2doc") {
        this.companyForm.value.balsheet2doc = result.upload._id;
        Object.assign(this.docss,{balsheet2doc:result.upload._id})

      }
      else if (type == "balsheet3doc") {
        this.companyForm.value.balsheet3doc = result.upload._id;
        Object.assign(this.docss,{balsheet3doc:result.upload._id})

      }
      else if (type == "balsheet4doc") {
        this.companyForm.value.balsheet4doc = result.upload._id;
        Object.assign(this.docss,{balsheet4doc:result.upload._id})

      }
      else if (type == "balsheet5doc") {
        this.companyForm.value.balsheet5doc = result.upload._id;
        Object.assign(this.docss,{balsheet5doc:result.upload._id})

      }
      else if (type == "itr1doc") {
        this.companyForm.value.itr1doc = result.upload._id;
        Object.assign(this.docss,{itr1doc:result.upload._id})

      }
      else if (type == "itr2doc") {
        this.companyForm.value.itr2doc = result.upload._id;
        Object.assign(this.docss,{itr2doc:result.upload._id})

      }
      else if (type == "itr3doc") {
        this.companyForm.value.itr3doc = result.upload._id;
        Object.assign(this.docss,{itr3doc:result.upload._id})

      }
      else if (type == "itr4doc") {
        this.companyForm.value.itr4doc = result.upload._id;
        Object.assign(this.docss,{itr4doc:result.upload._id})

      }
      else if (type == "itr5doc") {
        this.companyForm.value.itr5doc = result.upload._id;
        Object.assign(this.docss,{itr5doc:result.upload._id})

      }
     

      console.log(this.companyForm.value)
    }, err => {
      console.log(err);
      this.loader = false;
      this.toastr.error('oops !', 'File Upload Failed');

    });
  }
}
