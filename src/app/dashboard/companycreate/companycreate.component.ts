import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companycreate',
  templateUrl: './companycreate.component.html',
  styleUrls: ['./companycreate.component.css']
})
export class CompanycreateComponent implements OnInit {
  companyForm: FormGroup;
  companyFormErrors: any;
  fieldinput:boolean=true;
  imagefile:boolean=false;
  public loader:boolean=false;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  userId: string;
  companyId: any;
  tradeId: any;
  gst: any;
  invoice: any;
  pan: any;
  reg: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private companyService: CompanyService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');
    // **********Company form errors
    this.companyFormErrors = {
      email:{},
      companyName:{},
      regNo:{},
      regId:{},
      gstNo:{},
      gstId:{},
      tradeLicenseNo:{},
      tradeLicenseId:{},
      invoiceNo:{},
      invoiceId:{},
      panCard:{},
      panId:{},
      Address:{},
      companyLogo:{},
      currency:{},
      phoneNumber:{}
    };
      // **********Company form errors end
   }
  // ******************** div toggle
  showContent(){
    this.fieldinput=false;
    this.imagefile=true;
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
  createCompanyForm(){
    return this.formBuilder.group({
      email: ['',[ Validators.required,Validators.email]],
      companyName: ['', Validators.required],
      regNo: ['', Validators.required],
      regId: ['', Validators.required],
      gstNo: ['', Validators.required],
      gstId: ['', Validators.required],
      tradeLicenseNo: ['', Validators.required],
      tradeLicenseId: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      invoiceId: ['', Validators.required],
      panCard: ['', Validators.required],
      panId: ['', Validators.required],
      Address: ['', Validators.required],
      companyLogo: ['', Validators.required],
      currency: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
// ***************Company Form end
  // *****************************Company form submit***************************
  FormSubmit(){
    console.log(this.companyForm.value)
    this.submitted = true;
    this.loader = true;
if(this.companyForm.valid){
  let data = {
    email: this.companyForm.value.email,
    companyName: this.companyForm.value.companyName,
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
    userId:this.userId

  }
  this.companyService.createCompany(data).subscribe(value => {
    this.submitted = false;
    this.toastr.success('Congo!', 'Successfully Created'),
      console.log('user', value)
    let result: any = {}
    result = value
    this.companyForm.reset();
    this.loader = false;
  },
    err => {
      console.log(err)
      this.submitted = false;
      this.loader = false;
      this.toastr.error('Error!', 'Server Error')
      this.companyForm.reset();
    })
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
        this.companyId = result.upload._id;
      }
      else if (type == "tradeLicenseId") {
        this.tradeId = result.upload._id;
      }
      else if (type == "gstId") {
        this.gst = result.upload._id;
      }
      else if (type == "invoiceId") {
        this.invoice = result.upload._id;
      }
      else if (type == "panId") {
        this.pan = result.upload._id;
      }
      else if (type == "regId") {
        this.reg = result.upload._id;
      }

      console.log(this.companyForm.value)
    }, err => {
      console.log(err);
    });
  }
}
